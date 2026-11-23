"use client";

import { useState, useTransition } from "react";
import { submitTrainingApplicationAction } from "@/app/actions/training-application";

interface CohortInfo {
  id: string;
  start_date: string;
  end_date: string;
  session_time: string;
}

interface ProgramInfo {
  id: string;
  title: string;
  level?: string;
  duration?: string;
  tuition_etb?: number;
  description?: string;
  form_config?: {
    ask_email?: boolean;
    ask_experience?: boolean;
    ask_organization?: boolean;
    ask_notes?: boolean;
    custom_questions?: string[];
  };
}

interface TrainingApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  program: ProgramInfo | null;
  cohort: CohortInfo | null;
}

export default function TrainingApplicationModal({
  isOpen,
  onClose,
  program,
  cohort,
}: TrainingApplicationModalProps) {
  const [studentName, setStudentName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("Beginner / Coffee Enthusiast");
  const [organization, setOrganization] = useState("");
  const [notes, setNotes] = useState("");
  const [customAnswers, setCustomAnswers] = useState<Record<string, string>>({});

  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !program) return null;

  const formConfig = program.form_config || {
    ask_email: true,
    ask_experience: true,
    ask_organization: true,
    ask_notes: true,
    custom_questions: [],
  };

  const handleCustomAnswerChange = (question: string, value: string) => {
    setCustomAnswers((prev) => ({ ...prev, [question]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    startTransition(async () => {
      const res = await submitTrainingApplicationAction({
        programId: program.id,
        cohortId: cohort?.id,
        studentName,
        phone,
        email: email || undefined,
        courseLevel: program.title,
        experienceLevel: formConfig.ask_experience !== false ? experienceLevel : undefined,
        organization: formConfig.ask_organization !== false ? organization : undefined,
        notes: formConfig.ask_notes !== false ? notes : undefined,
        customAnswers: Object.keys(customAnswers).length > 0 ? customAnswers : undefined,
      });

      if (res.success) {
        setIsSuccess(true);
      } else {
        setErrorMessage(res.message || "Failed to submit application. Please try again.");
      }
    });
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setErrorMessage(null);
    setStudentName("");
    setPhone("");
    setEmail("");
    setOrganization("");
    setNotes("");
    setCustomAnswers({});
    onClose();
  };

  return (
    <div
      aria-labelledby="training-application-title"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto"
      role="dialog"
    >
      <div className="w-full max-w-xl my-8 bg-stone-900 border border-brand-green/40 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl text-white relative overflow-hidden flex flex-col gap-6">
        {/* Subtle Ambient Decorative Glows */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-green/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-brand-yellow/15 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-4 relative z-10">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-widest text-brand-yellow font-bold">
              Barista Academy Application
            </span>
            <h3
              className="font-serif text-xl sm:text-2xl font-bold text-white leading-tight"
              id="training-application-title"
            >
              {program.title}
            </h3>
            {cohort ? (
              <div className="flex items-center gap-2 text-xs text-white/70 mt-1 font-mono">
                <span className="material-symbols-outlined text-sm text-brand-yellow">event_available</span>
                <span>
                  Cohort: {new Date(cohort.start_date).toLocaleDateString()} – {new Date(cohort.end_date).toLocaleDateString()} ({cohort.session_time})
                </span>
              </div>
            ) : (
              <span className="text-xs text-white/60 mt-0.5">
                Duration: {program.duration || "4 Weeks"} · Tuition: {Number(program.tuition_etb || 0).toLocaleString()} ETB
              </span>
            )}
          </div>

          <button
            aria-label="Close dialog"
            className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white flex items-center justify-center transition-colors shrink-0"
            type="button"
            onClick={handleResetAndClose}
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Success View */}
        {isSuccess ? (
          <div className="py-8 flex flex-col items-center text-center gap-4 relative z-10 animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-2xl bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-3xl">check_circle</span>
            </div>

            <div className="flex flex-col gap-1.5 max-w-md">
              <h4 className="font-serif text-2xl font-bold text-white">Application Received!</h4>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                Thank you, <strong>{studentName}</strong>. Your seat reservation request for <strong>{program.title}</strong> has been registered.
              </p>
              <p className="text-xs text-white/60 mt-1 leading-relaxed">
                Our academy registrar will review your details and contact you directly via WhatsApp at <strong>{phone}</strong> to confirm your cohort schedule.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full pt-4">
              <a
                className="btn-shimmer flex-1 w-full h-11 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
                href={`https://wa.me/251925451711?text=Hello%20Ethiopian%20Signature%20Coffee%2C%20I%20just%20submitted%20my%20application%20for%20${encodeURIComponent(
                  program.title
                )}.%20My%20name%20is%20${encodeURIComponent(studentName)}.`}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-sm">chat</span>
                <span>Confirm on WhatsApp</span>
              </a>

              <button
                className="flex-1 w-full h-11 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider transition-all"
                type="button"
                onClick={handleResetAndClose}
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          /* Application Form View */
          <form className="flex flex-col gap-4 relative z-10" onSubmit={handleSubmit}>
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-red-900/40 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                <span className="material-symbols-outlined text-base shrink-0">error</span>
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Student Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-white/90" htmlFor="applicant-name">
                Full Name <span className="text-brand-yellow">*</span>
              </label>
              <input
                autoFocus
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder:text-white/40 focus:border-brand-yellow focus:bg-white/10 outline-none transition-all"
                id="applicant-name"
                placeholder="e.g. Abebe Bikila"
                required
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
              />
            </div>

            {/* Phone & Email (Responsive 2-col) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-white/90" htmlFor="applicant-phone">
                  Phone / WhatsApp <span className="text-brand-yellow">*</span>
                </label>
                <input
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder:text-white/40 focus:border-brand-yellow focus:bg-white/10 outline-none transition-all font-mono"
                  id="applicant-phone"
                  placeholder="e.g. +251 91 234 5678"
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              {formConfig.ask_email !== false && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-white/90" htmlFor="applicant-email">
                    Email Address <span className="text-white/40 font-normal">(Optional)</span>
                  </label>
                  <input
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder:text-white/40 focus:border-brand-yellow focus:bg-white/10 outline-none transition-all"
                    id="applicant-email"
                    placeholder="e.g. student@example.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              )}
            </div>

            {/* Experience Level & Organization */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {formConfig.ask_experience !== false && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-white/90" htmlFor="applicant-exp">
                    Experience Level
                  </label>
                  <select
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-800 border border-white/15 text-xs text-white outline-none focus:border-brand-yellow transition-all"
                    id="applicant-exp"
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value)}
                  >
                    <option value="Beginner / Coffee Enthusiast">Beginner / Coffee Enthusiast</option>
                    <option value="Home Brewer / Cupper">Home Brewer / Cupper</option>
                    <option value="Working Junior Barista">Working Junior Barista</option>
                    <option value="Head Barista / Trainer">Head Barista / Trainer</option>
                    <option value="Café Owner / Manager">Café Owner / Manager</option>
                  </select>
                </div>
              )}

              {formConfig.ask_organization !== false && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-white/90" htmlFor="applicant-org">
                    Café or Organization <span className="text-white/40 font-normal">(Optional)</span>
                  </label>
                  <input
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder:text-white/40 focus:border-brand-yellow focus:bg-white/10 outline-none transition-all"
                    id="applicant-org"
                    placeholder="e.g. Independent / Bole Café"
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                  />
                </div>
              )}
            </div>

            {/* Custom Questions (if configured by admin) */}
            {formConfig.custom_questions && formConfig.custom_questions.length > 0 && (
              <div className="flex flex-col gap-3 pt-1 border-t border-white/10">
                <span className="text-[11px] uppercase tracking-wider text-brand-yellow font-bold">
                  Course Inquiries
                </span>
                {formConfig.custom_questions.map((q, idx) => (
                  <div key={idx} className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-white/90">{q}</label>
                    <input
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder:text-white/40 focus:border-brand-yellow focus:bg-white/10 outline-none transition-all"
                      placeholder="Your answer..."
                      type="text"
                      value={customAnswers[q] || ""}
                      onChange={(e) => handleCustomAnswerChange(q, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Notes / Career Objectives */}
            {formConfig.ask_notes !== false && (
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-white/90" htmlFor="applicant-notes">
                  Goals &amp; Questions <span className="text-white/40 font-normal">(Optional)</span>
                </label>
                <textarea
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder:text-white/40 focus:border-brand-yellow focus:bg-white/10 outline-none transition-all resize-none"
                  id="applicant-notes"
                  placeholder="Tell us what you hope to achieve (e.g. café launch, working abroad, certification)..."
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-white/50">
                Seats reserved in order of verification.
              </span>
              <div className="flex items-center gap-2">
                <button
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs font-semibold transition-colors"
                  type="button"
                  onClick={handleResetAndClose}
                >
                  Cancel
                </button>
                <button
                  className="btn-shimmer px-6 py-2.5 rounded-xl bg-brand-yellow hover:bg-brand-yellow-light text-stone-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 disabled:opacity-50"
                  disabled={isPending || !studentName.trim() || !phone.trim()}
                  type="submit"
                >
                  <span>{isPending ? "Submitting..." : "Submit Application"}</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
