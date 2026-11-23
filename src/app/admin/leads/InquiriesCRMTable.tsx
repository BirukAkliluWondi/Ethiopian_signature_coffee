"use client";

import { useState, useTransition } from "react";
import { updateInquiryStatusAction } from "@/app/actions/admin-cms";
import { exportInquiriesToExcel } from "@/lib/excel-export";

interface Inquiry {
  id: string;
  full_name: string;
  phone: string;
  email?: string;
  service: string;
  notes?: string;
  status?: string;
  created_at: string;
}

export default function InquiriesCRMTable({
  initialInquiries,
}: {
  initialInquiries: Inquiry[];
}) {
  const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedService, setSelectedService] = useState("all");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [tabFilter, setTabFilter] = useState<"all" | "new" | "with_notes">("all");
  const [isPending, startTransition] = useTransition();

  const services = Array.from(
    new Set(initialInquiries.map((i) => i.service).filter(Boolean))
  );

  const filtered = inquiries.filter((inq) => {
    const matchesSearch =
      inq.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.phone.includes(searchTerm) ||
      (inq.email && inq.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (inq.notes && inq.notes.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesService =
      selectedService === "all" || inq.service === selectedService;

    const matchesTab =
      tabFilter === "all"
        ? true
        : tabFilter === "new"
        ? (inq.status || "new") === "new"
        : Boolean(inq.notes && inq.notes.trim().length > 0);

    return matchesSearch && matchesService && matchesTab;
  });

  const handleStatusChange = (id: string, newStatus: string) => {
    setInquiries((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: newStatus } : i))
    );
    startTransition(async () => {
      await updateInquiryStatusAction(id, newStatus);
    });
  };

  const newCount = inquiries.filter((i) => (i.status || "new") === "new").length;
  const withNotesCount = inquiries.filter((i) => i.notes && i.notes.trim().length > 0).length;

  return (
    <div className="flex flex-col gap-5">
      {/* Step-by-Step Guide for Inquiries */}
      <div className="p-4 rounded-xl bg-surface-container-lowest border border-surface-container-highest shadow-sm flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded bg-stitch-primary text-white flex items-center justify-center text-xs font-bold shrink-0">
            ?
          </span>
          <h2 className="font-semibold text-xs text-stitch-primary uppercase tracking-wider">
            Where to Find &amp; Reply to &ldquo;Contact Me&rdquo; Form Texts
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
          <div className="p-3 rounded-lg bg-surface-container-low border border-surface-container-highest flex items-start gap-2.5">
            <span className="w-5 h-5 rounded bg-stitch-primary text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
              1
            </span>
            <div className="flex flex-col">
              <span className="font-bold text-on-surface">Read the Client&apos;s Message</span>
              <span className="text-[11px] text-on-surface-variant mt-0.5 leading-relaxed">
                Look at the <strong>Message Text</strong> column in the table below. Every note written in the &ldquo;Contact Me&rdquo; box appears right here.
              </span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-surface-container-low border border-surface-container-highest flex items-start gap-2.5">
            <span className="w-5 h-5 rounded bg-[#25D366] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
              2
            </span>
            <div className="flex flex-col">
              <span className="font-bold text-on-surface">Click &ldquo;WhatsApp&rdquo; to Reply</span>
              <span className="text-[11px] text-on-surface-variant mt-0.5 leading-relaxed">
                Click the green <strong>WhatsApp</strong> button on any row. It immediately opens a chat on your phone or PC addressed to that person.
              </span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-surface-container-low border border-surface-container-highest flex items-start gap-2.5">
            <span className="w-5 h-5 rounded bg-stitch-secondary text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
              3
            </span>
            <div className="flex flex-col">
              <span className="font-bold text-on-surface">Mark as &ldquo;Contacted&rdquo;</span>
              <span className="text-[11px] text-on-surface-variant mt-0.5 leading-relaxed">
                After messaging them, switch their status dropdown to <strong>Contacted</strong> to keep track of answered inquiries.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Controls */}
      <div className="flex flex-col gap-3 p-4 rounded-xl bg-surface-container-lowest border border-surface-container-highest shadow-sm">
        {/* Quick Filter Tabs */}
        <div className="flex items-center gap-2 border-b border-surface-container-highest pb-3 overflow-x-auto scrollbar-none">
          <button
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shrink-0 ${
              tabFilter === "all"
                ? "bg-stitch-primary text-white shadow-xs"
                : "bg-surface-container-low text-on-surface-variant hover:text-stitch-primary"
            }`}
            type="button"
            onClick={() => setTabFilter("all")}
          >
            All Messages ({inquiries.length})
          </button>
          <button
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shrink-0 flex items-center gap-1.5 ${
              tabFilter === "new"
                ? "bg-stitch-primary text-white shadow-xs"
                : "bg-surface-container-low text-on-surface-variant hover:text-stitch-primary"
            }`}
            type="button"
            onClick={() => setTabFilter("new")}
          >
            <span className="w-2 h-2 rounded-full bg-stitch-tertiary-fixed-dim" />
            <span>New / Needs Reply ({newCount})</span>
          </button>
          <button
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shrink-0 ${
              tabFilter === "with_notes"
                ? "bg-stitch-primary text-white shadow-xs"
                : "bg-surface-container-low text-on-surface-variant hover:text-stitch-primary"
            }`}
            type="button"
            onClick={() => setTabFilter("with_notes")}
          >
            With Written Notes ({withNotesCount})
          </button>
        </div>

        {/* Search and Service Select */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">
              search
            </span>
            <input
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-surface-container-low border border-surface-container-highest text-xs text-on-surface placeholder:text-on-surface-variant outline-none focus:border-stitch-primary"
              placeholder="Search by client name, message text, phone, or email..."
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-on-surface-variant whitespace-nowrap font-medium">Service:</span>
            <select
              className="px-3 py-2 rounded-lg bg-surface-container-low border border-surface-container-highest text-xs text-on-surface outline-none focus:border-stitch-primary"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
            >
              <option value="all">Show All Services</option>
              {services.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <button
              className="px-3.5 py-2 rounded-lg bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center gap-1.5 shrink-0 disabled:opacity-50"
              disabled={inquiries.length === 0}
              type="button"
              onClick={() => exportInquiriesToExcel(filtered)}
            >
              <span className="material-symbols-outlined text-base">file_download</span>
              <span>Export to Excel</span>
            </button>
          </div>
        </div>
      </div>

      {/* CRM Table */}
      <div className="rounded-xl bg-surface-container-lowest border border-surface-container-highest overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-surface-container-highest bg-surface-container-low/70 text-on-surface-variant uppercase tracking-wider text-[10px]">
                <th className="p-3.5 font-bold">Client Name</th>
                <th className="p-3.5 font-bold min-w-[280px]">Message Text from &ldquo;Contact Me&rdquo; Form</th>
                <th className="p-3.5 font-bold">Service Requested</th>
                <th className="p-3.5 font-bold">Phone &amp; Email</th>
                <th className="p-3.5 font-bold">Date Received</th>
                <th className="p-3.5 font-bold">Status</th>
                <th className="p-3.5 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-highest">
              {inquiries.length === 0 ? (
                <tr>
                  <td className="p-12 text-center" colSpan={7}>
                    <div className="flex flex-col items-center justify-center gap-3 max-w-md mx-auto">
                      <div className="w-12 h-12 rounded-xl bg-surface-container-low text-stitch-secondary flex items-center justify-center">
                        <span className="material-symbols-outlined text-2xl">inbox</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold text-sm text-on-surface">No Contact Form Messages Yet</span>
                        <p className="text-xs text-on-surface-variant leading-relaxed">
                          Your messages inbox is clean and empty. When visitors submit consultation inquiries or notes from the &ldquo;Contact Me&rdquo; section on your website, they will appear here automatically.
                        </p>
                      </div>
                      <a
                        className="mt-1 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-stitch-primary text-white text-xs font-semibold hover:bg-stitch-primary-container transition-colors"
                        href="/#contact"
                        target="_blank"
                      >
                        <span>View Public Contact Section</span>
                        <span className="material-symbols-outlined text-xs">arrow_outward</span>
                      </a>
                    </div>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td className="p-8 text-center text-on-surface-variant" colSpan={7}>
                    No messages match your search or filter. Try clearing the search box.
                  </td>
                </tr>
              ) : (
                filtered.map((inq) => (
                  <tr key={inq.id} className="hover:bg-surface-container-low/50 transition-colors">
                    {/* Client Name */}
                    <td className="p-3.5 font-semibold text-on-surface whitespace-nowrap align-top">
                      <div>{inq.full_name}</div>
                      <span className="text-[10px] text-on-surface-variant uppercase tracking-wider mt-0.5 block">
                        via Contact Form
                      </span>
                    </td>

                    {/* Prominent Message Text Column */}
                    <td className="p-3.5 align-top max-w-md">
                      {inq.notes ? (
                        <div className="p-2.5 rounded-lg bg-surface-container-low border border-surface-container-highest flex flex-col gap-1">
                          <div className="flex items-center justify-between gap-1 text-[10px] font-bold text-stitch-primary uppercase tracking-wider">
                            <div className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-xs">chat_bubble</span>
                              <span>Written Message:</span>
                            </div>
                            <button
                              className="text-stitch-secondary hover:underline normal-case font-semibold"
                              type="button"
                              onClick={() => setSelectedInquiry(inq)}
                            >
                              Expand
                            </button>
                          </div>
                          <p className="text-xs text-on-surface line-clamp-3 leading-relaxed whitespace-pre-wrap">
                            {inq.notes}
                          </p>
                        </div>
                      ) : (
                        <div className="text-[11px] text-on-surface-variant italic py-1">
                          (No extra text written. Client requested: &ldquo;{inq.service}&rdquo;)
                        </div>
                      )}
                    </td>

                    {/* Service */}
                    <td className="p-3.5 text-on-surface-variant font-medium whitespace-nowrap align-top">
                      {inq.service}
                    </td>

                    {/* Contact details */}
                    <td className="p-3.5 text-on-surface-variant whitespace-nowrap align-top">
                      <div className="font-mono text-xs text-on-surface font-semibold">{inq.phone}</div>
                      {inq.email && <div className="text-[11px] text-on-surface-variant mt-0.5">{inq.email}</div>}
                    </td>

                    {/* Date */}
                    <td className="p-3.5 text-on-surface-variant whitespace-nowrap align-top">
                      {new Date(inq.created_at).toLocaleDateString()}
                    </td>

                    {/* Status */}
                    <td className="p-3.5 whitespace-nowrap align-top">
                      <select
                        className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-surface-container-low border border-surface-container-highest text-stitch-primary outline-none focus:border-stitch-primary"
                        value={inq.status || "new"}
                        onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                      >
                        <option value="new">New (Needs Reply)</option>
                        <option value="contacted">Contacted</option>
                        <option value="scheduled">Scheduled</option>
                        <option value="completed">Completed</option>
                        <option value="archived">Archived</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="p-3.5 text-right whitespace-nowrap align-top">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          className="px-2.5 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-semibold transition-colors border border-surface-container-highest"
                          type="button"
                          onClick={() => setSelectedInquiry(inq)}
                        >
                          View Details
                        </button>
                        <a
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#25D366]/15 text-[#0d472a] hover:bg-[#25D366] hover:text-white transition-colors text-xs font-semibold shadow-xs"
                          href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(
                            inq.full_name
                          )}%2C%20thank%20you%20for%20contacting%20Ethiopian%20Signature%20Coffee%20regarding%20${encodeURIComponent(
                            inq.service
                          )}.`}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          <span>WhatsApp</span>
                          <span className="material-symbols-outlined text-xs">arrow_outward</span>
                        </a>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inquiry Details Modal */}
      {selectedInquiry && (
        <div
          aria-labelledby="inquiry-modal-title"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          role="dialog"
        >
          <div className="w-full max-w-lg bg-surface-container-lowest border border-surface-container-highest rounded-2xl p-6 sm:p-7 flex flex-col gap-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-surface-container-highest pb-3">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-stitch-secondary font-bold">
                  Contact Form Submission
                </span>
                <h3 className="font-serif text-xl font-semibold text-stitch-primary mt-0.5" id="inquiry-modal-title">
                  {selectedInquiry.full_name}
                </h3>
              </div>
              <button
                aria-label="Close dialog"
                className="w-8 h-8 rounded-lg hover:bg-surface-container-low text-on-surface-variant flex items-center justify-center transition-colors"
                type="button"
                onClick={() => setSelectedInquiry(null)}
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-4 text-xs">
              {/* Contact Information */}
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-surface-container-low border border-surface-container-highest">
                <div>
                  <span className="text-on-surface-variant block text-[11px]">Phone / WhatsApp</span>
                  <span className="font-semibold text-on-surface mt-0.5 block font-mono text-xs">{selectedInquiry.phone}</span>
                </div>
                <div>
                  <span className="text-on-surface-variant block text-[11px]">Email Address</span>
                  <span className="font-semibold text-on-surface mt-0.5 block">{selectedInquiry.email || "Not provided"}</span>
                </div>
                <div className="col-span-2 pt-2 border-t border-surface-container-highest">
                  <span className="text-on-surface-variant block text-[11px]">Service Requested</span>
                  <span className="font-semibold text-stitch-primary mt-0.5 block">{selectedInquiry.service}</span>
                </div>
              </div>

              {/* Exact Text from Contact Me Form */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5 font-bold text-stitch-primary">
                  <span className="material-symbols-outlined text-base">chat</span>
                  <span>Text Message Written by Client in &ldquo;Contact Me&rdquo; Form:</span>
                </div>
                <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container-highest text-on-surface leading-relaxed whitespace-pre-wrap font-sans text-xs sm:text-sm">
                  {selectedInquiry.notes || "The client selected the service above but did not type an extra note."}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-surface-container-low text-[11px] text-on-surface-variant">
                <strong>Next step:</strong> Click the button below to message this client on WhatsApp. Once you have spoken with them, change their status to <strong>Contacted</strong>.
              </div>
            </div>

            <div className="flex justify-end gap-2.5 pt-2 border-t border-surface-container-highest">
              <button
                className="px-4 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-semibold transition-colors"
                type="button"
                onClick={() => setSelectedInquiry(null)}
              >
                Close
              </button>
              <a
                className="px-4 py-2 rounded-lg bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(
                  selectedInquiry.full_name
                )}%2C%20thank%20you%20for%20contacting%20Ethiopian%20Signature%20Coffee.`}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-base">chat</span>
                <span>Open WhatsApp Chat</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
