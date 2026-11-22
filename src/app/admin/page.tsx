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
      {/* Welcome & Simple Step-by-Step Action Guide */}
      <section className="bg-surface-container-lowest rounded-xl p-5 border border-surface-container-highest shadow-sm flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-surface-container-highest pb-3">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 bg-stitch-primary rounded-full shrink-0" />
            <h1 className="font-serif text-xl sm:text-2xl font-semibold text-stitch-primary">
              Website Management &amp; Step-by-Step Guide
            </h1>
          </div>
          <span className="text-xs text-on-surface-variant">
            Everything you need to control your website is organized below.
          </span>
        </div>

        {/* 4 Step Cards for Admin */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          {/* Step 1: Contact Form Texts */}
          <div className="p-3.5 rounded-lg bg-surface-container-low border border-surface-container-highest flex flex-col justify-between gap-3">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="w-5 h-5 rounded bg-stitch-primary text-white text-[11px] font-bold flex items-center justify-center">
                  1
                </span>
                <span className="material-symbols-outlined text-stitch-primary text-lg">mark_email_unread</span>
              </div>
              <h2 className="font-semibold text-xs text-on-surface">Contact Form Texts</h2>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                All messages and texts sent from the &ldquo;Contact Me&rdquo; section on your website arrive here. Click <strong>WhatsApp</strong> to reply.
              </p>
            </div>
            <Link
              className="text-[11px] font-bold text-stitch-primary hover:underline flex items-center gap-1 mt-1"
              href="/admin/leads"
            >
              <span>Read Contact Messages</span>
              <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </Link>
          </div>

          {/* Step 2: Change Photos */}
          <div className="p-3.5 rounded-lg bg-surface-container-low border border-surface-container-highest flex flex-col justify-between gap-3">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="w-5 h-5 rounded bg-stitch-primary text-white text-[11px] font-bold flex items-center justify-center">
                  2
                </span>
                <span className="material-symbols-outlined text-stitch-secondary text-lg">photo_library</span>
              </div>
              <h2 className="font-semibold text-xs text-on-surface">Change Photos</h2>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                Upload new pictures and replace images on the homepage hero banner, catering, or services.
              </p>
            </div>
            <Link
              className="text-[11px] font-bold text-stitch-primary hover:underline flex items-center gap-1 mt-1"
              href="/admin/media"
            >
              <span>Open Photo Studio</span>
              <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </Link>
          </div>

          {/* Step 3: Training Classes */}
          <div className="p-3.5 rounded-lg bg-surface-container-low border border-surface-container-highest flex flex-col justify-between gap-3">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="w-5 h-5 rounded bg-stitch-primary text-white text-[11px] font-bold flex items-center justify-center">
                  3
                </span>
                <span className="material-symbols-outlined text-stitch-tertiary-fixed-dim text-lg">school</span>
              </div>
              <h2 className="font-semibold text-xs text-on-surface">Training Classes</h2>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                Add upcoming Barista Academy cohort dates, seat limits, and tuition prices so students can register.
              </p>
            </div>
            <Link
              className="text-[11px] font-bold text-stitch-primary hover:underline flex items-center gap-1 mt-1"
              href="/admin/training"
            >
              <span>Manage Schedules</span>
              <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </Link>
          </div>

          {/* Step 4: Visitor Chat */}
          <div className="p-3.5 rounded-lg bg-surface-container-low border border-surface-container-highest flex flex-col justify-between gap-3">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="w-5 h-5 rounded bg-stitch-primary text-white text-[11px] font-bold flex items-center justify-center">
                  4
                </span>
                <span className="material-symbols-outlined text-stitch-primary text-lg">forum</span>
              </div>
              <h2 className="font-semibold text-xs text-on-surface">Visitor Chat</h2>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                Answer live questions from visitors on the website. Visitors can read your answer even if they return later.
              </p>
            </div>
            <Link
              className="text-[11px] font-bold text-stitch-primary hover:underline flex items-center gap-1 mt-1"
              href="/admin/chat"
            >
              <span>Open Chat Inbox</span>
              <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Live Activity Counters */}
      <section className="bg-surface-container-lowest rounded-xl p-4 sm:p-5 border border-surface-container-highest shadow-sm">
        <div className="flex items-center justify-between pb-3 mb-3 bg-surface-container-low rounded-lg p-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-stitch-primary-container text-stitch-on-primary-container flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-base">monitoring</span>
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold text-stitch-primary uppercase tracking-wider block">
                Live Website Numbers
              </span>
              <span className="text-[11px] text-on-surface-variant truncate block">
                All numbers update automatically whenever a client contacts you or a student signs up.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-surface-container-highest px-2 py-0.5 rounded text-[11px] font-bold text-stitch-primary shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-stitch-primary animate-pulse" />
            <span>Connected</span>
          </div>
        </div>

        {/* 4 Simple Metric Boxes */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 text-center">
          <div className="flex flex-col items-center bg-surface-container-low/70 py-3 px-2 rounded-lg">
            <span className="font-serif text-3xl font-bold text-stitch-primary leading-none">
              {kpis?.totalInquiries ?? 0}
            </span>
            <span className="text-xs font-bold text-on-surface mt-1.5">
              Contact Form Texts
            </span>
            <span className="text-[11px] text-stitch-primary font-medium mt-0.5">
              {kpis?.newInquiries ?? 0} new waiting
            </span>
          </div>

          <div className="flex flex-col items-center bg-surface-container-low/70 py-3 px-2 rounded-lg">
            <span className="font-serif text-3xl font-bold text-stitch-secondary leading-none">
              {kpis?.activeCohorts ?? 0}
            </span>
            <span className="text-xs font-bold text-on-surface mt-1.5">
              Active Classes
            </span>
            <span className="text-[11px] text-on-surface-variant font-medium mt-0.5">
              Across {kpis?.totalPrograms ?? 0} courses
            </span>
          </div>

          <div className="flex flex-col items-center bg-surface-container-low/70 py-3 px-2 rounded-lg">
            <span className="font-serif text-3xl font-bold text-stitch-primary leading-none">
              {kpis?.openChats ?? 0}
            </span>
            <span className="text-xs font-bold text-on-surface mt-1.5">
              Visitor Chats
            </span>
            <span className="text-[11px] text-on-surface-variant font-medium mt-0.5">
              Open conversations
            </span>
          </div>

          <div className="flex flex-col items-center bg-surface-container-low/70 py-3 px-2 rounded-lg">
            <span className="font-serif text-lg sm:text-xl font-bold text-stitch-primary leading-tight">
              +251 925 451 711
            </span>
            <span className="text-xs font-bold text-on-surface mt-1.5">
              Official Phone
            </span>
            <span className="text-[11px] text-stitch-secondary font-medium mt-0.5">
              WhatsApp &amp; Telegram
            </span>
          </div>
        </div>
      </section>

      {/* Recent Contact Form Messages & Inquiries */}
      <section className="bg-surface-container-lowest rounded-xl p-5 border border-surface-container-highest shadow-sm flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-surface-container-highest pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-4 bg-stitch-primary rounded-full shrink-0" />
              <h2 className="font-serif text-lg font-semibold text-stitch-primary">
                Recent Contact Form Messages &amp; Inquiries
              </h2>
            </div>
            <p className="text-xs text-on-surface-variant mt-0.5 pl-3.5">
              Here are messages sent by visitors through the &ldquo;Contact Me&rdquo; section on your website.
            </p>
          </div>
          <Link
            className="text-xs font-bold text-stitch-primary hover:underline flex items-center gap-1 self-start sm:self-auto pl-3.5 sm:pl-0"
            href="/admin/leads"
          >
            <span>Open All Contact Messages</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>

        {inquiries.length === 0 ? (
          <div className="py-12 px-4 rounded-xl bg-surface-container-low/50 border border-dashed border-surface-container-highest flex flex-col items-center justify-center text-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-surface-container-highest/60 text-stitch-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">mark_email_read</span>
            </div>
            <div className="flex flex-col gap-1 max-w-md">
              <span className="font-semibold text-sm text-on-surface">Inbox Clean &amp; Ready</span>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                No new contact form messages yet. When a visitor submits the &ldquo;Contact Me&rdquo; section on your website, their name, service selection, message note, and WhatsApp contact will appear here immediately.
              </p>
            </div>
            <Link
              className="mt-1 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stitch-primary text-white text-xs font-semibold hover:bg-stitch-primary-container transition-colors"
              href="/#contact"
              target="_blank"
            >
              <span>Test Public Contact Form</span>
              <span className="material-symbols-outlined text-xs">open_in_new</span>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-surface-container-highest bg-surface-container-low/70 text-on-surface-variant uppercase tracking-wider text-[10px]">
                  <th className="py-2.5 px-3 font-bold">Client Name</th>
                  <th className="py-2.5 px-3 font-bold">Message Text from Contact Form</th>
                  <th className="py-2.5 px-3 font-bold">Service Needed</th>
                  <th className="py-2.5 px-3 font-bold">Phone Number</th>
                  <th className="py-2.5 px-3 font-bold">Date Received</th>
                  <th className="py-2.5 px-3 font-bold text-right">How to Reply</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-highest">
                {inquiries.map((inq: any) => (
                  <tr key={inq.id} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="py-3 px-3 font-semibold text-on-surface whitespace-nowrap">
                      {inq.full_name}
                    </td>
                    <td className="py-3 px-3 min-w-[260px] max-w-md">
                      {inq.notes ? (
                        <div className="p-2 rounded-lg bg-surface-container-low border border-surface-container-highest">
                          <div className="flex items-center gap-1 text-[10px] font-bold text-stitch-secondary uppercase tracking-wider mb-0.5">
                            <span className="material-symbols-outlined text-xs">chat_bubble</span>
                            <span>What They Wrote:</span>
                          </div>
                          <p className="text-xs text-on-surface line-clamp-2 leading-relaxed">
                            {inq.notes}
                          </p>
                        </div>
                      ) : (
                        <span className="text-[11px] text-on-surface-variant italic">
                          No extra message (Selected: {inq.service})
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-on-surface-variant font-medium whitespace-nowrap">
                      {inq.service}
                    </td>
                    <td className="py-3 px-3 text-on-surface-variant font-mono whitespace-nowrap">
                      {inq.phone}
                    </td>
                    <td className="py-3 px-3 text-on-surface-variant whitespace-nowrap">
                      {new Date(inq.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      <a
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#25D366]/15 text-[#0d472a] hover:bg-[#25D366] hover:text-white transition-colors text-xs font-semibold"
                        href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(
                          inq.full_name
                        )}%2C%20thank%20you%20for%20contacting%20Ethiopian%20Signature%20Coffee.`}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <span>Chat on WhatsApp</span>
                        <span className="material-symbols-outlined text-xs">arrow_outward</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
