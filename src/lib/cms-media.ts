import { supabase } from "@/lib/supabase";

/**
 * Returns the configured image URL for a given media slot, falling back to the static asset.
 */
export async function getMediaSlotUrl(
  slotKey: string,
  fallbackUrl: string
): Promise<string> {
  try {
    if (!supabase) return fallbackUrl;

    const { data } = await supabase
      .from("media_assets")
      .select("image_url")
      .eq("slot_key", slotKey)
      .eq("is_active", true)
      .maybeSingle();

    return data?.image_url || fallbackUrl;
  } catch {
    return fallbackUrl;
  }
}
