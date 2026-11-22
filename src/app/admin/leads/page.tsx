import { getInquiriesAction } from "@/app/actions/admin-cms";
import InquiriesCRMTable from "./InquiriesCRMTable";

export default async function AdminLeadsPage() {
  const inqRes = await getInquiriesAction();
  const inquiries = inqRes.success && inqRes.data ? inqRes.data : [];

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
          Client Inquiries &amp; Pipeline CRM
        </h1>
        <p className="text-xs text-stone-400 mt-1">
          Review, filter, and track lifecycle status for all venue consultation, catering, and academy leads.
        </p>
      </div>

      <InquiriesCRMTable initialInquiries={inquiries} />
    </div>
  );
}
