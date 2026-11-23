"use server";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://euurwcbcfyiburntrngh.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1dXJ3Y2JjZnlpYnVybnRybmdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ5NTU1MTEsImV4cCI6MjExMDUzMTUxMX0.YwwqJgKgL98yjJaHf-9y0T4gHgZ-ZsPO1HCgSywQoDo";

export interface ServiceBookingPayload {
  packageId: string;
  packageTitle?: string;
  clientName: string;
  phone: string;
  email?: string;
  businessName?: string;
  venueLocation?: string;
  targetTimeline?: string;
  notes?: string;
  customAnswers?: Record<string, any>;
}

export interface ServiceBookingResult {
  success: boolean;
  error?: string;
  bookingId?: string;
  clientName?: string;
  packageTitle?: string;
  phone?: string;
}

export async function submitServiceBookingAction(
  payload: ServiceBookingPayload
): Promise<ServiceBookingResult> {
  try {
    if (!payload.packageId) {
      return { success: false, error: "Please select a valid service package." };
    }
    if (!payload.clientName || payload.clientName.trim().length < 2) {
      return { success: false, error: "Please enter your full name." };
    }
    if (!payload.phone || payload.phone.trim().length < 7) {
      return { success: false, error: "Please provide a valid phone or WhatsApp number." };
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Verify package exists and get title if not supplied
    let resolvedTitle = payload.packageTitle;
    if (!resolvedTitle) {
      const { data: pkg } = await supabase
        .from("service_packages")
        .select("title")
        .eq("id", payload.packageId)
        .single();
      resolvedTitle = pkg?.title || "Specialty Service Package";
    }

    const insertData = {
      package_id: payload.packageId,
      client_name: payload.clientName.trim(),
      phone: payload.phone.trim(),
      email: payload.email?.trim() || null,
      business_name: payload.businessName?.trim() || null,
      venue_location: payload.venueLocation?.trim() || null,
      target_timeline: payload.targetTimeline?.trim() || null,
      notes: payload.notes?.trim() || null,
      custom_answers: payload.customAnswers || {},
      status: "new",
    };

    const { data, error } = await supabase
      .from("service_bookings")
      .insert([insertData])
      .select("id")
      .single();

    if (error) {
      console.error("Supabase service booking error:", error);
      return { success: false, error: "Failed to record booking. Please reach us directly on WhatsApp." };
    }

    return {
      success: true,
      bookingId: data.id,
      clientName: payload.clientName.trim(),
      packageTitle: resolvedTitle,
      phone: payload.phone.trim(),
    };
  } catch (err: any) {
    console.error("submitServiceBookingAction exception:", err);
    return { success: false, error: "An unexpected error occurred. Please try again." };
  }
}
