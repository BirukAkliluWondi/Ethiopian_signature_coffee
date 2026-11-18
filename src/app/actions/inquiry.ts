"use server";

import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export interface InquiryFormData {
  fullName: string;
  phone: string;
  email?: string;
  service: string;
  notes?: string;
}

export interface InquiryResponse {
  success: boolean;
  message: string;
  error?: string;
}

export async function submitInquiryAction(
  data: InquiryFormData
): Promise<InquiryResponse> {
  try {
    // 1. Basic Server-side validation
    if (!data.fullName || data.fullName.trim().length < 2) {
      return {
        success: false,
        message: "Please provide your full name (at least 2 characters).",
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

    if (!data.service) {
      return {
        success: false,
        message: "Please select a coffee service or advisory capability.",
        error: "INVALID_SERVICE",
      };
    }

    // 2. Insert into Supabase if configured
    if (isSupabaseConfigured() && supabase) {
      const { error: insertError } = await supabase.from("inquiries").insert([
        {
          full_name: data.fullName.trim(),
          phone: data.phone.trim(),
          email: data.email?.trim() || null,
          service: data.service,
          notes: data.notes?.trim() || null,
          status: "new",
        },
      ]);

      if (insertError) {
        console.error("Supabase insert error:", insertError);
        return {
          success: false,
          message: "Failed to save inquiry to database. Please try again or reach out on WhatsApp.",
          error: insertError.message,
        };
      }

      return {
        success: true,
        message:
          "Thank you! Your inquiry has been stored securely in our advisory database. Our senior consultant will contact you via WhatsApp or Phone within 24 hours.",
      };
    }

    // 3. Fallback / Simulation mode if .env.local keys are not yet configured
    console.log(
      "[DEMO MODE] Supabase keys not set in .env.local yet. Staged submission:",
      data
    );

    return {
      success: true,
      message:
        "Thank you! Your request has been received. (Note: Supabase credentials not yet configured in .env.local; running in demonstration mode).",
    };
  } catch (err: unknown) {
    console.error("Unexpected error submitting inquiry:", err);
    return {
      success: false,
      message: "An unexpected error occurred. Please contact us directly on WhatsApp.",
      error: err instanceof Error ? err.message : "UNKNOWN_ERROR",
    };
  }
}
