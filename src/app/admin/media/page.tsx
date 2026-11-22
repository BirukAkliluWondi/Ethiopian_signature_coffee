import { getMediaSlotsAction } from "@/app/actions/admin-cms";
import MediaStudioClient from "./MediaStudioClient";

export default async function AdminMediaPage() {
  const res = await getMediaSlotsAction();
  const slots = res.success && res.data ? res.data : [];

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-4 bg-stitch-primary rounded-full shrink-0" />
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-stitch-primary">
            Media &amp; Assets Studio
          </h1>
        </div>
        <p className="text-xs text-on-surface-variant pl-3.5">
          Upload new pictures to local server storage, replace existing carousel slides, and manage photography across all sections.
        </p>
      </div>

      <MediaStudioClient initialSlots={slots} />
    </div>
  );
}
