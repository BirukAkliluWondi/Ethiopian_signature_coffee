import { supabase } from "@/lib/supabase";

/**
 * Pristine original baseline images for all website slots
 */
export const ORIGINAL_MEDIA_BASELINE: Record<string, string> = {
  hero_slide_0:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCDDk-iFEvRORMomf5aJppkPdG4X1Afc0D1RwBOm5ZtWA5r-y2Fyk-Srlgmy6w0-XU6hgHyrtZHntI6m50dGyZiGAT5Z4lVML8lFr_PhoYRLtlSA0cAmeC_YyVt7YCSt2qR49OxsjXxr-zwduJ6SQPKxbroL9vdg2pZU8E_F-s3VpJPowK1lkr1Gms7ycTU43SRwoS98u0CrzuJ3y8S2Ym8a7J-x4IWdPiRIOE_vxRrmiLghhNGr-x5",
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
