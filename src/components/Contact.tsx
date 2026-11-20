"use client";

import { useState, type FormEvent } from "react";
import { submitInquiryAction } from "@/app/actions/inquiry";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "Coffee Shop Setup & Organization",
    notes: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback({ type: null, message: "" });

    const result = await submitInquiryAction({
      fullName: formData.name,
      phone: formData.phone,
      email: formData.email,
      service: formData.service,
      notes: formData.notes,
    });

    setIsSubmitting(false);

    if (result.success) {
      setFeedback({ type: "success", message: result.message });
      setFormData({
        name: "",
        phone: "",
        email: "",
        service: "Coffee Shop Setup & Organization",
        notes: "",
      });
    } else {
      setFeedback({
        type: "error",
        message: result.message || "Failed to submit inquiry. Please try again.",
      });
    }
  };

  return (
    <section
      className="p-5 sm:p-8 md:p-10 lg:p-12 rounded-2xl sm:rounded-3xl bg-surface-warm/80 border border-border-warm shadow-cozy-lg scroll-mt-28 relative section-transition-glow"
      id="contact"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Contact Channels & Credentials */}
        <div className="lg:col-span-5 flex flex-col gap-5 sm:gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-widest text-brand-yellow font-bold">
              Get In Touch
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-brand-green leading-snug">
              Let&apos;s build your coffee business together.
            </h2>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
              Reach out to discuss your café concept, barista training requirements, or coffee business consultancy needs.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:gap-3.5 pt-1">
            {/* Direct WhatsApp Button */}
            <a
              className="p-3.5 sm:p-4 rounded-xl bg-surface-white border border-border-subtle hover:border-brand-green flex items-center gap-3 sm:gap-3.5 shadow-cozy-sm hover:shadow-cozy transition-all group"
              href="https://wa.me/251925451711"
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className="w-10 h-10 rounded-lg bg-brand-green text-white flex items-center justify-center shrink-0 shadow-cozy-sm">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.25-1.49-1.4-1.74-.14-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.43 1.03 2.6.13.17 1.78 2.72 4.31 3.81.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.3z" />
                </svg>
              </div>
              <div>
                <h5 className="text-xs sm:text-sm font-bold text-text-main group-hover:text-brand-green transition-colors">
                  Chat on WhatsApp
                </h5>
                <p className="text-[11px] sm:text-xs text-text-muted">
                  +251 92 545 1711 (Direct Advisory)
                </p>
              </div>
            </a>

            {/* Direct Telegram Button */}
            <a
              className="p-3.5 sm:p-4 rounded-xl bg-surface-white border border-border-subtle hover:border-brand-green flex items-center gap-3 sm:gap-3.5 shadow-cozy-sm hover:shadow-cozy transition-all group"
              href="https://t.me/+251925451711"
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className="w-10 h-10 rounded-lg bg-sky-600 text-white flex items-center justify-center shrink-0 shadow-cozy-sm">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                </svg>
              </div>
              <div>
                <h5 className="text-xs sm:text-sm font-bold text-text-main group-hover:text-brand-green transition-colors">
                  Connect on Telegram
                </h5>
                <p className="text-[11px] sm:text-xs text-text-muted">+251 92 545 1711</p>
              </div>
            </a>

            {/* Direct Telephone */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-surface-white border border-border-subtle flex items-center gap-3 sm:gap-3.5 shadow-cozy-sm">
              <div className="w-10 h-10 rounded-lg bg-surface-subtle text-brand-green flex items-center justify-center shrink-0 border border-border-subtle shadow-cozy-sm">
                <span className="material-symbols-outlined text-xl">call</span>
              </div>
              <div>
                <h5 className="text-xs sm:text-sm font-bold text-text-main">Phone Inquiry</h5>
                <p className="text-[11px] sm:text-xs text-text-muted">
                  +251 92 545 1711
                </p>
              </div>
            </div>

            {/* Headquarters & Email */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-surface-white border border-border-subtle flex items-start gap-3 sm:gap-3.5 shadow-cozy-sm">
              <div className="w-10 h-10 rounded-lg bg-surface-subtle text-brand-green flex items-center justify-center shrink-0 mt-0.5 border border-border-subtle shadow-cozy-sm">
                <span className="material-symbols-outlined text-xl">location_on</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <h5 className="text-xs sm:text-sm font-bold text-text-main">
                  Headquarters Location
                </h5>
                <p className="text-[11px] sm:text-xs text-text-muted">
                  Bole Sub-City, Atlas District, Addis Ababa, Ethiopia
                </p>
                <p className="text-[11px] sm:text-xs text-brand-green font-semibold mt-1">
                  Email: advisory@ethiopiansignature.com
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Consultation Form */}
        <div className="lg:col-span-7 bg-surface-white p-5 sm:p-8 rounded-2xl border border-border-subtle shadow-cozy w-full">
          <form className="flex flex-col gap-3.5 sm:gap-4" id="advisory-form" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-text-main" htmlFor="lead-name">
                  Your Full Name *
                </label>
                <input
                  className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-border-subtle bg-surface-cream text-xs sm:text-sm focus:border-brand-green focus:bg-white focus:ring-1 focus:ring-brand-green outline-none transition-all shadow-inner"
                  id="lead-name"
                  placeholder="Abebe Bikila"
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-text-main" htmlFor="lead-whatsapp">
                  WhatsApp or Phone Number *
                </label>
                <input
                  className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-border-subtle bg-surface-cream text-xs sm:text-sm focus:border-brand-green focus:bg-white focus:ring-1 focus:ring-brand-green outline-none transition-all shadow-inner"
                  id="lead-whatsapp"
                  placeholder="+251 92 545 1711"
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-text-main" htmlFor="lead-email">
                  Email Address
                </label>
                <input
                  className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-border-subtle bg-surface-cream text-xs sm:text-sm focus:border-brand-green focus:bg-white focus:ring-1 focus:ring-brand-green outline-none transition-all shadow-inner"
                  id="lead-email"
                  placeholder="abebe@example.com"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-text-main" htmlFor="lead-service">
                  Area of Interest *
                </label>
                <select
                  className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-border-subtle bg-surface-cream text-xs sm:text-sm focus:border-brand-green focus:bg-white focus:ring-1 focus:ring-brand-green outline-none transition-all shadow-inner"
                  id="lead-service"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                >
                  <option value="Coffee Shop Setup & Organization">
                    Coffee Shop Setup &amp; Organization
                  </option>
                  <option value="Barista Training">Barista Training</option>
                  <option value="Menu & Recipe Development">Menu &amp; Recipe Development</option>
                  <option value="Coffee Business Consulting">Coffee Business Consulting</option>
                  <option value="Coffee Shop Operations Management">
                    Coffee Shop Operations Management
                  </option>
                  <option value="Menu Engineering & Profitability Improvement">
                    Menu Engineering &amp; Profitability
                  </option>
                  <option value="Premium Ethiopian Coffee Sourcing">
                    Premium Ethiopian Coffee Sourcing
                  </option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-text-main" htmlFor="lead-notes">
                Project Details / Message
              </label>
              <textarea
                className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-border-subtle bg-surface-cream text-xs sm:text-sm focus:border-brand-green focus:bg-white focus:ring-1 focus:ring-brand-green outline-none transition-all resize-y shadow-inner"
                id="lead-notes"
                placeholder="Tell us about your venue location, opening timeline, or training requirements..."
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>

            {/* Main Solid Action Button on Submit */}
            <button
              className="group mt-1 sm:mt-2 w-full h-12 px-6 sm:px-8 rounded-xl bg-brand-green hover:bg-brand-green-dark text-white font-semibold text-sm active:scale-95 transition-all shadow-cozy hover:shadow-cozy-float flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-75 disabled:cursor-not-allowed"
              type="submit"
              disabled={isSubmitting}
            >
              <span>{isSubmitting ? "Submitting Inquiry..." : "Submit Inquiry"}</span>
              {isSubmitting && (
                <span className="material-symbols-outlined text-lg animate-spin">
                  progress_activity
                </span>
              )}
            </button>

            {feedback.type === "success" && (
              <div
                id="form-feedback"
                className="p-3.5 sm:p-4 rounded-xl bg-green-50/90 border border-brand-green/30 text-brand-green text-xs sm:text-sm font-semibold text-center shadow-cozy-sm"
              >
                ✓ {feedback.message}
              </div>
            )}

            {feedback.type === "error" && (
              <div
                id="form-error"
                className="p-3.5 sm:p-4 rounded-xl bg-red-50/90 border border-red-200 text-brand-red text-xs sm:text-sm font-semibold text-center shadow-cozy-sm"
              >
                ⚠ {feedback.message}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
