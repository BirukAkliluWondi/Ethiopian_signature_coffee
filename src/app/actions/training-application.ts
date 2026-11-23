"use server";

import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export interface TrainingApplicationData {
  programId: string;
  cohortId?: string;
  studentName: string;
  phone: string;
  email?: string;
  courseLevel?: string;
  experienceLevel?: string;
  organization?: string;
  notes?: string;
  customAnswers?: Record<string, string>;
}

export interface TrainingApplicationResponse {
  success: boolean;
  message: string;
  applicantId?: string;
  error?: string;
}

/**
 * Handles public submissions for Barista Academy course and cohort applications.
 */
export async function submitTrainingApplicationAction(
  data: TrainingApplicationData
): Promise<TrainingApplicationResponse> {
  try {
    if (!data.studentName || data.studentName.trim().length < 2) {
      return {
        success: false,
        message: "Please enter your full name (at least 2 characters).",
        error: "INVALID_NAME",
      };
    }

    if (!data.phone || data.phone.trim().length < 7) {
      return {
        success: false,
        message: "Please enter a valid phone number or WhatsApp contact.",
        error: "INVALID_PHONE",
      };
    }

    if (!data.programId) {
      return {
        success: false,
        message: "Course program identifier is missing.",
        error: "INVALID_PROGRAM",
      };
    }

    if (!isSupabaseConfigured() || !supabase) {
      return {
        success: false,
        message: "Database connection unavailable. Please contact us on WhatsApp directly.",
        error: "DB_NOT_CONFIGURED",
      };
    }

    // Insert enrollment
    const insertPayload: Record<string, any> = {
      program_id: data.programId,
      student_name: data.studentName.trim(),
      phone: data.phone.trim(),
      email: data.email?.trim() || null,
      course_level: data.courseLevel || "Foundation",
      experience_level: data.experienceLevel || null,
      organization: data.organization?.trim() || null,
      notes: data.notes?.trim() || null,
      custom_answers: data.customAnswers && Object.keys(data.customAnswers).length > 0 ? data.customAnswers : null,
      status: "pending",
    };

    if (data.cohortId) {
      insertPayload.cohort_id = data.cohortId;
    }

    const { data: inserted, error: insertError } = await supabase
      .from("academy_enrollments")
      .insert([insertPayload])
      .select("id")
      .single();

    if (insertError) {
      console.error("Enrollment insert error:", insertError);
      throw insertError;
    }

    // Optionally increment cohort booked seats if a specific cohort was selected
    if (data.cohortId) {
      try {
        const { data: sched } = await supabase
          .from("training_schedules")
          .select("seats_booked, seats_total")
          .eq("id", data.cohortId)
          .single();

        if (sched) {
          const newBooked = (sched.seats_booked || 0) + 1;
          const newStatus = newBooked >= sched.seats_total ? "sold_out" : newBooked >= sched.seats_total - 2 ? "filling_fast" : "open";
          await supabase
            .from("training_schedules")
            .update({ seats_booked: newBooked, status: newStatus })
            .eq("id", data.cohortId);
        }
      } catch (cohortUpdateErr) {
        console.warn("Could not increment cohort seats:", cohortUpdateErr);
      }
    }

    return {
      success: true,
      message: "Application submitted successfully. Our team will review your application and message you on WhatsApp to confirm your seat.",
      applicantId: inserted?.id,
    };
  } catch (err: unknown) {
    console.error("Training application action error:", err);
    return {
      success: false,
      message: "Unable to submit application at this moment. Please reach out via WhatsApp at +251925451711.",
      error: "SERVER_ERROR",
    };
  }
}
