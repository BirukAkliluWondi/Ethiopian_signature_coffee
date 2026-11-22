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
    <div className="flex flex-col gap-5">
      {/* Controls: Search and Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-xl bg-surface-container-lowest border border-surface-container-highest shadow-sm">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">
            search
          </span>
          <input
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-surface-container-low border border-surface-container-highest text-xs text-on-surface placeholder:text-on-surface-variant outline-none focus:border-stitch-primary"
            placeholder="Search by client name, phone number, or email..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-on-surface-variant whitespace-nowrap font-medium">Service:</span>
          <select
            className="px-3 py-2 rounded-lg bg-surface-container-low border border-surface-container-highest text-xs text-on-surface outline-none focus:border-stitch-primary"
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
      <div className="rounded-xl bg-surface-container-lowest border border-surface-container-highest overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-surface-container-highest bg-surface-container-low/70 text-on-surface-variant uppercase tracking-wider text-[10px]">
                <th className="p-3.5 font-bold">Client Name</th>
                <th className="p-3.5 font-bold">Service Area</th>
                <th className="p-3.5 font-bold">Contact Details</th>
                <th className="p-3.5 font-bold">Inquiry Date</th>
                <th className="p-3.5 font-bold">Lifecycle Status</th>
                <th className="p-3.5 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-highest">
              {filtered.length === 0 ? (
                <tr>
                  <td className="p-8 text-center text-on-surface-variant" colSpan={6}>
                    No client inquiries match the current search filters.
                  </td>
                </tr>
              ) : (
                filtered.map((inq) => (
                  <tr key={inq.id} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="p-3.5 font-semibold text-on-surface">
                      <div>{inq.full_name}</div>
                      {inq.notes && (
                        <button
                          className="text-[11px] text-stitch-secondary hover:underline mt-0.5 block text-left font-medium"
                          type="button"
                          onClick={() => setSelectedInquiry(inq)}
                        >
                          View project note &rarr;
                        </button>
                      )}
                    </td>
                    <td className="p-3.5 text-on-surface-variant font-medium">
                      {inq.service}
                    </td>
                    <td className="p-3.5 text-on-surface-variant">
                      <div className="font-mono text-xs text-on-surface">{inq.phone}</div>
                      {inq.email && <div className="text-[11px] text-on-surface-variant">{inq.email}</div>}
                    </td>
                    <td className="p-3.5 text-on-surface-variant">
                      {new Date(inq.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-3.5">
                      <select
                        className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-surface-container-low border border-surface-container-highest text-stitch-primary outline-none focus:border-stitch-primary"
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
                    <td className="p-3.5 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          className="px-2.5 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-semibold transition-colors border border-surface-container-highest"
                          type="button"
                          onClick={() => setSelectedInquiry(inq)}
                        >
                          Details
                        </button>
                        <a
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#25D366]/15 text-[#0d472a] hover:bg-[#25D366] hover:text-white transition-colors text-xs font-semibold"
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
                  Client Record
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
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-surface-container-low border border-surface-container-highest">
                <div>
                  <span className="text-on-surface-variant block text-[11px]">Phone / WhatsApp</span>
                  <span className="font-semibold text-on-surface mt-0.5 block">{selectedInquiry.phone}</span>
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

              <div className="flex flex-col gap-1.5">
                <span className="text-on-surface font-semibold">Project Notes / Inquiry Message:</span>
                <div className="p-3.5 rounded-xl bg-surface-container-low border border-surface-container-highest text-on-surface leading-relaxed whitespace-pre-wrap">
                  {selectedInquiry.notes || "No additional message submitted with this lead."}
                </div>
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
