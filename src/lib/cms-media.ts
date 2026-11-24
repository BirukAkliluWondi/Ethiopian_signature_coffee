import { supabase } from "@/lib/supabase";

/**
 * Pristine original baseline images for all website slots
 */
export const ORIGINAL_MEDIA_BASELINE: Record<string, string> = {
  hero_slide_0: "/hero/ceremony-woman.jpg",
  hero_slide_1: "/hero/roast-and-jebena.jpg",
  hero_slide_2: "/hero/coffee-community-celebration.jpg",
  service_setup: "/coffee-shop-setup.jpg",
  service_barista: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop",
  service_menu: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop",
  service_consulting: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=800&auto=format&fit=crop",
  service_operations: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=800&auto=format&fit=crop",
  service_profitability: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?q=80&w=800&auto=format&fit=crop",
  catering_showcase: "/catering-services.jpg",
};

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
