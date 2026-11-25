import { getAdminChatThreadsAction } from "@/app/actions/chat";
import AdminChatClient from "./AdminChatClient";

export default async function AdminChatPage() {
  const res = await getAdminChatThreadsAction();
  const threads = res.success && res.data ? res.data : [];

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Visitor Support Inbox
        </h1>
        <p className="text-xs text-slate-500">
          Respond to live website concierge conversations asynchronously with instant quick replies.
        </p>
      </div>

      <AdminChatClient initialThreads={threads} />
    </div>
  );
}
