"use server";

import fs from "fs/promises";
import path from "path";
import { supabase } from "@/lib/supabase";
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
 * Update a media slot to point to a new image URL
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

    const updatePayload: Record<string, unknown> = {
      image_url: imageUrl.trim(),
      updated_at: new Date().toISOString(),
    };
    if (title) updatePayload.title = title.trim();
    if (altText) updatePayload.alt_text = altText.trim();

    const { error } = await supabase
      .from("media_assets")
      .update(updatePayload)
      .eq("slot_key", slotKey);

    if (error) throw error;
    return { success: true };
  } catch (err: unknown) {
    console.error("Error updating media slot:", err);
    return { success: false, error: "Failed to update media slot." };
  }
}

/**
 * Fetch training programs along with their cohort schedules
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

    const enriched = (programs || []).map((prog) => ({
      ...prog,
      schedules: (schedules || []).filter((s) => s.program_id === prog.id),
    }));

    return { success: true, data: enriched };
  } catch (err: unknown) {
    console.error("Error fetching training programs:", err);
    return { success: false, data: [] };
  }
}

/**
 * Create a new training program
 */
export async function createTrainingProgramAction(payload: {
  title: string;
  level: string;
  duration: string;
  description: string;
  tuition_etb: number;
  curriculum: string[];
}) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) return { success: false, error: "Unauthorized." };
    if (!supabase) return { success: false, error: "Database not configured." };

    const slug = payload.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const { error } = await supabase.from("training_programs").insert([
      {
        title: payload.title.trim(),
        slug: `${slug}-${Date.now().toString().slice(-4)}`,
        level: payload.level,
        duration: payload.duration.trim(),
        description: payload.description.trim(),
        tuition_etb: Number(payload.tuition_etb) || 0,
        curriculum: payload.curriculum,
        is_active: true,
      },
    ]);

    if (error) throw error;
    return { success: true };
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

    const { error } = await supabase.from("training_schedules").insert([
      {
        program_id: payload.program_id,
        start_date: payload.start_date,
        end_date: payload.end_date,
        session_time: payload.session_time.trim(),
        seats_total: Number(payload.seats_total) || 8,
        seats_booked: 0,
        status: "open",
      },
    ]);

    if (error) throw error;
    return { success: true };
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
    return { success: true };
  } catch (err: unknown) {
    console.error("Error deleting cohort schedule:", err);
    return { success: false, error: "Failed to delete cohort." };
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

    const [inqRes, progRes, schedRes, chatRes] = await Promise.all([
      supabase.from("inquiries").select("id, status, created_at"),
      supabase.from("training_programs").select("id"),
      supabase.from("training_schedules").select("id, seats_total, seats_booked, status"),
      supabase.from("chat_threads").select("id, status"),
    ]);

    const inquiries = inqRes.data || [];
    const newInquiries = inquiries.filter((i) => !i.status || i.status === "new" || i.status === "open").length;
    const totalPrograms = (progRes.data || []).length;
    const activeCohorts = (schedRes.data || []).filter((s) => s.status !== "completed").length;
    const openChats = (chatRes.data || []).filter((c) => c.status === "open").length;

    return {
      totalInquiries: inquiries.length,
      newInquiries,
      totalPrograms,
      activeCohorts,
      openChats,
    };
  } catch (err) {
    console.error("Error compiling executive KPIs:", err);
    return null;
  }
}
