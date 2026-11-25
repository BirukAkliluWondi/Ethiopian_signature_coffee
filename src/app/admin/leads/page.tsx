import { Suspense } from "react";
import { getInquiriesAction } from "@/app/actions/admin-cms";
import InquiriesCRMTable from "./InquiriesCRMTable";

export default async function AdminLeadsPage() {
  const inqRes = await getInquiriesAction();
  const inquiries = inqRes.success && inqRes.data ? inqRes.data : [];

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Contact Messages &amp; Inquiries
        </h1>
        <p className="text-xs text-slate-500">
          Review inbound visitor messages, track response status, export leads, or reply directly via WhatsApp.
        </p>
      </div>

      <Suspense fallback={<div className="p-8 text-center text-xs text-slate-500">Loading messages...</div>}>
        <InquiriesCRMTable initialInquiries={inquiries} />
      </Suspense>
    </div>
  );
}
