import { Suspense } from "react";
import { getInquiriesAction } from "@/app/actions/admin-cms";
import InquiriesCRMTable from "./InquiriesCRMTable";

export default async function AdminLeadsPage() {
  const inqRes = await getInquiriesAction();
  const inquiries = inqRes.success && inqRes.data ? inqRes.data : [];

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-4 bg-stitch-primary rounded-full shrink-0" />
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-stitch-primary">
            Contact Form Messages &amp; Client Inquiries
          </h1>
        </div>
        <p className="text-xs text-on-surface-variant pl-3.5">
          This is where you see all texts and messages sent by visitors using the &ldquo;Contact Me&rdquo; section on your website.
        </p>
      </div>

      <Suspense fallback={<div className="p-8 text-center text-xs text-on-surface-variant">Loading messages...</div>}>
        <InquiriesCRMTable initialInquiries={inquiries} />
      </Suspense>
    </div>
  );
}
