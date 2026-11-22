"use client";

import { useState, useTransition } from "react";
import { updateInquiryStatusAction } from "@/app/actions/admin-cms";

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
  const [isPending, startTransition] = useTransition();

  const services = Array.from(
    new Set(initialInquiries.map((i) => i.service).filter(Boolean))
  );

  const filtered = inquiries.filter((inq) => {
    const matchesSearch =
      inq.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.phone.includes(searchTerm) ||
      (inq.email && inq.email.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesService =
      selectedService === "all" || inq.service === selectedService;

    return matchesSearch && matchesService;
  });

  const handleStatusChange = (id: string, newStatus: string) => {
    setInquiries((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: newStatus } : i))
    );
    startTransition(async () => {
      await updateInquiryStatusAction(id, newStatus);
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Controls: Search and Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-stone-900 border border-stone-800">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500 text-lg">
            search
          </span>
          <input
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-xs text-white placeholder:text-stone-500 outline-none focus:border-brand-yellow"
            placeholder="Search by client name, phone number, or email..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-stone-400 whitespace-nowrap">Service:</span>
          <select
            className="px-3 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-xs text-white outline-none focus:border-brand-yellow"
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
          >
            <option value="all">All Practice Areas</option>
            {services.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* CRM Table */}
      <div className="rounded-2xl bg-stone-900 border border-stone-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-800 bg-stone-950/40 text-stone-400 uppercase tracking-wider text-[10px]">
                <th className="p-4 font-semibold">Client Name</th>
                <th className="p-4 font-semibold">Service Area</th>
                <th className="p-4 font-semibold">Contact Details</th>
                <th className="p-4 font-semibold">Inquiry Date</th>
                <th className="p-4 font-semibold">Lifecycle Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/60">
              {filtered.length === 0 ? (
                <tr>
                  <td className="p-8 text-center text-stone-500" colSpan={6}>
                    No client inquiries match the current search filters.
                  </td>
                </tr>
              ) : (
                filtered.map((inq) => (
                  <tr key={inq.id} className="hover:bg-stone-800/30 transition-colors">
                    <td className="p-4 font-semibold text-white">
                      <div>{inq.full_name}</div>
                      {inq.notes && (
                        <button
                          className="text-[11px] text-brand-yellow hover:underline mt-0.5 block text-left"
                          type="button"
                          onClick={() => setSelectedInquiry(inq)}
                        >
                          View project note &rarr;
                        </button>
                      )}
                    </td>
                    <td className="p-4 text-stone-300">
                      {inq.service}
                    </td>
                    <td className="p-4 text-stone-400">
                      <div className="font-mono text-[11px] text-stone-300">{inq.phone}</div>
                      {inq.email && <div className="text-[11px] text-stone-500">{inq.email}</div>}
                    </td>
                    <td className="p-4 text-stone-500">
                      {new Date(inq.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <select
                        className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-stone-800 border border-stone-700 text-stone-200 outline-none focus:border-brand-yellow"
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
                    <td className="p-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          className="px-2.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold transition-colors"
                          type="button"
                          onClick={() => setSelectedInquiry(inq)}
                        >
                          Details
                        </button>
                        <a
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors text-xs font-semibold"
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          role="dialog"
        >
          <div className="w-full max-w-lg bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 flex flex-col gap-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-800 pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-brand-yellow font-bold">
                  Client Record
                </span>
                <h3 className="font-serif text-xl font-bold text-white mt-0.5" id="inquiry-modal-title">
                  {selectedInquiry.full_name}
                </h3>
              </div>
              <button
                aria-label="Close dialog"
                className="w-8 h-8 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-white flex items-center justify-center"
                type="button"
                onClick={() => setSelectedInquiry(null)}
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-stone-950 border border-stone-800">
                <div>
                  <span className="text-stone-500 block">Phone / WhatsApp</span>
                  <span className="font-semibold text-white mt-0.5 block">{selectedInquiry.phone}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Email Address</span>
                  <span className="font-semibold text-white mt-0.5 block">{selectedInquiry.email || "Not provided"}</span>
                </div>
                <div className="col-span-2 pt-2 border-t border-stone-800/80">
                  <span className="text-stone-500 block">Service Requested</span>
                  <span className="font-semibold text-brand-yellow mt-0.5 block">{selectedInquiry.service}</span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-stone-400 font-semibold">Project Notes / Message:</span>
                <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 text-stone-300 leading-relaxed whitespace-pre-wrap">
                  {selectedInquiry.notes || "No additional message submitted with this lead."}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2 border-t border-stone-800">
              <button
                className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold"
                type="button"
                onClick={() => setSelectedInquiry(null)}
              >
                Close
              </button>
              <a
                className="px-5 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold flex items-center gap-2"
                href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, "")}`}
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
