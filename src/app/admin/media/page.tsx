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
            Change Website Photos &amp; Media Studio
          </h1>
        </div>
        <p className="text-xs text-on-surface-variant pl-3.5">
          Follow the simple guides below to swap any photo on the website or upload new ceremony, catering, and academy pictures.
        </p>
      </div>

      <MediaStudioClient initialSlots={slots} />
    </div>
  );
}
