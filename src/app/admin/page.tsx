import Link from "next/link";
import {
  getExecutiveDashboardAnalyticsAction,
  getInquiriesAction,
} from "@/app/actions/admin-cms";
import AdminOverviewCharts from "@/components/admin/AdminOverviewCharts";

export default async function AdminDashboardPage() {
  const [analytics, inqRes] = await Promise.all([
    getExecutiveDashboardAnalyticsAction(),
    getInquiriesAction(),
  ]);

  const inquiries = inqRes.success && inqRes.data ? inqRes.data.slice(0, 6) : [];
  const kpis = analytics?.kpis || {
    totalInquiries: 0,
    newInquiries: 0,
    totalServiceBookings: 0,
    pendingBookings: 0,
    totalEnrollments: 0,
    activeCohorts: 0,
    totalPrograms: 0,
    totalPackages: 0,
    openChats: 0,
    customMediaCount: 0,
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Executive Command Header & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Operations Overview
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time telemetry across client inquiries, academy cohorts, service bookings, and media assets.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            className="px-3.5 py-2 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 text-xs font-semibold transition-all flex items-center gap-1.5 shadow-2xs"
            href="/admin/media"
          >
            <span className="material-symbols-outlined text-[16px] text-amber-600">photo_library</span>
            <span>Media Studio</span>
            {kpis.customMediaCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 text-[10px] font-bold">
                {kpis.customMediaCount}
              </span>
            )}
          </Link>

          <Link
            className="px-3.5 py-2 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 text-xs font-semibold transition-all flex items-center gap-1.5 shadow-2xs"
            href="/admin/leads"
          >
            <span className="material-symbols-outlined text-[16px] text-[#062b18]">mark_email_unread</span>
            <span>All Messages</span>
          </Link>

          <Link
            className="px-3.5 py-2 rounded-lg bg-[#062b18] hover:bg-[#0b4627] text-white text-xs font-semibold transition-all flex items-center gap-1.5 shadow-xs"
            href="/admin/training"
          >
            <span className="material-symbols-outlined text-[16px] text-[#fbbc0e]">add_circle</span>
            <span>Manage Offerings</span>
          </Link>
        </div>
      </div>

      {/* 4 Crisp Modern KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Contact Inquiries */}
        <Link
          className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between gap-4 group"
          href="/admin/leads"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 text-[#062b18] flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-xl">mark_email_unread</span>
            </div>
            {kpis.newInquiries > 0 ? (
              <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold">
                {kpis.newInquiries} New
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-md bg-slate-50 text-slate-500 border border-slate-200 text-[11px] font-semibold">
                Up to date
              </span>
            )}
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900 tracking-tight tabular-nums">
              {kpis.totalInquiries}
            </div>
            <div className="text-xs font-medium text-slate-500 mt-1 flex items-center justify-between">
              <span>Contact Form Inquiries</span>
              <span className="material-symbols-outlined text-sm text-slate-300 group-hover:text-[#062b18] transition-colors">
                arrow_forward
              </span>
            </div>
          </div>
        </Link>

        {/* KPI 2: Commercial Service Bookings */}
        <Link
          className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-amber-300 hover:shadow-md transition-all flex flex-col justify-between gap-4 group"
          href="/admin/training?tab=services"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-100 text-amber-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-xl">business_center</span>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-bold">
              {kpis.totalPackages} Packages
            </span>
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900 tracking-tight tabular-nums">
              {kpis.totalServiceBookings}
            </div>
            <div className="text-xs font-medium text-slate-500 mt-1 flex items-center justify-between">
              <span>Service Package Bookings</span>
              <span className="material-symbols-outlined text-sm text-slate-300 group-hover:text-amber-700 transition-colors">
                arrow_forward
              </span>
            </div>
          </div>
        </Link>

        {/* KPI 3: Academy Enrollments & Cohorts */}
        <Link
          className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between gap-4 group"
          href="/admin/training?tab=courses"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 text-[#0b4627] flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-xl">school</span>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-slate-50 text-slate-700 border border-slate-200 text-[11px] font-bold">
              {kpis.activeCohorts} Active Cohorts
            </span>
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900 tracking-tight tabular-nums">
              {kpis.totalEnrollments}
            </div>
            <div className="text-xs font-medium text-slate-500 mt-1 flex items-center justify-between">
              <span>Academy Registrations ({kpis.totalPrograms} courses)</span>
              <span className="material-symbols-outlined text-sm text-slate-300 group-hover:text-[#062b18] transition-colors">
                arrow_forward
              </span>
            </div>
          </div>
        </Link>

        {/* KPI 4: Visitor Live Chat */}
        <Link
          className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between gap-4 group"
          href="/admin/chat"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-xl">forum</span>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-[#062b18] border border-emerald-200 text-[11px] font-bold">
              Concierge Desk
            </span>
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900 tracking-tight tabular-nums">
              {kpis.openChats}
            </div>
            <div className="text-xs font-medium text-slate-500 mt-1 flex items-center justify-between">
              <span>Open Visitor Conversations</span>
              <span className="material-symbols-outlined text-sm text-slate-300 group-hover:text-slate-900 transition-colors">
                arrow_forward
              </span>
            </div>
          </div>
        </Link>
      </div>

      {/* Interactive Analytics Visualizations Row */}
      <AdminOverviewCharts
        activitySeries={analytics?.activitySeries || []}
        cohorts={analytics?.cohorts || []}
        serviceDemand={analytics?.serviceDemand || []}
      />

      {/* Recent Inquiries Table */}
      <section className="bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">
              Recent Client Inquiries
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Latest submissions from your public website contact desk
            </p>
          </div>
          <Link
            className="text-xs font-semibold text-[#062b18] hover:underline flex items-center gap-1 self-start sm:self-auto"
            href="/admin/leads"
          >
            <span>View Full CRM</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>

        {inquiries.length === 0 ? (
          <div className="py-12 px-4 flex flex-col items-center justify-center text-center gap-2.5">
            <div className="w-11 h-11 rounded-lg bg-slate-100 text-slate-400 flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">mark_email_read</span>
            </div>
            <div className="text-sm font-semibold text-slate-800">No inquiries received yet</div>
            <p className="text-xs text-slate-500 max-w-sm">
              Submissions from the Contact form on your public website will appear here in real time.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-500 uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-5 font-bold">Client</th>
                  <th className="py-3 px-4 font-bold">Service Domain</th>
                  <th className="py-3 px-4 font-bold">Message Note</th>
                  <th className="py-3 px-4 font-bold">Status</th>
                  <th className="py-3 px-4 font-bold">Date</th>
                  <th className="py-3 px-5 font-bold text-right">Quick Reply</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {inquiries.map((inq: any) => {
                  const status = (inq.status || "new").toLowerCase();
                  return (
                    <tr key={inq.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-5 whitespace-nowrap">
                        <div className="font-semibold text-slate-900">{inq.full_name}</div>
                        <div className="text-[11px] text-slate-400 font-mono mt-0.5">{inq.phone}</div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-700 font-medium whitespace-nowrap">
                        {inq.service}
                      </td>
                      <td className="py-3.5 px-4 max-w-xs">
                        {inq.notes ? (
                          <p className="text-xs text-slate-600 line-clamp-1">{inq.notes}</p>
                        ) : (
                          <span className="text-[11px] text-slate-400 italic">No message note</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
                            status === "new"
                              ? "bg-amber-50 text-amber-800 border-amber-200"
                              : status === "contacted"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-slate-100 text-slate-600 border-slate-200"
                          }`}
                        >
                          {status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap tabular-nums">
                        {new Date(inq.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3.5 px-5 text-right whitespace-nowrap">
                        <a
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366]/12 text-[#062b18] hover:bg-[#25D366] hover:text-white transition-colors text-xs font-semibold border border-[#25D366]/25"
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
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
