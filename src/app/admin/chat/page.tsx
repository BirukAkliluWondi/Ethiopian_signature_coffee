import { getAdminChatThreadsAction } from "@/app/actions/chat";
import AdminChatClient from "./AdminChatClient";

export default async function AdminChatPage() {
  const res = await getAdminChatThreadsAction();
  const threads = res.success && res.data ? res.data : [];

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-4 bg-stitch-primary rounded-full shrink-0" />
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-stitch-primary">
            Visitor Live Chat &amp; Support Inbox
          </h1>
        </div>
        <p className="text-xs text-on-surface-variant pl-3.5">
          Follow the step-by-step guide below to read questions asked by website visitors and send replies easily.
        </p>
      </div>

      <AdminChatClient initialThreads={threads} />
    </div>
  );
}
