import { getMediaSlotsAction } from "@/app/actions/admin-cms";
import MediaStudioClient from "./MediaStudioClient";

export default async function AdminMediaPage() {
  const res = await getMediaSlotsAction();
  const slots = res.success && res.data ? res.data : [];

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
          Visual Media Studio &amp; CMS
        </h1>
        <p className="text-xs text-stone-400 mt-1">
          Upload new pictures to local server storage, replace existing carousel slides, and update photography across all sections.
        </p>
      </div>

      <MediaStudioClient initialSlots={slots} />
    </div>
  );
}
