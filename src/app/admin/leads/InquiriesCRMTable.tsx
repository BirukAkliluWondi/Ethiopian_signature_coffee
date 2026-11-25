"use client";

import { useState, useTransition, useEffect } from "react";
import { useSearchParams } from "next/navigation";
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

  const searchParams = useSearchParams();

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "new" || tabParam === "with_notes" || tabParam === "all") {
      setTabFilter(tabParam);
    }
    const serviceParam = searchParams.get("service");
    if (serviceParam) {
      setSelectedService(serviceParam);
    }
    const searchParam = searchParams.get("search");
    if (searchParam) {
      setSearchTerm(searchParam);
    }
  }, [searchParams]);

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
      {/* Filter Tabs & Search Controls */}
      <div className="flex flex-col gap-3 p-4 rounded-xl bg-white border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
        {/* Quick Filter Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3 overflow-x-auto scrollbar-none">
          <button
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 ${
              tabFilter === "all"
                ? "bg-[#062b18] text-white shadow-xs"
                : "bg-slate-100/80 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70"
            }`}
            type="button"
            onClick={() => setTabFilter("all")}
          >
            All Messages ({inquiries.length})
          </button>
          <button
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 flex items-center gap-1.5 ${
              tabFilter === "new"
                ? "bg-[#062b18] text-white shadow-xs"
                : "bg-slate-100/80 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70"
            }`}
            type="button"
            onClick={() => setTabFilter("new")}
          >
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>New / Pending ({newCount})</span>
          </button>
          <button
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 ${
              tabFilter === "with_notes"
                ? "bg-[#062b18] text-white shadow-xs"
                : "bg-slate-100/80 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70"
            }`}
            type="button"
            onClick={() => setTabFilter("with_notes")}
          >
            With Notes ({withNotesCount})
          </button>
        </div>

        {/* Search and Service Select */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
              search
            </span>
            <input
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 outline-none focus:border-[#062b18] focus:bg-white transition-colors"
              placeholder="Search by client name, message note, phone, or email..."
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              aria-label="Filter by service"
              className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 outline-none focus:border-[#062b18]"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
            >
              <option value="all">All Service Domains</option>
              {services.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <button
              className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-xs flex items-center gap-1.5 shrink-0 disabled:opacity-50"
              disabled={inquiries.length === 0}
              type="button"
              onClick={() => exportInquiriesToExcel(filtered)}
            >
              <span className="material-symbols-outlined text-base">file_download</span>
              <span>Export Excel</span>
            </button>
          </div>
        </div>
      </div>

      {/* CRM Table */}
      <div className="rounded-xl bg-white border border-slate-200/80 overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-500 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-3 font-bold">Client</th>
                <th className="py-3 px-3 font-bold min-w-[180px]">Message Note</th>
                <th className="py-3 px-3 font-bold">Service Area</th>
                <th className="py-3 px-3 font-bold">Contact</th>
                <th className="py-3 px-3 font-bold">Received</th>
                <th className="py-3 px-3 font-bold">Status</th>
                <th className="py-3 px-3 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {inquiries.length === 0 ? (
                <tr>
                  <td className="p-12 text-center" colSpan={7}>
                    <div className="flex flex-col items-center justify-center gap-2.5 max-w-md mx-auto">
                      <div className="w-11 h-11 rounded-lg bg-slate-100 text-slate-400 flex items-center justify-center">
                        <span className="material-symbols-outlined text-2xl">inbox</span>
                      </div>
                      <span className="font-semibold text-sm text-slate-800">No Inquiries Yet</span>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Visitor consultation inquiries submitted through your website will appear here automatically.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td className="p-8 text-center text-slate-500" colSpan={7}>
                    No messages match your search or filter criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((inq) => (
                  <tr key={inq.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Client Name */}
                    <td className="py-3 px-3 font-semibold text-slate-900 whitespace-nowrap align-top">
                      <div>{inq.full_name}</div>
                    </td>

                    {/* Message Text Column */}
                    <td className="py-3 px-3 align-top max-w-[240px]">
                      {inq.notes ? (
                        <div className="p-2 rounded-lg bg-slate-50/90 border border-slate-200/70 flex flex-col gap-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                              Client Note
                            </span>
                            <button
                              className="text-[11px] text-[#062b18] hover:underline font-semibold"
                              type="button"
                              onClick={() => setSelectedInquiry(inq)}
                            >
                              Expand
                            </button>
                          </div>
                          <p className="text-xs text-slate-700 line-clamp-2 leading-relaxed whitespace-pre-wrap">
                            {inq.notes}
                          </p>
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-400 italic">
                          Selected: {inq.service}
                        </span>
                      )}
                    </td>

                    {/* Service */}
                    <td className="py-3 px-3 text-slate-700 font-medium max-w-[170px] align-top">
                      <span className="line-clamp-2">{inq.service}</span>
                    </td>

                    {/* Contact details */}
                    <td className="py-3 px-3 text-slate-600 whitespace-nowrap align-top">
                      <div className="font-mono text-xs text-slate-900 font-semibold">{inq.phone}</div>
                      {inq.email && <div className="text-[11px] text-slate-400 mt-0.5 truncate max-w-[140px]">{inq.email}</div>}
                    </td>

                    {/* Date */}
                    <td className="py-3 px-3 text-slate-500 whitespace-nowrap align-top tabular-nums">
                      {new Date(inq.created_at).toLocaleDateString()}
                    </td>

                    {/* Status */}
                    <td className="py-3 px-3 whitespace-nowrap align-top">
                      <select
                        className="px-2 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-slate-50 border border-slate-200 text-slate-800 outline-none focus:border-[#062b18]"
                        value={inq.status || "new"}
                        onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="scheduled">Scheduled</option>
                        <option value="completed">Completed</option>
                        <option value="archived">Archived</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-3 text-right whitespace-nowrap align-top">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                          type="button"
                          onClick={() => setSelectedInquiry(inq)}
                        >
                          Details
                        </button>
                        <a
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#25D366]/12 text-[#062b18] hover:bg-[#25D366] hover:text-white transition-colors text-xs font-semibold border border-[#25D366]/25"
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs"
          role="dialog"
        >
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl p-6 flex flex-col gap-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                  Client Inquiry Record
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5" id="inquiry-modal-title">
                  {selectedInquiry.full_name}
                </h3>
              </div>
              <button
                aria-label="Close dialog"
                className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors"
                type="button"
                onClick={() => setSelectedInquiry(null)}
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                <div>
                  <span className="text-slate-500 block text-[11px]">Phone / WhatsApp</span>
                  <span className="font-semibold text-slate-900 mt-0.5 block font-mono text-xs">{selectedInquiry.phone}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Email Address</span>
                  <span className="font-semibold text-slate-900 mt-0.5 block">{selectedInquiry.email || "Not provided"}</span>
                </div>
                <div className="col-span-2 pt-2 border-t border-slate-200/70">
                  <span className="text-slate-500 block text-[11px]">Service Requested</span>
                  <span className="font-semibold text-[#062b18] mt-0.5 block">{selectedInquiry.service}</span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="font-bold text-slate-700">Message Note</span>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 text-slate-800 leading-relaxed whitespace-pre-wrap text-xs sm:text-sm">
                  {selectedInquiry.notes || "No additional written note provided."}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2.5 pt-2 border-t border-slate-100">
              <button
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                type="button"
                onClick={() => setSelectedInquiry(null)}
              >
                Close
              </button>
              <a
                className="px-4 py-2 rounded-lg bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(
                  selectedInquiry.full_name
                )}%2C%20thank%20you%20for%20contacting%20Ethiopian%20Signature%20Coffee.`}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-base">chat</span>
                <span>Open WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
