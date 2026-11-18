import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export interface InquiryRecord {
  id?: string;
  created_at?: string;
  full_name: string;
  phone: string;
  email?: string;
  service: string;
  notes?: string;
  status?: "new" | "contacted" | "scheduled" | "completed" | "archived";
}

/**
 * Returns true if Supabase credentials are configured in the environment.
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl !== "https://your-project-id.supabase.co"
  );
}

/**
 * Shared Supabase client instance.
 * Gracefully returns null if environment variables are not yet populated.
 */
export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl as string, supabaseAnonKey as string)
  : null;
