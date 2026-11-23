"use client";

import { useState } from "react";
import { submitServiceBookingAction } from "@/app/actions/service-booking";

export interface ServicePackageForBooking {
  id: string;
  title: string;
  category: string;
  description: string;
  price_etb: number;
  pricing_model: "fixed" | "starting_from" | "per_day" | "custom_quote";
  timeline: string;
  deliverables: string[];
  form_config?: {
    ask_email?: boolean;
    ask_business?: boolean;
    ask_location?: boolean;
    ask_timeline?: boolean;
    ask_notes?: boolean;
    custom_questions?: string[];
  };
}

export default function ServiceBookingModal({
  pkg,
  isOpen,
  onClose,
}: {
  pkg: ServicePackageForBooking | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [clientName, setClientName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [venueLocation, setVenueLocation] = useState("");
  const [targetTimeline, setTargetTimeline] = useState("");
  const [notes, setNotes] = useState("");
  const [customAnswers, setCustomAnswers] = useState<Record<string, string>>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [confirmationData, setConfirmationData] = useState<{
    bookingId: string;
    clientName: string;
    packageTitle: string;
    phone: string;
  } | null>(null);

  if (!isOpen || !pkg) return null;

  const config = pkg.form_config || {
    ask_email: true,
    ask_business: true,
    ask_location: true,
    ask_timeline: true,
    ask_notes: true,
    custom_questions: [],
  };

  const handleCustomAnswerChange = (question: string, value: string) => {
    setCustomAnswers((prev) => ({ ...prev, [question]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!clientName.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }
    if (!phone.trim() || phone.trim().length < 8) {
      setErrorMsg("Please enter a valid phone or WhatsApp number.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await submitServiceBookingAction({
        packageId: pkg.id,
        packageTitle: pkg.title,
        clientName,
        phone,
        email: config.ask_email ? email : undefined,
        businessName: config.ask_business ? businessName : undefined,
        venueLocation: config.ask_location ? venueLocation : undefined,
        targetTimeline: config.ask_timeline ? targetTimeline : undefined,
        notes: config.ask_notes ? notes : undefined,
        customAnswers,
      });

      if (!res.success) {
        setErrorMsg(res.error || "Unable to submit booking. Please contact us directly.");
      } else {
        setConfirmationData({
          bookingId: res.bookingId || "",
          clientName: res.clientName || clientName,
          packageTitle: res.packageTitle || pkg.title,
          phone: res.phone || phone,
        });
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setClientName("");
    setPhone("");
    setEmail("");
    setBusinessName("");
    setVenueLocation("");
    setTargetTimeline("");
    setNotes("");
    setCustomAnswers({});
    setErrorMsg("");
    setConfirmationData(null);
    onClose();
  };

  const formatPriceDisplay = () => {
    const formattedNum = Number(pkg.price_etb || 0).toLocaleString();
    switch (pkg.pricing_model) {
      case "starting_from":
        return `Starting from ETB ${formattedNum}`;
      case "per_day":
        return `ETB ${formattedNum} / Day`;
      case "custom_quote":
        return "Custom Project Quote";
      case "fixed":
      default:
        return `ETB ${formattedNum}`;
    }
  };

  // WhatsApp verification link
  const waGreeting = encodeURIComponent(
    `Hello Ethiopian Signature Coffee! I just submitted a booking request for the "${pkg.title}" service package (${formatPriceDisplay()}). My name is ${clientName || confirmationData?.clientName} (${phone || confirmationData?.phone}). Looking forward to scheduling our consultation.`
  );
  const waUrl = `https://wa.me/251925451711?text=${waGreeting}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-stone-900 border border-brand-yellow/30 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-8">
        {/* Top Heritage Accent Line */}
        <div className="h-1.5 w-full bg-gradient-to-r from-brand-yellow/30 via-brand-yellow to-brand-yellow/30" />

        {/* Modal Header */}
        <div className="p-6 sm:p-8 border-b border-white/10 flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] uppercase tracking-wider text-brand-yellow font-bold">
              Specialty Advisory &amp; Service Booking
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight">
              {pkg.title}
            </h3>
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-stone-300">
              <span className="font-bold text-brand-yellow">{formatPriceDisplay()}</span>
              {pkg.timeline && (
                <>
                  <span className="text-stone-500">•</span>
                  <span>Timeline: {pkg.timeline}</span>
                </>
              )}
              <span className="text-stone-500">•</span>
              <span className="text-stone-400">{pkg.category}</span>
            </div>
          </div>

          <button
            aria-label="Close booking modal"
            className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 text-stone-400 hover:text-white transition-colors flex items-center justify-center shrink-0 border border-white/10"
            type="button"
            onClick={handleResetAndClose}
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Modal Body: Confirmation View OR Booking Form */}
        {confirmationData ? (
          <div className="p-6 sm:p-10 flex flex-col items-center text-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-brand-green/20 text-brand-green flex items-center justify-center border border-brand-green/40 shadow-inner">
              <span className="material-symbols-outlined text-3xl">verified</span>
            </div>

            <div className="flex flex-col gap-2 max-w-md">
              <h4 className="font-serif text-2xl font-bold text-white">
                Booking Request Received
              </h4>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                Thank you, <strong className="text-white">{confirmationData.clientName}</strong>! Your service advisory request for <strong className="text-brand-yellow">{confirmationData.packageTitle}</strong> has been recorded.
              </p>
              <p className="text-xs text-stone-400 pt-1">
                Our executive team will reach out to schedule your consultation. To expedite your confirmation immediately, tap below to verify via WhatsApp:
              </p>
            </div>

            <div className="w-full max-w-md flex flex-col sm:flex-row gap-3 pt-2">
              <a
                className="flex-1 h-12 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
                href={waUrl}
                rel="noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-lg">chat</span>
                <span>Confirm on WhatsApp</span>
              </a>

              <button
                className="h-12 px-6 rounded-xl bg-white/10 hover:bg-white/15 text-stone-200 font-semibold text-xs tracking-wider transition-colors border border-white/10"
                type="button"
                onClick={handleResetAndClose}
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form className="p-6 sm:p-8 flex flex-col gap-6" onSubmit={handleSubmit}>
            {/* Scope Deliverables Checklist Preview */}
            {pkg.deliverables && pkg.deliverables.length > 0 && (
              <div className="p-4 rounded-xl bg-stone-950/50 border border-white/10 flex flex-col gap-2">
                <span className="text-xs font-bold text-brand-yellow uppercase tracking-wider">
                  Included Package Scope &amp; Deliverables:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {pkg.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-stone-300">
                      <span className="material-symbols-outlined text-sm text-brand-yellow shrink-0 mt-0.5">
                        check_circle
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-red-950/50 border border-red-500/40 text-red-200 text-xs flex items-center gap-2.5">
                <span className="material-symbols-outlined text-base text-red-400 shrink-0">error</span>
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Client Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-stone-200" htmlFor="booking-name">
                  Full Name / Contact Person <span className="text-brand-yellow">*</span>
                </label>
                <input
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-white/15 text-white text-xs placeholder:text-stone-500 focus:outline-none focus:border-brand-yellow transition-colors"
                  id="booking-name"
                  placeholder="Enter your full name"
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                />
              </div>

              {/* Phone / WhatsApp */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-stone-200" htmlFor="booking-phone">
                  Phone / WhatsApp Number <span className="text-brand-yellow">*</span>
                </label>
                <input
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-white/15 text-white text-xs placeholder:text-stone-500 focus:outline-none focus:border-brand-yellow transition-colors"
                  id="booking-phone"
                  placeholder="e.g. +251 91 234 5678"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              {/* Email (Optional / Configurable) */}
              {config.ask_email && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-stone-200" htmlFor="booking-email">
                    Email Address <span className="text-stone-500 font-normal">(Optional)</span>
                  </label>
                  <input
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-white/15 text-white text-xs placeholder:text-stone-500 focus:outline-none focus:border-brand-yellow transition-colors"
                    id="booking-email"
                    placeholder="name@company.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              )}

              {/* Business / Venue Name */}
              {config.ask_business && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-stone-200" htmlFor="booking-business">
                    Café / Business Name
                  </label>
                  <input
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-white/15 text-white text-xs placeholder:text-stone-500 focus:outline-none focus:border-brand-yellow transition-colors"
                    id="booking-business"
                    placeholder="e.g. Bole Specialty Café / New Venue"
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                  />
                </div>
              )}

              {/* Venue Location */}
              {config.ask_location && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-stone-200" htmlFor="booking-location">
                    City / Venue Location
                  </label>
                  <input
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-white/15 text-white text-xs placeholder:text-stone-500 focus:outline-none focus:border-brand-yellow transition-colors"
                    id="booking-location"
                    placeholder="e.g. Addis Ababa (Bole / Kazanchis / Piassa)"
                    type="text"
                    value={venueLocation}
                    onChange={(e) => setVenueLocation(e.target.value)}
                  />
                </div>
              )}

              {/* Target Timeline */}
              {config.ask_timeline && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-stone-200" htmlFor="booking-timeline">
                    Target Start / Launch Timeline
                  </label>
                  <input
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-white/15 text-white text-xs placeholder:text-stone-500 focus:outline-none focus:border-brand-yellow transition-colors"
                    id="booking-timeline"
                    placeholder="e.g. Within 2 Weeks, Next Month, Immediate"
                    type="text"
                    value={targetTimeline}
                    onChange={(e) => setTargetTimeline(e.target.value)}
                  />
                </div>
              )}
            </div>

            {/* Dynamic Custom Questions */}
            {config.custom_questions && config.custom_questions.length > 0 && (
              <div className="flex flex-col gap-3 pt-1 border-t border-white/10">
                <span className="text-xs font-bold text-brand-yellow uppercase tracking-wider">
                  Additional Project Inquiries:
                </span>
                {config.custom_questions.map((question, qIdx) => (
                  <div key={qIdx} className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-stone-200">
                      {question}
                    </label>
                    <input
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-white/15 text-white text-xs placeholder:text-stone-500 focus:outline-none focus:border-brand-yellow transition-colors"
                      placeholder="Your answer..."
                      type="text"
                      value={customAnswers[question] || ""}
                      onChange={(e) => handleCustomAnswerChange(question, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Notes / Special Requests */}
            {config.ask_notes && (
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-stone-200" htmlFor="booking-notes">
                  Project Notes &amp; Specific Requirements
                </label>
                <textarea
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-white/15 text-white text-xs placeholder:text-stone-500 focus:outline-none focus:border-brand-yellow transition-colors resize-none"
                  id="booking-notes"
                  placeholder="Describe your current stage, equipment on-site, or specific goals..."
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            )}

            {/* Action Bar */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10">
              <span className="text-[11px] text-stone-400">
                Official Advisory Desk: <strong className="text-stone-200">+251925451711</strong>
              </span>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-stone-300 text-xs font-medium transition-colors border border-white/10"
                  type="button"
                  onClick={handleResetAndClose}
                >
                  Cancel
                </button>

                <button
                  className="flex-1 sm:flex-none btn-shimmer px-6 py-2.5 rounded-xl bg-brand-yellow hover:bg-yellow-500 text-stone-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-3.5 h-3.5 rounded-full border-2 border-stone-950 border-t-transparent animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <span>Submit Service Booking</span>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
