"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";
import { ORIGINAL_MEDIA_BASELINE } from "@/lib/cms-media";
import { isAdminAuthenticated } from "./admin-auth";

/**
 * Handle direct local file upload to /public/uploads/
 */
export async function uploadMediaFileAction(
  formData: FormData
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return { success: false, error: "Unauthorized access." };
    }

    const file = formData.get("file") as File | null;
    if (!file) {
      return { success: false, error: "No file was provided for upload." };
    }

    // Validate size (max 25MB)
    if (file.size > 25 * 1024 * 1024) {
      return { success: false, error: "File size exceeds 25MB limit." };
    }

    const ext = path.extname(file.name).toLowerCase();
    const allowed = [".jpg", ".jpeg", ".png", ".webp", ".mp4", ".svg"];
    if (!allowed.includes(ext)) {
      return { success: false, error: "Unsupported file type. Use JPG, PNG, WEBP, or MP4." };
    }

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadsDir, { recursive: true });

    // Clean, sanitized filename
    const sanitizedBase = path
      .basename(file.name, ext)
      .replace(/[^a-zA-Z0-9_-]/g, "-")
      .toLowerCase()
      .substring(0, 30);
    const uniqueFilename = `${sanitizedBase}-${Date.now()}${ext}`;
    const destinationPath = path.join(uploadsDir, uniqueFilename);

    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(destinationPath, buffer);

    const publicUrl = `/uploads/${uniqueFilename}`;
    return { success: true, url: publicUrl };
  } catch (err: unknown) {
    console.error("Error writing upload to local storage:", err);
    return { success: false, error: "Failed to save file to local server storage." };
  }
}

/**
 * Fetch all media slots configured for the public site
 */
export async function getMediaSlotsAction() {
  try {
    if (!supabase) return { success: false, data: [] };
    const { data, error } = await supabase
      .from("media_assets")
      .select("*")
      .order("section", { ascending: true });

    if (error) throw error;
    return { success: true, data: data || [] };
  } catch (err: unknown) {
    console.error("Error fetching media slots:", err);
    return { success: false, data: [] };
  }
}

/**
 * Update a media slot to point to a new image URL, storing the previous image for 1-click reversion
 */
export async function updateMediaSlotAction(
  slotKey: string,
  imageUrl: string,
  title?: string,
  altText?: string
) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) return { success: false, error: "Unauthorized." };
    if (!supabase) return { success: false, error: "Database not configured." };

    // Fetch current slot to record previous_image_url for safe reversion
    const { data: currentSlot } = await supabase
      .from("media_assets")
      .select("image_url")
      .eq("slot_key", slotKey)
      .maybeSingle();

    const updatePayload: Record<string, unknown> = {
      image_url: imageUrl.trim(),
      updated_at: new Date().toISOString(),
    };

    if (currentSlot?.image_url && currentSlot.image_url !== imageUrl.trim()) {
      updatePayload.previous_image_url = currentSlot.image_url;
    }

    if (title) updatePayload.title = title.trim();
    if (altText) updatePayload.alt_text = altText.trim();

    const { error } = await supabase
      .from("media_assets")
      .update(updatePayload)
      .eq("slot_key", slotKey);

    if (error) throw error;
    revalidatePath("/", "layout");
    return { success: true };
  } catch (err: unknown) {
    console.error("Error updating media slot:", err);
    return { success: false, error: "Failed to update media slot." };
  }
}

/**
 * Revert a media slot back to its previous image URL
 */
export async function revertMediaSlotAction(slotKey: string) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) return { success: false, error: "Unauthorized." };
    if (!supabase) return { success: false, error: "Database not configured." };

    const { data: currentSlot, error: fetchErr } = await supabase
      .from("media_assets")
      .select("*")
      .eq("slot_key", slotKey)
      .maybeSingle();

    if (fetchErr || !currentSlot) {
      return { success: false, error: "Media slot not found." };
    }

    if (!currentSlot.previous_image_url) {
      return { success: false, error: "No previous image recorded to revert back to." };
    }

    const previousUrl = currentSlot.previous_image_url;
    const currentUrl = currentSlot.image_url;

    // Swap current and previous so user can toggle back and forth if needed
    const { error: updateErr } = await supabase
      .from("media_assets")
      .update({
        image_url: previousUrl,
        previous_image_url: currentUrl,
        updated_at: new Date().toISOString(),
      })
      .eq("slot_key", slotKey);

    if (updateErr) throw updateErr;

    revalidatePath("/", "layout");
    return {
      success: true,
      restoredUrl: previousUrl,
      previousUrl: currentUrl,
    };
  } catch (err: unknown) {
    console.error("Error reverting media slot:", err);
    return { success: false, error: "Failed to revert media slot." };
  }
}


/**
 * Revert an individual media slot to its pristine original photo
 */
export async function revertSlotToOriginalAction(slotKey: string) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) return { success: false, error: "Unauthorized." };
    if (!supabase) return { success: false, error: "Database not configured." };

    const { data: currentSlot, error: fetchErr } = await supabase
      .from("media_assets")
      .select("*")
      .eq("slot_key", slotKey)
      .maybeSingle();

    if (fetchErr || !currentSlot) {
      return { success: false, error: "Media slot not found." };
    }

    const originalUrl = currentSlot.original_image_url || ORIGINAL_MEDIA_BASELINE[slotKey];
    if (!originalUrl) {
      return { success: false, error: "No original baseline image registered for this slot." };
    }

    if (currentSlot.image_url === originalUrl) {
      return { success: false, error: "This photo is already at the original version." };
    }

    const currentUrl = currentSlot.image_url;

    const { error: updateErr } = await supabase
      .from("media_assets")
      .update({
        image_url: originalUrl,
        previous_image_url: currentUrl,
        updated_at: new Date().toISOString(),
      })
      .eq("slot_key", slotKey);

    if (updateErr) throw updateErr;

    revalidatePath("/", "layout");
    return {
      success: true,
      restoredUrl: originalUrl,
      previousUrl: currentUrl,
    };
  } catch (err: unknown) {
    console.error("Error reverting to original media slot:", err);
    return { success: false, error: "Failed to revert to original photo." };
  }
}

/**
 * Master reset: Revert all website photos back to their pristine original baseline
 */
export async function revertAllSlotsToOriginalAction() {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) return { success: false, error: "Unauthorized." };
    if (!supabase) return { success: false, error: "Database not configured." };

    const { data: allSlots, error: fetchErr } = await supabase
      .from("media_assets")
      .select("*");

    if (fetchErr || !allSlots) {
      return { success: false, error: "Could not fetch media slots." };
    }

    let updatedCount = 0;
    for (const slot of allSlots) {
      const originalUrl = slot.original_image_url || ORIGINAL_MEDIA_BASELINE[slot.slot_key];
      if (originalUrl && slot.image_url !== originalUrl) {
        await supabase
          .from("media_assets")
          .update({
            image_url: originalUrl,
            previous_image_url: slot.image_url,
            updated_at: new Date().toISOString(),
          })
          .eq("id", slot.id);
        updatedCount++;
      }
    }

    revalidatePath("/", "layout");
    return {
      success: true,
      updatedCount,
      message: `Reverted ${updatedCount} photo${updatedCount === 1 ? "" : "s"} back to original baseline!`,
    };
  } catch (err: unknown) {
    console.error("Error resetting all media slots to original:", err);
    return { success: false, error: "Failed to reset photos to original." };
  }
}

/**
 * Fetch training programs along with their cohort schedules and enrolled applicants
 */
export async function getTrainingProgramsAction() {
  try {
    if (!supabase) return { success: false, data: [] };
    const { data: programs, error: progErr } = await supabase
      .from("training_programs")
      .select("*")
      .order("display_order", { ascending: true });

    if (progErr) throw progErr;

    const { data: schedules, error: schedErr } = await supabase
      .from("training_schedules")
      .select("*")
      .order("start_date", { ascending: true });

    if (schedErr) throw schedErr;

    const { data: enrollments, error: enrollErr } = await supabase
      .from("academy_enrollments")
      .select("*")
      .order("created_at", { ascending: false });

    if (enrollErr) {
      console.warn("Could not load enrollments with programs:", enrollErr);
    }

    const allEnrollments = enrollments || [];

    const enriched = (programs || []).map((prog) => {
      const progSchedules = (schedules || []).filter((s) => s.program_id === prog.id);
      const progApplicants = allEnrollments.filter(
        (e) => e.program_id === prog.id || (e.course_level && e.course_level.toLowerCase() === prog.title.toLowerCase())
      ).map((app) => {
        const matchingSchedule = progSchedules.find((s) => s.id === app.cohort_id);
        return {
          ...app,
          program_title: prog.title,
          cohort_dates: matchingSchedule
            ? `${new Date(matchingSchedule.start_date).toLocaleDateString()} – ${new Date(matchingSchedule.end_date).toLocaleDateString()}`
            : null,
        };
      });

      return {
        ...prog,
        schedules: progSchedules,
        applicants: progApplicants,
        applicant_count: progApplicants.length,
      };
    });

    return { success: true, data: enriched };
  } catch (err: unknown) {
    console.error("Error fetching training programs:", err);
    return { success: false, data: [] };
  }
}

/**
 * Create a new training program with dynamic application form configuration
 */
export async function createTrainingProgramAction(payload: {
  title: string;
  level: string;
  duration: string;
  description: string;
  tuition_etb: number;
  curriculum: string[];
  has_application_form?: boolean;
  form_config?: Record<string, any>;
}) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) return { success: false, error: "Unauthorized." };
    if (!supabase) return { success: false, error: "Database not configured." };

    const slug = payload.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const { data, error } = await supabase.from("training_programs").insert([
      {
        title: payload.title.trim(),
        slug: `${slug}-${Date.now().toString().slice(-4)}`,
        level: payload.level,
        duration: payload.duration.trim(),
        description: payload.description.trim(),
        tuition_etb: Number(payload.tuition_etb) || 0,
        curriculum: payload.curriculum,
        has_application_form: payload.has_application_form ?? true,
        form_config: payload.form_config || {
          ask_email: true,
          ask_experience: true,
          ask_organization: true,
          ask_notes: true,
          custom_questions: [],
        },
        is_active: true,
      },
    ]).select().single();

    if (error) throw error;
    return { success: true, data };
  } catch (err: unknown) {
    console.error("Error creating training program:", err);
    return { success: false, error: "Failed to create program." };
  }
}

/**
 * Create an upcoming cohort schedule for a program
 */
export async function createCohortScheduleAction(payload: {
  program_id: string;
  start_date: string;
  end_date: string;
  session_time: string;
  seats_total: number;
}) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) return { success: false, error: "Unauthorized." };
    if (!supabase) return { success: false, error: "Database not configured." };

    const { data, error } = await supabase
      .from("training_schedules")
      .insert([
        {
          program_id: payload.program_id,
          start_date: payload.start_date,
          end_date: payload.end_date,
          session_time: payload.session_time.trim(),
          seats_total: Number(payload.seats_total) || 8,
          seats_booked: 0,
          status: "open",
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (err: unknown) {
    console.error("Error creating cohort schedule:", err);
    return { success: false, error: "Failed to add cohort schedule." };
  }
}

/**
 * Update an existing cohort schedule (e.g. adjust booked seats or status)
 */
export async function updateCohortScheduleAction(
  id: string,
  payload: {
    seats_booked?: number;
    status?: string;
  }
) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) return { success: false, error: "Unauthorized." };
    if (!supabase) return { success: false, error: "Database not configured." };

    const { error } = await supabase
      .from("training_schedules")
      .update(payload)
      .eq("id", id);

    if (error) throw error;
    revalidatePath("/", "layout");
    return { success: true };
  } catch (err: unknown) {
    console.error("Error updating cohort schedule:", err);
    return { success: false, error: "Failed to update cohort." };
  }
}

/**
 * Delete a cohort schedule
 */
export async function deleteCohortScheduleAction(id: string) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) return { success: false, error: "Unauthorized." };
    if (!supabase) return { success: false, error: "Database not configured." };

    const { error } = await supabase
      .from("training_schedules")
      .delete()
      .eq("id", id);

    if (error) throw error;
    revalidatePath("/", "layout");
    return { success: true };
  } catch (err: unknown) {
    console.error("Error deleting cohort schedule:", err);
    return { success: false, error: "Failed to delete cohort." };
  }
}

/**
 * Delete a Training Program and its associated cohort schedules and enrollments from the database.
 */
export async function deleteTrainingProgramAction(id: string) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) return { success: false, error: "Unauthorized." };
    if (!supabase) return { success: false, error: "Database not configured." };

    // 1. Delete associated enrollments
    await supabase.from("academy_enrollments").delete().eq("program_id", id);

    // 2. Delete associated cohort schedules
    await supabase.from("training_schedules").delete().eq("program_id", id);

    // 3. Delete the training program itself
    const { error } = await supabase.from("training_programs").delete().eq("id", id);
    if (error) throw error;
    revalidatePath("/", "layout");
    return { success: true };
  } catch (err: any) {
    console.error("Error deleting training program:", err);
    return { success: false, error: err?.message || "Failed to delete training program." };
  }
}

/**
 * Fetch all inquiries for the CRM view
 */
export async function getInquiriesAction() {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) return { success: false, data: [] };
    if (!supabase) return { success: false, data: [] };

    const { data, error } = await supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return { success: true, data: data || [] };
  } catch (err: unknown) {
    console.error("Error fetching inquiries:", err);
    return { success: false, data: [] };
  }
}

/**
 * Update status of an inquiry in the CRM
 */
export async function updateInquiryStatusAction(id: string, status: string) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) return { success: false, error: "Unauthorized." };
    if (!supabase) return { success: false, error: "Database not configured." };

    const { error } = await supabase
      .from("inquiries")
      .update({ status })
      .eq("id", id);

    if (error) throw error;
    revalidatePath("/", "layout");
    return { success: true };
  } catch (err: unknown) {
    console.error("Error updating inquiry status:", err);
    return { success: false, error: "Failed to update inquiry." };
  }
}

/**
 * Get executive KPIs summary for the dashboard home
 */
export async function getExecutiveKPIsAction() {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) return null;
    if (!supabase) return null;

    const [inqRes, progRes, schedRes, chatRes, enrollRes] = await Promise.all([
      supabase.from("inquiries").select("id, status, created_at"),
      supabase.from("training_programs").select("id"),
      supabase.from("training_schedules").select("id, seats_total, seats_booked, status"),
      supabase.from("chat_threads").select("id, status"),
      supabase.from("academy_enrollments").select("id"),
    ]);

    const inquiries = inqRes.data || [];
    const newInquiries = inquiries.filter((i) => !i.status || i.status === "new" || i.status === "open").length;
    const totalPrograms = (progRes.data || []).length;
    const activeCohorts = (schedRes.data || []).filter((s) => s.status !== "completed").length;
    const openChats = (chatRes.data || []).filter((c) => c.status === "open").length;
    const totalApplicants = (enrollRes.data || []).length;

    return {
      totalInquiries: inquiries.length,
      newInquiries,
      totalPrograms,
      activeCohorts,
      openChats,
      totalApplicants,
    };
  } catch (err) {
    console.error("Error compiling executive KPIs:", err);
    return null;
  }
}

/**
 * Compile rich executive analytics for the modern dashboard overview (KPIs, 7-day trend, service demand, cohort occupancy)
 */
export async function getExecutiveDashboardAnalyticsAction() {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) return null;
    if (!supabase) return null;

    const [inqRes, bookRes, progRes, schedRes, chatRes, enrollRes, pkgRes, mediaRes] = await Promise.all([
      supabase.from("inquiries").select("id, service, status, created_at"),
      supabase.from("service_bookings").select("id, package_id, status, created_at, service_packages(title)"),
      supabase.from("training_programs").select("id, title"),
      supabase.from("training_schedules").select("id, program_id, start_date, seats_total, seats_booked, status, training_programs(title)").order("start_date", { ascending: true }),
      supabase.from("chat_threads").select("id, status"),
      supabase.from("academy_enrollments").select("id, created_at"),
      supabase.from("service_packages").select("id, is_active"),
      supabase.from("media_assets").select("slot_key, image_url, original_image_url"),
    ]);

    const inquiries = inqRes.data || [];
    const bookings = bookRes.data || [];
    const enrollments = enrollRes.data || [];
    const schedules = schedRes.data || [];
    const chats = chatRes.data || [];
    const programs = progRes.data || [];
    const packages = pkgRes.data || [];
    const media = mediaRes.data || [];

    const newInquiries = inquiries.filter((i: any) => !i.status || i.status === "new" || i.status === "open").length;
    const pendingBookings = bookings.filter((b: any) => !b.status || b.status === "new" || b.status === "pending").length;
    const activeCohortsCount = schedules.filter((s: any) => s.status !== "completed").length;
    const openChats = chats.filter((c: any) => c.status === "open").length;
    const customMediaCount = media.filter((m: any) => {
      const orig = m.original_image_url || ORIGINAL_MEDIA_BASELINE[m.slot_key];
      return orig && m.image_url !== orig;
    }).length;

    // 7-day rolling activity series
    const activitySeries: Array<{ dateLabel: string; dayShort: string; inquiries: number; bookings: number }> = [];
    const now = new Date();
    for (let offset = 6; offset >= 0; offset--) {
      const d = new Date(now);
      d.setDate(now.getDate() - offset);
      const isoPrefix = d.toISOString().slice(0, 10);
      const dayShort = d.toLocaleDateString("en-US", { weekday: "short" });
      const dateLabel = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });

      const dayInq = inquiries.filter((i: any) => (i.created_at || "").startsWith(isoPrefix)).length;
      const dayBook =
        bookings.filter((b: any) => (b.created_at || "").startsWith(isoPrefix)).length +
        enrollments.filter((e: any) => (e.created_at || "").startsWith(isoPrefix)).length;

      activitySeries.push({ dateLabel, dayShort, inquiries: dayInq, bookings: dayBook });
    }

    // Service demand aggregation across inquiries & bookings
    const demandMap = new Map<string, number>();
    for (const i of inquiries) {
      const key = (i.service || "General Inquiry").trim();
      demandMap.set(key, (demandMap.get(key) || 0) + 1);
    }
    for (const b of bookings as any[]) {
      const title = b.service_packages?.title || "Service Package";
      demandMap.set(title, (demandMap.get(title) || 0) + 1);
    }

    const totalDemand = Array.from(demandMap.values()).reduce((sum, v) => sum + v, 0);
    const serviceDemand = Array.from(demandMap.entries())
      .map(([name, count]) => ({
        name,
        count,
        percentage: totalDemand > 0 ? Math.round((count / totalDemand) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const cohorts = (schedules as any[])
      .filter((s) => s.status !== "completed")
      .slice(0, 4)
      .map((s) => ({
        id: s.id,
        programTitle: s.training_programs?.title || "Barista Cohort",
        startDate: s.start_date,
        seatsTotal: s.seats_total || 10,
        seatsBooked: s.seats_booked || 0,
        status: s.status || "open",
      }));

    return {
      kpis: {
        totalInquiries: inquiries.length,
        newInquiries,
        totalServiceBookings: bookings.length,
        pendingBookings,
        totalEnrollments: enrollments.length,
        activeCohorts: activeCohortsCount,
        totalPrograms: programs.length,
        totalPackages: packages.length,
        openChats,
        customMediaCount,
      },
      activitySeries,
      serviceDemand,
      cohorts,
    };
  } catch (err) {
    console.error("Error compiling dashboard analytics:", err);
    return null;
  }
}

/**
 * Fetch all academy applicants across all courses, optionally filtered by programId.
 */
export async function getAcademyApplicantsAction(programId?: string) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) return { success: false, data: [] };
    if (!supabase) return { success: false, data: [] };

    let query = supabase
      .from("academy_enrollments")
      .select("*, training_programs(title), training_schedules(start_date, end_date, session_time)")
      .order("created_at", { ascending: false });

    if (programId) {
      query = query.eq("program_id", programId);
    }

    const { data, error } = await query;
    if (error) throw error;

    const formatted = (data || []).map((row: any) => ({
      ...row,
      program_title: row.training_programs?.title || row.course_level || "Specialty Course",
      cohort_dates: row.training_schedules
        ? `${new Date(row.training_schedules.start_date).toLocaleDateString()} – ${new Date(row.training_schedules.end_date).toLocaleDateString()}`
        : null,
    }));

    return { success: true, data: formatted };
  } catch (err) {
    console.error("Error fetching applicants:", err);
    return { success: false, data: [] };
  }
}

/**
 * Update the status of an academy enrollment/applicant.
 */
export async function updateAcademyApplicantStatusAction(id: string, status: string) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) return { success: false, error: "Unauthorized." };
    if (!supabase) return { success: false, error: "Database not configured." };

    const { error } = await supabase
      .from("academy_enrollments")
      .update({ status })
      .eq("id", id);

    if (error) throw error;
    revalidatePath("/", "layout");
    return { success: true };
  } catch (err) {
    console.error("Error updating applicant status:", err);
    return { success: false, error: "Failed to update status." };
  }
}

/**
 * Delete an applicant record.
 */
export async function deleteAcademyApplicantAction(id: string) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) return { success: false, error: "Unauthorized." };
    if (!supabase) return { success: false, error: "Database not configured." };

    const { error } = await supabase
      .from("academy_enrollments")
      .delete()
      .eq("id", id);

    if (error) throw error;
    revalidatePath("/", "layout");
    return { success: true };
  } catch (err) {
    console.error("Error deleting applicant:", err);
    return { success: false, error: "Failed to delete applicant." };
  }
}

/**
 * ============================================================================
 * SERVICE PACKAGES & CLIENT BOOKINGS MANAGEMENT ACTIONS
 * ============================================================================
 */

export interface ServicePackageItem {
  id: string;
  created_at: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  price_etb: number;
  pricing_model: "fixed" | "starting_from" | "per_day" | "custom_quote";
  timeline: string;
  deliverables: string[];
  image_url?: string | null;
  is_active: boolean;
  has_booking_form: boolean;
  form_config?: {
    ask_email?: boolean;
    ask_business?: boolean;
    ask_location?: boolean;
    ask_timeline?: boolean;
    ask_notes?: boolean;
    custom_questions?: string[];
  };
  bookings?: any[];
  booking_count?: number;
}

/**
 * Fetch all Service Packages enriched with client bookings.
 */
export async function getServicePackagesAction(): Promise<{
  success: boolean;
  data: ServicePackageItem[];
}> {
  try {
    if (!supabase) return { success: false, data: [] };

    const { data: packages, error: pkgError } = await supabase
      .from("service_packages")
      .select("*")
      .order("created_at", { ascending: false });

    if (pkgError) throw pkgError;
    if (!packages || packages.length === 0) return { success: true, data: [] };

    // Fetch all service bookings to attach to packages
    const { data: bookings, error: bookError } = await supabase
      .from("service_bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (bookError) throw bookError;

    const enriched: ServicePackageItem[] = packages.map((pkg: any) => {
      const pkgBookings = (bookings || [])
        .filter((b: any) => b.package_id === pkg.id)
        .map((b: any) => ({
          ...b,
          package_title: pkg.title,
        }));

      return {
        ...pkg,
        price_etb: Number(pkg.price_etb) || 0,
        deliverables: Array.isArray(pkg.deliverables) ? pkg.deliverables : [],
        bookings: pkgBookings,
        booking_count: pkgBookings.length,
      };
    });

    return { success: true, data: enriched };
  } catch (err) {
    console.error("Error fetching service packages:", err);
    return { success: false, data: [] };
  }
}

/**
 * Create a new Service Package with pricing and scope.
 */
export async function createServicePackageAction(payload: {
  title: string;
  category: string;
  description: string;
  price_etb: number;
  pricing_model: "fixed" | "starting_from" | "per_day" | "custom_quote";
  timeline: string;
  deliverables: string[];
  image_url?: string;
  has_booking_form?: boolean;
  form_config?: {
    ask_email?: boolean;
    ask_business?: boolean;
    ask_location?: boolean;
    ask_timeline?: boolean;
    ask_notes?: boolean;
    custom_questions?: string[];
  };
}) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) return { success: false, error: "Unauthorized." };
    if (!supabase) return { success: false, error: "Database not configured." };

    if (!payload.title || !payload.category) {
      return { success: false, error: "Title and Category are required." };
    }

    const slug =
      payload.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "") +
      "-" +
      Math.floor(1000 + Math.random() * 9000);

    const insertData = {
      title: payload.title.trim(),
      slug,
      category: payload.category.trim(),
      description: payload.description?.trim() || "",
      price_etb: payload.price_etb || 0,
      pricing_model: payload.pricing_model || "fixed",
      timeline: payload.timeline?.trim() || "Flexible",
      deliverables: payload.deliverables || [],
      image_url: payload.image_url?.trim() || "/coffee-shop-setup.jpg",
      is_active: true,
      has_booking_form: payload.has_booking_form !== false,
      form_config: payload.form_config || {
        ask_email: true,
        ask_business: true,
        ask_location: true,
        ask_timeline: true,
        ask_notes: true,
        custom_questions: [],
      },
    };

    const { data, error } = await supabase
      .from("service_packages")
      .insert([insertData])
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (err: any) {
    console.error("Error creating service package:", err);
    return { success: false, error: err?.message || "Failed to create service package." };
  }
}

/**
 * Update an existing Service Package.
 */
export async function updateServicePackageAction(
  id: string,
  payload: Partial<ServicePackageItem>
) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) return { success: false, error: "Unauthorized." };
    if (!supabase) return { success: false, error: "Database not configured." };

    const { data, error } = await supabase
      .from("service_packages")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (err: any) {
    console.error("Error updating service package:", err);
    return { success: false, error: err?.message || "Failed to update service package." };
  }
}

/**
 * Delete a Service Package and its associated bookings from the database.
 */
export async function deleteServicePackageAction(id: string) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) return { success: false, error: "Unauthorized." };
    if (!supabase) return { success: false, error: "Database not configured." };

    // 1. Delete associated bookings for this package
    await supabase.from("service_bookings").delete().eq("package_id", id);

    // 2. Delete the service package
    const { error } = await supabase.from("service_packages").delete().eq("id", id);
    if (error) throw error;
    revalidatePath("/", "layout");
    return { success: true };
  } catch (err: any) {
    console.error("Error deleting service package:", err);
    return { success: false, error: err?.message || "Failed to delete service package." };
  }
}

/**
 * Fetch all Service Bookings across all packages.
 */
export async function getServiceBookingsAction(packageId?: string) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) return { success: false, data: [] };
    if (!supabase) return { success: false, data: [] };

    let query = supabase
      .from("service_bookings")
      .select("*, service_packages(title, category, price_etb)")
      .order("created_at", { ascending: false });

    if (packageId) {
      query = query.eq("package_id", packageId);
    }

    const { data, error } = await query;
    if (error) throw error;

    const formatted = (data || []).map((row: any) => ({
      ...row,
      package_title: row.service_packages?.title || "Specialty Service Package",
      package_category: row.service_packages?.category || "Advisory",
      price_etb: row.service_packages?.price_etb || 0,
    }));

    return { success: true, data: formatted };
  } catch (err) {
    console.error("Error fetching service bookings:", err);
    return { success: false, data: [] };
  }
}

/**
 * Update the status of a service booking.
 */
export async function updateServiceBookingStatusAction(id: string, status: string) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) return { success: false, error: "Unauthorized." };
    if (!supabase) return { success: false, error: "Database not configured." };

    const { error } = await supabase
      .from("service_bookings")
      .update({ status })
      .eq("id", id);

    if (error) throw error;
    revalidatePath("/", "layout");
    return { success: true };
  } catch (err) {
    console.error("Error updating service booking status:", err);
    return { success: false, error: "Failed to update booking status." };
  }
}

/**
 * Delete a service booking record.
 */
export async function deleteServiceBookingAction(id: string) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) return { success: false, error: "Unauthorized." };
    if (!supabase) return { success: false, error: "Database not configured." };

    const { error } = await supabase.from("service_bookings").delete().eq("id", id);
    if (error) throw error;
    revalidatePath("/", "layout");
    return { success: true };
  } catch (err) {
    console.error("Error deleting service booking:", err);
    return { success: false, error: "Failed to delete booking." };
  }
}

export interface AdminNotification {
  id: string;
  type: "inquiry" | "enrollment" | "booking" | "cohort";
  title: string;
  subtitle: string;
  timeAgo: string;
  href: string;
  actionText: string;
  isNew: boolean;
  phone?: string;
}

function formatRelativeTime(dateString?: string): string {
  if (!dateString) return "Recently";
  const then = new Date(dateString).getTime();
  const now = Date.now();
  const diffSec = Math.floor((now - then) / 1000);
  if (diffSec < 60) return "Just now";
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  return new Date(dateString).toLocaleDateString([], { month: "short", day: "numeric" });
}

/**
 * Fetch real-time notifications for the Admin Header Notification Bell
 */
export async function getAdminNotificationsAction(): Promise<{
  success: boolean;
  notifications: AdminNotification[];
  unreadCount: number;
}> {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth || !supabase) {
      return { success: false, notifications: [], unreadCount: 0 };
    }

    const [inqRes, enrollRes, bookRes, schedRes] = await Promise.all([
      supabase.from("inquiries").select("*").order("created_at", { ascending: false }).limit(8),
      supabase.from("academy_enrollments").select("*, training_programs(title)").order("created_at", { ascending: false }).limit(6),
      supabase.from("service_bookings").select("*, service_packages(title)").order("created_at", { ascending: false }).limit(6),
      supabase.from("training_schedules").select("*, training_programs(title)").order("start_date", { ascending: true }).limit(5),
    ]);

    const notifications: AdminNotification[] = [];

    // 1. Inquiries
    for (const inq of inqRes.data || []) {
      const isNew = inq.status === "new" || !inq.status || inq.status === "open";
      notifications.push({
        id: `inq-${inq.id}`,
        type: "inquiry",
        title: `Inquiry from ${inq.full_name}`,
        subtitle: `${inq.service || "General Inquiry"}${inq.notes ? ` — "${inq.notes.slice(0, 45)}..."` : ""}`,
        timeAgo: formatRelativeTime(inq.created_at),
        href: `/admin/leads?search=${encodeURIComponent(inq.full_name)}`,
        actionText: "Chat on WhatsApp",
        isNew,
        phone: inq.phone,
      });
    }

    // 2. Student enrollments
    for (const enr of enrollRes.data || []) {
      const isNew = enr.status === "pending" || !enr.status;
      notifications.push({
        id: `enr-${enr.id}`,
        type: "enrollment",
        title: `Student Application: ${enr.student_name}`,
        subtitle: `${enr.training_programs?.title || enr.course_level || "Barista Academy"} | 📞 ${enr.phone}`,
        timeAgo: formatRelativeTime(enr.created_at),
        href: `/admin/training?tab=applicants&search=${encodeURIComponent(enr.student_name)}`,
        actionText: "Review Student",
        isNew,
        phone: enr.phone,
      });
    }

    // 3. Service Bookings
    for (const bkg of bookRes.data || []) {
      const isNew = bkg.status === "new" || bkg.status === "pending" || !bkg.status;
      notifications.push({
        id: `bkg-${bkg.id}`,
        type: "booking",
        title: `Service Booking: ${bkg.client_name}`,
        subtitle: `${bkg.service_packages?.title || "Custom Service"} (${bkg.business_name || bkg.venue_location || "Addis Ababa"})`,
        timeAgo: formatRelativeTime(bkg.created_at),
        href: `/admin/training?tab=services`,
        actionText: "View Booking",
        isNew,
        phone: bkg.phone,
      });
    }

    // 4. Cohorts Sold Out
    for (const sch of schedRes.data || []) {
      if (sch.seats_booked >= sch.seats_total && sch.seats_total > 0) {
        notifications.push({
          id: `sch-${sch.id}`,
          type: "cohort",
          title: `Cohort Session Sold Out`,
          subtitle: `${sch.training_programs?.title || "Academy Program"} — All ${sch.seats_total} seats booked for ${sch.start_date}`,
          timeAgo: formatRelativeTime(sch.start_date),
          href: `/admin/training?tab=courses`,
          actionText: "Schedule Cohort",
          isNew: true,
        });
      }
    }

    const unreadCount = notifications.filter((n) => n.isNew).length;
    return { success: true, notifications, unreadCount };
  } catch (err) {
    console.error("Error fetching notifications:", err);
    return { success: false, notifications: [], unreadCount: 0 };
  }
}
