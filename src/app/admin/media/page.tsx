import { getMediaSlotsAction } from "@/app/actions/admin-cms";
import MediaStudioClient from "./MediaStudioClient";

export default async function AdminMediaPage() {
  const res = await getMediaSlotsAction();
  const slots = res.success && res.data ? res.data : [];

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Visual Media Studio
        </h1>
        <p className="text-xs text-slate-500">
          Manage homepage banners, showcase slots, and uploaded photography with instant undo and baseline reset.
        </p>
      </div>

      <MediaStudioClient initialSlots={slots} />
    </div>
  );
}
