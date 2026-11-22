import Link from "next/link";
import { getExecutiveKPIsAction, getInquiriesAction } from "@/app/actions/admin-cms";

export default async function AdminDashboardPage() {
  const [kpis, inqRes] = await Promise.all([
    getExecutiveKPIsAction(),
    getInquiriesAction(),
  ]);

  const inquiries = inqRes.success && inqRes.data ? inqRes.data.slice(0, 5) : [];

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Status & Quick Stats Bar matching Stitch UI */}
      <section className="bg-surface-container-lowest rounded-xl p-4 sm:p-5 border border-surface-container-highest shadow-sm">
        <div className="flex items-center justify-between pb-3 mb-3 bg-surface-container-low rounded-lg p-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-stitch-primary-container text-stitch-on-primary-container flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px]">insights</span>
            </div>
            <div className="min-w-0">
              <span className="text-[11px] font-bold text-stitch-primary uppercase block tracking-wider">
                Executive Operations
              </span>
              <span className="text-xs text-on-surface-variant truncate block">
                Direct Supabase Live Synchronization &amp; CRM Telemetry
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-surface-container-highest px-2.5 py-1 rounded-lg shrink-0">
            <span className="w-2 h-2 rounded-full bg-stitch-primary animate-pulse" />
            <span className="text-[11px] font-bold text-stitch-primary uppercase tracking-wider">
              Live System
            </span>
          </div>
        </div>

        {/* Quick Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 text-center">
          <div className="flex flex-col items-center bg-surface-container-low/70 py-3 px-2 rounded-lg">
            <span className="font-serif text-3xl font-bold text-stitch-primary leading-none">
              {kpis?.totalInquiries ?? 0}
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant mt-1.5">
              Total Inquiries
            </span>
            <span className="text-[10px] text-stitch-primary font-semibold mt-0.5">
              {kpis?.newInquiries ?? 0} new uncontacted
            </span>
          </div>

          <div className="flex flex-col items-center bg-surface-container-low/70 py-3 px-2 rounded-lg">
            <span className="font-serif text-3xl font-bold text-stitch-secondary leading-none">
              {kpis?.activeCohorts ?? 0}
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant mt-1.5">
              Active Cohorts
            </span>
            <span className="text-[10px] text-on-surface-variant font-medium mt-0.5">
              Across {kpis?.totalPrograms ?? 0} courses
            </span>
          </div>

          <div className="flex flex-col items-center bg-surface-container-low/70 py-3 px-2 rounded-lg">
            <span className="font-serif text-3xl font-bold text-stitch-primary leading-none">
              {kpis?.openChats ?? 0}
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant mt-1.5">
              Concierge Chats
            </span>
            <span className="text-[10px] text-on-surface-variant font-medium mt-0.5">
              Visitor threads
            </span>
          </div>

          <div className="flex flex-col items-center bg-surface-container-low/70 py-3 px-2 rounded-lg">
            <span className="font-serif text-xl sm:text-2xl font-bold text-stitch-primary leading-tight">
              +251 925 451 711
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant mt-1.5">
              Direct Desk
            </span>
            <span className="text-[10px] text-stitch-secondary font-medium mt-0.5">
              WhatsApp &amp; Telegram
            </span>
          </div>
        </div>
      </section>

      {/* Section Header with Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-4 bg-stitch-primary rounded-full shrink-0" />
          <h2 className="font-serif text-xl sm:text-2xl font-semibold text-stitch-primary">
            Active Operations &amp; Client Pipeline
          </h2>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            className="px-3.5 py-2 rounded-lg bg-stitch-primary text-white hover:bg-stitch-primary-container font-semibold text-xs tracking-wider transition-colors shadow-sm flex items-center gap-1.5"
            href="/admin/media"
          >
            <span className="material-symbols-outlined text-base">add_photo_alternate</span>
            <span>Upload Photo</span>
          </Link>
          <Link
            className="px-3.5 py-2 rounded-lg bg-surface-container-low text-on-surface hover:text-stitch-primary hover:bg-surface-container font-semibold text-xs tracking-wider transition-colors border border-surface-container-highest flex items-center gap-1.5"
            href="/admin/training"
          >
            <span className="material-symbols-outlined text-base">calendar_add_on</span>
            <span>Schedule Cohort</span>
          </Link>
        </div>
      </div>

      {/* Recent Client Inquiries Stream */}
      <div className="bg-surface-container-lowest rounded-xl p-5 border border-surface-container-highest shadow-sm flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-surface-container-highest pb-3">
          <div>
            <h3 className="font-serif text-lg font-semibold text-stitch-primary">
              Recent Client Inquiries
            </h3>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Latest consultation requests, catering inquiries, and barista academy applications.
            </p>
          </div>
          <Link
            className="text-xs font-bold text-stitch-primary hover:underline flex items-center gap-1"
            href="/admin/leads"
          >
            <span>View All Leads</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>

        {inquiries.length === 0 ? (
          <div className="py-8 text-center text-xs text-on-surface-variant">
            No inquiries recorded yet. Test submissions from the public contact form will appear here.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-surface-container-highest bg-surface-container-low/70 text-on-surface-variant uppercase tracking-wider text-[10px]">
                  <th className="py-2.5 px-3 font-bold">Lead Name</th>
                  <th className="py-2.5 px-3 font-bold">Service Area</th>
                  <th className="py-2.5 px-3 font-bold">Contact Details</th>
                  <th className="py-2.5 px-3 font-bold">Date</th>
                  <th className="py-2.5 px-3 font-bold">Status</th>
                  <th className="py-2.5 px-3 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-highest">
                {inquiries.map((inq: any) => (
                  <tr key={inq.id} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="py-3 px-3 font-semibold text-on-surface">
                      {inq.full_name}
                    </td>
                    <td className="py-3 px-3 text-on-surface-variant font-medium">
                      {inq.service}
                    </td>
                    <td className="py-3 px-3 text-on-surface-variant">
                      <div className="font-mono text-xs text-on-surface">{inq.phone}</div>
                      {inq.email && <div className="text-[11px] text-on-surface-variant">{inq.email}</div>}
                    </td>
                    <td className="py-3 px-3 text-on-surface-variant">
                      {new Date(inq.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-surface-container-high text-stitch-primary border border-surface-container-highest">
                        {inq.status || "new"}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <a
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#25D366]/15 text-[#0d472a] hover:bg-[#25D366] hover:text-white transition-colors text-xs font-semibold"
                        href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(
                          inq.full_name
                        )}%2C%20thank%20you%20for%20contacting%20Ethiopian%20Signature%20Coffee.`}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <span>WhatsApp</span>
                        <span className="material-symbols-outlined text-xs">arrow_outward</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
