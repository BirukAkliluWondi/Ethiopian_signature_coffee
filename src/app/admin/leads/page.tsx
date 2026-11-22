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
            Client Inquiries &amp; WhatsApp CRM
          </h1>
        </div>
        <p className="text-xs text-on-surface-variant pl-3.5">
          Here is the complete list of everyone who reached out to you through the website.
        </p>
      </div>

      <InquiriesCRMTable initialInquiries={inquiries} />
    </div>
  );
}
