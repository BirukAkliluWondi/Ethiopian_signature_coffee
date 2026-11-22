import Link from "next/link";
import { getExecutiveKPIsAction, getInquiriesAction } from "@/app/actions/admin-cms";

export default async function AdminDashboardPage() {
  const [kpis, inqRes] = await Promise.all([
    getExecutiveKPIsAction(),
    getInquiriesAction(),
  ]);

  const inquiries = inqRes.success && inqRes.data ? inqRes.data.slice(0, 5) : [];

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Operations &amp; Intelligence Overview
          </h1>
          <p className="text-xs text-stone-400 mt-1">
            Real-time telemetry, lead pipeline distribution, and administrative controls.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            className="px-4 py-2.5 rounded-xl bg-brand-yellow hover:bg-brand-yellow-light text-stone-950 font-bold text-xs uppercase tracking-wider transition-all shadow-cozy flex items-center gap-2"
            href="/admin/media"
          >
            <span className="material-symbols-outlined text-base">add_photo_alternate</span>
            <span>Upload Photo</span>
          </Link>
          <Link
            className="px-4 py-2.5 rounded-xl bg-brand-green hover:bg-brand-green-dark text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-cozy flex items-center gap-2 border border-brand-green-light/30"
            href="/admin/training"
          >
            <span className="material-symbols-outlined text-base">calendar_add_on</span>
            <span>Schedule Cohort</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 flex flex-col justify-between gap-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-400">Total Inquiries</span>
            <div className="w-8 h-8 rounded-lg bg-stone-800 text-brand-yellow flex items-center justify-center">
              <span className="material-symbols-outlined text-lg">mark_email_read</span>
            </div>
          </div>
          <div>
            <span className="font-serif text-3xl font-bold text-white block">
              {kpis?.totalInquiries ?? 0}
            </span>
            <span className="text-[11px] text-emerald-400 mt-1 block">
              {kpis?.newInquiries ?? 0} new uncontacted
            </span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 flex flex-col justify-between gap-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-400">Active Cohorts</span>
            <div className="w-8 h-8 rounded-lg bg-stone-800 text-emerald-400 flex items-center justify-center">
              <span className="material-symbols-outlined text-lg">event_available</span>
            </div>
          </div>
          <div>
            <span className="font-serif text-3xl font-bold text-white block">
              {kpis?.activeCohorts ?? 0}
            </span>
            <span className="text-[11px] text-stone-400 mt-1 block">
              Across {kpis?.totalPrograms ?? 0} certified courses
            </span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 flex flex-col justify-between gap-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-400">Concierge Chats</span>
            <div className="w-8 h-8 rounded-lg bg-stone-800 text-blue-400 flex items-center justify-center">
              <span className="material-symbols-outlined text-lg">forum</span>
            </div>
          </div>
          <div>
            <span className="font-serif text-3xl font-bold text-white block">
              {kpis?.openChats ?? 0}
            </span>
            <span className="text-[11px] text-stone-400 mt-1 block">
              Asynchronous visitor threads
            </span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 flex flex-col justify-between gap-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-400">Direct Phone Desk</span>
            <div className="w-8 h-8 rounded-lg bg-stone-800 text-[#25D366] flex items-center justify-center">
              <span className="material-symbols-outlined text-lg">phone_in_talk</span>
            </div>
          </div>
          <div>
            <span className="font-serif text-lg font-bold text-white block">
              +251 925 451 711
            </span>
            <span className="text-[11px] text-stone-400 mt-1 block">
              WhatsApp &amp; Telegram active
            </span>
          </div>
        </div>
      </div>

      {/* Recent Inquiries Stream */}
      <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 flex flex-col gap-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-stone-800 pb-4">
          <div>
            <h3 className="font-serif text-lg font-bold text-white">
              Recent Client Inquiries
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              Latest consultation requests, catering inquiries, and training applications.
            </p>
          </div>
          <Link
            className="text-xs font-semibold text-brand-yellow hover:underline flex items-center gap-1"
            href="/admin/leads"
          >
            <span>View All Leads</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>

        {inquiries.length === 0 ? (
          <div className="py-8 text-center text-xs text-stone-500">
            No inquiries recorded yet. Test submissions from the public contact form will appear here.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-800 text-stone-400 uppercase tracking-wider text-[10px]">
                  <th className="pb-3 font-semibold">Lead Name</th>
                  <th className="pb-3 font-semibold">Service Area</th>
                  <th className="pb-3 font-semibold">Contact Details</th>
                  <th className="pb-3 font-semibold">Date</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/60">
                {inquiries.map((inq: any) => (
                  <tr key={inq.id} className="hover:bg-stone-800/30 transition-colors">
                    <td className="py-3.5 font-medium text-white">
                      {inq.full_name}
                    </td>
                    <td className="py-3.5 text-stone-300">
                      {inq.service}
                    </td>
                    <td className="py-3.5 text-stone-400">
                      <div>{inq.phone}</div>
                      {inq.email && <div className="text-[11px] text-stone-500">{inq.email}</div>}
                    </td>
                    <td className="py-3.5 text-stone-500">
                      {new Date(inq.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3.5">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {inq.status || "new"}
                      </span>
                    </td>
                    <td className="py-3.5 text-right">
                      <a
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors text-xs font-semibold"
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
