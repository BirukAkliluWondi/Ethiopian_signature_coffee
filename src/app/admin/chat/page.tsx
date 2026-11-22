import { getAdminChatThreadsAction } from "@/app/actions/chat";
import AdminChatClient from "./AdminChatClient";

export default async function AdminChatPage() {
  const res = await getAdminChatThreadsAction();
  const threads = res.success && res.data ? res.data : [];

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
          Signature Concierge Live Support Inbox
        </h1>
        <p className="text-xs text-stone-400 mt-1">
          Asynchronous messaging center for public website visitors. Respond directly to queries even when visitors are offline.
        </p>
      </div>

      <AdminChatClient initialThreads={threads} />
    </div>
  );
}
