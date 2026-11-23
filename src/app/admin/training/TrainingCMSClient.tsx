"use client";

import { useState, useTransition } from "react";
import {
  createTrainingProgramAction,
  createCohortScheduleAction,
  updateCohortScheduleAction,
  deleteCohortScheduleAction,
  updateAcademyApplicantStatusAction,
  deleteAcademyApplicantAction,
} from "@/app/actions/admin-cms";
import {
  exportProgramApplicantsToExcel,
  exportAllApplicantsToExcel,
  ApplicantExportItem,
} from "@/lib/excel-export";

interface Cohort {
  id: string;
  program_id: string;
  start_date: string;
  end_date: string;
  session_time: string;
  seats_total: number;
  seats_booked: number;
  status: string;
}

interface Program {
  id: string;
  title: string;
  slug: string;
  level: string;
  duration: string;
  tuition_etb: number;
  description: string;
  curriculum: string[];
  has_application_form?: boolean;
  form_config?: {
    ask_email?: boolean;
    ask_experience?: boolean;
    ask_organization?: boolean;
    ask_notes?: boolean;
    custom_questions?: string[];
  };
  schedules: Cohort[];
  applicants?: ApplicantExportItem[];
  applicant_count?: number;
}

export default function TrainingCMSClient({
  initialPrograms,
}: {
  initialPrograms: Program[];
}) {
  const [programs, setPrograms] = useState<Program[]>(initialPrograms);
  const [activeTab, setActiveTab] = useState<"courses" | "applicants">("courses");
  const [expandedApplicantsProgramId, setExpandedApplicantsProgramId] = useState<string | null>(null);

  // Search & Filter for All Applicants
  const [applicantSearch, setApplicantSearch] = useState("");
  const [applicantStatusFilter, setApplicantStatusFilter] = useState("all");
  const [applicantProgramFilter, setApplicantProgramFilter] = useState("all");

  // Modals state
  const [showNewProgramModal, setShowNewProgramModal] = useState(false);
  const [selectedProgramForCohort, setSelectedProgramForCohort] = useState<Program | null>(null);

  // New Program Form State
  const [progTitle, setProgTitle] = useState("");
  const [progLevel, setProgLevel] = useState("Foundation");
  const [progDuration, setProgDuration] = useState("");
  const [progTuition, setProgTuition] = useState("");
  const [progDesc, setProgDesc] = useState("");
  const [progCurriculum, setProgCurriculum] = useState("");

  // Form Builder Settings
  const [askEmail, setAskEmail] = useState(true);
  const [askExperience, setAskExperience] = useState(true);
  const [askOrganization, setAskOrganization] = useState(true);
  const [askNotes, setAskNotes] = useState(true);
  const [customQuestions, setCustomQuestions] = useState<string[]>([]);
  const [newQuestionText, setNewQuestionText] = useState("");

  // New Cohort Form State
  const [cohortStartDate, setCohortStartDate] = useState("");
  const [cohortEndDate, setCohortEndDate] = useState("");
  const [cohortTime, setCohortTime] = useState("Mon–Fri: 9:00 AM – 1:00 PM");
  const [cohortSeats, setCohortSeats] = useState("8");

  const [isPending, startTransition] = useTransition();

  // Consolidate all applicants across programs
  const allApplicants: ApplicantExportItem[] = programs.flatMap(
    (p) => (p.applicants || []).map((a) => ({ ...a, program_title: p.title }))
  );

  const filteredAllApplicants = allApplicants.filter((app) => {
    const matchesSearch =
      app.student_name.toLowerCase().includes(applicantSearch.toLowerCase()) ||
      app.phone.includes(applicantSearch) ||
      (app.email && app.email.toLowerCase().includes(applicantSearch.toLowerCase())) ||
      (app.program_title && app.program_title.toLowerCase().includes(applicantSearch.toLowerCase()));

    const matchesStatus =
      applicantStatusFilter === "all" || (app.status || "pending").toLowerCase() === applicantStatusFilter.toLowerCase();

    const matchesProgram =
      applicantProgramFilter === "all" || app.program_title === applicantProgramFilter;

    return matchesSearch && matchesStatus && matchesProgram;
  });

  const handleAddCustomQuestion = () => {
    if (!newQuestionText.trim()) return;
    setCustomQuestions((prev) => [...prev, newQuestionText.trim()]);
    setNewQuestionText("");
  };

  const handleRemoveCustomQuestion = (index: number) => {
    setCustomQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCreateProgram = (e: React.FormEvent) => {
    e.preventDefault();
    if (!progTitle.trim() || !progDuration.trim()) return;

    const curriculumArray = progCurriculum
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    startTransition(async () => {
      const res = await createTrainingProgramAction({
        title: progTitle,
        level: progLevel,
        duration: progDuration,
        description: progDesc,
        tuition_etb: Number(progTuition) || 0,
        curriculum: curriculumArray,
        has_application_form: true,
        form_config: {
          ask_email: askEmail,
          ask_experience: askExperience,
          ask_organization: askOrganization,
          ask_notes: askNotes,
          custom_questions: customQuestions,
        },
      });

      if (res.success) {
        setShowNewProgramModal(false);
        setProgTitle("");
        setProgDuration("");
        setProgTuition("");
        setProgDesc("");
        setProgCurriculum("");
        setCustomQuestions([]);
        window.location.reload();
      }
    });
  };

  const handleCreateCohort = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProgramForCohort || !cohortStartDate || !cohortEndDate) return;

    startTransition(async () => {
      const res = await createCohortScheduleAction({
        program_id: selectedProgramForCohort.id,
        start_date: cohortStartDate,
        end_date: cohortEndDate,
        session_time: cohortTime,
        seats_total: Number(cohortSeats) || 8,
      });

      if (res.success) {
        setSelectedProgramForCohort(null);
        setCohortStartDate("");
        setCohortEndDate("");
        window.location.reload();
      }
    });
  };

  const handleCohortStatusChange = (cohortId: string, programId: string, newStatus: string) => {
    setPrograms((prev) =>
      prev.map((p) =>
        p.id === programId
          ? {
              ...p,
              schedules: p.schedules.map((s) =>
                s.id === cohortId ? { ...s, status: newStatus } : s
              ),
            }
          : p
      )
    );
    startTransition(async () => {
      await updateCohortScheduleAction(cohortId, { status: newStatus });
    });
  };

  const handleDeleteCohort = (cohortId: string, programId: string) => {
    setPrograms((prev) =>
      prev.map((p) =>
        p.id === programId
          ? { ...p, schedules: p.schedules.filter((s) => s.id !== cohortId) }
          : p
      )
    );
    startTransition(async () => {
      await deleteCohortScheduleAction(cohortId);
    });
  };

  const handleApplicantStatusChange = (applicantId: string, newStatus: string) => {
    setPrograms((prev) =>
      prev.map((p) => ({
        ...p,
        applicants: (p.applicants || []).map((a) =>
          a.id === applicantId ? { ...a, status: newStatus } : a
        ),
      }))
    );
    startTransition(async () => {
      await updateAcademyApplicantStatusAction(applicantId, newStatus);
    });
  };

  const handleDeleteApplicant = (applicantId: string) => {
    if (!confirm("Are you sure you want to remove this applicant record?")) return;
    setPrograms((prev) =>
      prev.map((p) => ({
        ...p,
        applicants: (p.applicants || []).filter((a) => a.id !== applicantId),
        applicant_count: Math.max(0, (p.applicant_count || 1) - 1),
      }))
    );
    startTransition(async () => {
      await deleteAcademyApplicantAction(applicantId);
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Step-by-Step Operator Guide */}
      <div className="p-4 rounded-xl bg-surface-container-lowest border border-surface-container-highest shadow-sm flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded bg-stitch-primary text-white flex items-center justify-center text-xs font-bold shrink-0">
            ?
          </span>
          <h2 className="font-semibold text-xs text-stitch-primary uppercase tracking-wider">
            Step-by-Step Guide: Managing Courses, Dynamic Forms &amp; Applications
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
          <div className="p-3 rounded-lg bg-surface-container-low border border-surface-container-highest flex items-start gap-2.5">
            <span className="w-5 h-5 rounded bg-stitch-primary text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
              1
            </span>
            <div className="flex flex-col">
              <span className="font-bold text-on-surface">Create Course &amp; Form</span>
              <span className="text-[11px] text-on-surface-variant mt-0.5 leading-relaxed">
                Click <strong>+ Add New Training Course</strong>. Configure tuition, curriculum, and check which application fields you want to collect.
              </span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-surface-container-low border border-surface-container-highest flex items-start gap-2.5">
            <span className="w-5 h-5 rounded bg-stitch-secondary text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
              2
            </span>
            <div className="flex flex-col">
              <span className="font-bold text-on-surface">Publish Cohort Dates</span>
              <span className="text-[11px] text-on-surface-variant mt-0.5 leading-relaxed">
                Click <strong>Add Class Dates</strong> to open a cohort. The website immediately displays seats remaining and opens the application form.
              </span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-surface-container-low border border-surface-container-highest flex items-start gap-2.5">
            <span className="w-5 h-5 rounded bg-[#25D366] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
              3
            </span>
            <div className="flex flex-col">
              <span className="font-bold text-on-surface">Review &amp; Export to Excel</span>
              <span className="text-[11px] text-on-surface-variant mt-0.5 leading-relaxed">
                Click <strong>Applicants</strong> on any course or open the <strong>All Registered Students</strong> tab to export clean Excel spreadsheets.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header with Tab Switcher & Primary Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface-container-lowest p-4 rounded-xl border border-surface-container-highest shadow-sm">
        <div className="flex items-center gap-2">
          <button
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "courses"
                ? "bg-stitch-primary text-white shadow-xs"
                : "bg-surface-container-low text-on-surface-variant hover:text-stitch-primary hover:bg-surface-container"
            }`}
            type="button"
            onClick={() => setActiveTab("courses")}
          >
            <span className="material-symbols-outlined text-sm">school</span>
            <span>Courses &amp; Schedules ({programs.length})</span>
          </button>

          <button
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "applicants"
                ? "bg-stitch-primary text-white shadow-xs"
                : "bg-surface-container-low text-on-surface-variant hover:text-stitch-primary hover:bg-surface-container"
            }`}
            type="button"
            onClick={() => setActiveTab("applicants")}
          >
            <span className="material-symbols-outlined text-sm">group</span>
            <span>All Registered Students ({allApplicants.length})</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === "courses" ? (
            <button
              className="px-4 py-2 rounded-lg bg-stitch-primary hover:bg-stitch-primary-container text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center gap-1.5 shrink-0"
              type="button"
              onClick={() => setShowNewProgramModal(true)}
            >
              <span className="material-symbols-outlined text-base">add</span>
              <span>+ Add New Training Course</span>
            </button>
          ) : (
            <button
              className="px-4 py-2 rounded-lg bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center gap-1.5 shrink-0 disabled:opacity-50"
              disabled={allApplicants.length === 0}
              type="button"
              onClick={() => exportAllApplicantsToExcel(filteredAllApplicants)}
            >
              <span className="material-symbols-outlined text-base">file_download</span>
              <span>Export All to Excel (.xlsx)</span>
            </button>
          )}
        </div>
      </div>

      {/* VIEW MODE 1: Courses & Schedules */}
      {activeTab === "courses" && (
        <div className="flex flex-col gap-5">
          {programs.map((prog) => {
            const isApplicantsExpanded = expandedApplicantsProgramId === prog.id;
            const programApplicants = prog.applicants || [];

            return (
              <div
                key={prog.id}
                className="p-5 rounded-xl bg-surface-container-lowest border border-surface-container-highest flex flex-col gap-5 shadow-sm"
              >
                {/* Program Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-surface-container-highest pb-4">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-stitch-tertiary-fixed text-stitch-tertiary">
                        {prog.level} Level
                      </span>
                      <span className="text-xs text-on-surface-variant font-semibold">
                        Duration: {prog.duration}
                      </span>
                      <span className="text-xs text-stitch-primary font-semibold">
                        · {Number(prog.tuition_etb).toLocaleString()} ETB
                      </span>
                    </div>

                    <h4 className="font-serif text-lg sm:text-xl font-semibold text-stitch-primary mt-1">
                      {prog.title}
                    </h4>
                    <p className="text-xs text-on-surface-variant mt-1 max-w-2xl leading-relaxed">
                      {prog.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0 pt-2 sm:pt-0">
                    {/* Applicants Toggle Button */}
                    <button
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors border ${
                        isApplicantsExpanded
                          ? "bg-stitch-primary text-white border-stitch-primary"
                          : "bg-surface-container-low text-on-surface hover:text-stitch-primary border-surface-container-highest"
                      }`}
                      type="button"
                      onClick={() =>
                        setExpandedApplicantsProgramId(isApplicantsExpanded ? null : prog.id)
                      }
                    >
                      <span className="material-symbols-outlined text-sm">group</span>
                      <span>Applicants ({prog.applicant_count || 0})</span>
                      <span className="material-symbols-outlined text-sm">
                        {isApplicantsExpanded ? "expand_less" : "expand_more"}
                      </span>
                    </button>

                    {/* Per-Program Excel Export */}
                    {programApplicants.length > 0 && (
                      <button
                        className="px-3 py-1.5 rounded-lg bg-[#25D366]/15 text-[#0d472a] hover:bg-[#25D366] hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors border border-[#25D366]/30 shadow-xs"
                        type="button"
                        onClick={() => exportProgramApplicantsToExcel(prog.title, programApplicants)}
                      >
                        <span className="material-symbols-outlined text-sm">file_download</span>
                        <span>Export Excel</span>
                      </button>
                    )}

                    {/* Add Class Dates */}
                    <button
                      className="px-3.5 py-1.5 rounded-lg bg-stitch-primary text-white hover:bg-stitch-primary-container text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                      type="button"
                      onClick={() => setSelectedProgramForCohort(prog)}
                    >
                      <span className="material-symbols-outlined text-sm">calendar_add_on</span>
                      <span>Add Class Dates</span>
                    </button>
                  </div>
                </div>

                {/* Per-Program Applicants Drawer (when expanded) */}
                {isApplicantsExpanded && (
                  <div className="p-4 rounded-xl bg-surface-container-low/70 border border-surface-container-highest flex flex-col gap-3 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between border-b border-surface-container-highest pb-2">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-stitch-primary text-lg">group</span>
                        <span className="font-semibold text-xs text-stitch-primary">
                          Registered Applicants for {prog.title} ({programApplicants.length})
                        </span>
                      </div>

                      {programApplicants.length > 0 && (
                        <button
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#25D366] text-white hover:bg-[#20ba5a] text-[11px] font-bold uppercase tracking-wider transition-colors shadow-xs"
                          type="button"
                          onClick={() => exportProgramApplicantsToExcel(prog.title, programApplicants)}
                        >
                          <span className="material-symbols-outlined text-xs">file_download</span>
                          <span>Download .XLSX</span>
                        </button>
                      )}
                    </div>

                    {programApplicants.length === 0 ? (
                      <div className="py-6 text-center text-xs text-on-surface-variant flex flex-col items-center justify-center gap-1.5">
                        <span className="material-symbols-outlined text-2xl text-outline">inbox</span>
                        <span className="font-semibold text-on-surface">No applicants registered for this course yet</span>
                        <span className="text-[11px]">When visitors apply from the website, their details and answers will appear here.</span>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead>
                            <tr className="border-b border-surface-container-highest text-on-surface-variant uppercase tracking-wider text-[10px]">
                              <th className="py-2 px-2.5 font-bold">Student Name</th>
                              <th className="py-2 px-2.5 font-bold">Contact</th>
                              <th className="py-2 px-2.5 font-bold">Cohort</th>
                              <th className="py-2 px-2.5 font-bold">Experience &amp; Organization</th>
                              <th className="py-2 px-2.5 font-bold">Notes / Answers</th>
                              <th className="py-2 px-2.5 font-bold">Status</th>
                              <th className="py-2 px-2.5 font-bold text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-surface-container-highest">
                            {programApplicants.map((app) => (
                              <tr key={app.id} className="hover:bg-surface-container-low transition-colors">
                                <td className="py-2.5 px-2.5 font-semibold text-on-surface whitespace-nowrap">
                                  {app.student_name}
                                </td>
                                <td className="py-2.5 px-2.5 whitespace-nowrap">
                                  <div className="font-mono text-xs text-on-surface">{app.phone}</div>
                                  {app.email && <div className="text-[10px] text-on-surface-variant">{app.email}</div>}
                                </td>
                                <td className="py-2.5 px-2.5 text-on-surface-variant whitespace-nowrap text-[11px]">
                                  {app.cohort_dates || "Open Cohort"}
                                </td>
                                <td className="py-2.5 px-2.5 text-on-surface-variant text-[11px]">
                                  <div>{app.experience_level || "Not specified"}</div>
                                  {app.organization && (
                                    <div className="text-[10px] font-semibold text-stitch-secondary">{app.organization}</div>
                                  )}
                                </td>
                                <td className="py-2.5 px-2.5 max-w-xs text-[11px] text-on-surface leading-snug">
                                  {app.notes || "None"}
                                </td>
                                <td className="py-2.5 px-2.5 whitespace-nowrap">
                                  <select
                                    className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-surface-container-lowest border border-surface-container-highest text-stitch-primary outline-none"
                                    value={app.status || "pending"}
                                    onChange={(e) => handleApplicantStatusChange(app.id, e.target.value)}
                                  >
                                    <option value="pending">Pending</option>
                                    <option value="confirmed">Confirmed</option>
                                    <option value="contacted">Contacted</option>
                                    <option value="cancelled">Cancelled</option>
                                  </select>
                                </td>
                                <td className="py-2.5 px-2.5 text-right whitespace-nowrap">
                                  <div className="inline-flex items-center gap-1.5">
                                    <a
                                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#25D366]/15 text-[#0d472a] hover:bg-[#25D366] hover:text-white transition-colors text-[11px] font-semibold"
                                      href={`https://wa.me/${app.phone.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(
                                        app.student_name
                                      )}%2C%20thank%20you%20for%20applying%20for%20${encodeURIComponent(
                                        prog.title
                                      )}%20at%20Ethiopian%20Signature%20Coffee.`}
                                      rel="noopener noreferrer"
                                      target="_blank"
                                    >
                                      <span className="material-symbols-outlined text-xs">chat</span>
                                      <span>WhatsApp</span>
                                    </a>
                                    <button
                                      aria-label="Delete applicant"
                                      className="w-7 h-7 rounded hover:bg-red-50 text-error flex items-center justify-center transition-colors"
                                      type="button"
                                      onClick={() => handleDeleteApplicant(app.id)}
                                    >
                                      <span className="material-symbols-outlined text-sm">delete</span>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {/* Program Cohorts Table */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-on-surface">Scheduled Cohorts &amp; Dates:</span>
                    <span className="text-[11px] text-on-surface-variant font-mono">
                      {prog.schedules.length} cohorts published
                    </span>
                  </div>

                  {prog.schedules.length === 0 ? (
                    <div className="py-4 text-center text-xs text-on-surface-variant bg-surface-container-low/40 rounded-lg border border-dashed border-surface-container-highest">
                      No cohort dates scheduled yet for this course. Click <strong>Add Class Dates</strong> above to publish upcoming sessions.
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-surface-container-highest text-on-surface-variant uppercase tracking-wider text-[10px]">
                            <th className="py-2 px-2.5 font-bold">Start &amp; End Dates</th>
                            <th className="py-2 px-2.5 font-bold">Session Hours</th>
                            <th className="py-2 px-2.5 font-bold">Student Seats</th>
                            <th className="py-2 px-2.5 font-bold">Enrollment Status</th>
                            <th className="py-2 px-2.5 font-bold text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-surface-container-highest">
                          {prog.schedules.map((cohort) => (
                            <tr key={cohort.id} className="hover:bg-surface-container-low/40 transition-colors">
                              <td className="py-2.5 px-2.5 font-semibold text-on-surface whitespace-nowrap">
                                {new Date(cohort.start_date).toLocaleDateString()} –{" "}
                                {new Date(cohort.end_date).toLocaleDateString()}
                              </td>
                              <td className="py-2.5 px-2.5 text-on-surface-variant whitespace-nowrap">
                                {cohort.session_time}
                              </td>
                              <td className="py-2.5 px-2.5 font-mono text-on-surface-variant whitespace-nowrap">
                                <span className="font-bold text-stitch-primary">{cohort.seats_booked}</span> /{" "}
                                {cohort.seats_total} booked
                              </td>
                              <td className="py-2.5 px-2.5 whitespace-nowrap">
                                <select
                                  className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-surface-container-low border border-surface-container-highest text-stitch-primary outline-none focus:border-stitch-primary"
                                  value={cohort.status}
                                  onChange={(e) =>
                                    handleCohortStatusChange(cohort.id, prog.id, e.target.value)
                                  }
                                >
                                  <option value="open">Open (Enrolling)</option>
                                  <option value="filling_fast">Filling Fast</option>
                                  <option value="sold_out">Sold Out</option>
                                  <option value="completed">Completed</option>
                                </select>
                              </td>
                              <td className="py-2.5 px-2.5 text-right whitespace-nowrap">
                                <button
                                  aria-label="Remove Cohort"
                                  className="text-on-surface-variant hover:text-error transition-colors p-1"
                                  type="button"
                                  onClick={() => handleDeleteCohort(cohort.id, prog.id)}
                                >
                                  <span className="material-symbols-outlined text-sm">delete</span>
                                </button>
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
          })}
        </div>
      )}

      {/* VIEW MODE 2: All Registered Students & Master Excel Export */}
      {activeTab === "applicants" && (
        <div className="p-5 rounded-xl bg-surface-container-lowest border border-surface-container-highest shadow-sm flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-surface-container-highest pb-3">
            <div>
              <h3 className="font-serif text-lg font-semibold text-stitch-primary">
                All Course &amp; Service Applicants ({allApplicants.length})
              </h3>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Every visitor who registered for training or applied for a specialty service appears in this centralized directory.
              </p>
            </div>

            <button
              className="px-3.5 py-2 rounded-lg bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center gap-1.5 shrink-0 self-start sm:self-auto disabled:opacity-50"
              disabled={allApplicants.length === 0}
              type="button"
              onClick={() => exportAllApplicantsToExcel(filteredAllApplicants)}
            >
              <span className="material-symbols-outlined text-base">file_download</span>
              <span>Export Selected to Excel (.xlsx)</span>
            </button>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">
                search
              </span>
              <input
                className="w-full pl-9 pr-4 py-2 rounded-lg bg-surface-container-low border border-surface-container-highest text-xs text-on-surface placeholder:text-on-surface-variant outline-none focus:border-stitch-primary"
                placeholder="Search by student name, phone, email, or course..."
                type="text"
                value={applicantSearch}
                onChange={(e) => setApplicantSearch(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-on-surface-variant whitespace-nowrap font-medium">Status:</span>
              <select
                className="px-3 py-2 rounded-lg bg-surface-container-low border border-surface-container-highest text-xs text-on-surface outline-none focus:border-stitch-primary"
                value={applicantStatusFilter}
                onChange={(e) => setApplicantStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="contacted">Contacted</option>
                <option value="cancelled">Cancelled</option>
              </select>

              <span className="text-xs text-on-surface-variant whitespace-nowrap font-medium ml-2">Course:</span>
              <select
                className="px-3 py-2 rounded-lg bg-surface-container-low border border-surface-container-highest text-xs text-on-surface outline-none focus:border-stitch-primary max-w-[180px] truncate"
                value={applicantProgramFilter}
                onChange={(e) => setApplicantProgramFilter(e.target.value)}
              >
                <option value="all">All Courses</option>
                {programs.map((p) => (
                  <option key={p.id} value={p.title}>
                    {p.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Master Table */}
          {allApplicants.length === 0 ? (
            <div className="py-12 text-center flex flex-col items-center justify-center gap-2.5">
              <div className="w-12 h-12 rounded-xl bg-surface-container-low text-stitch-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">school</span>
              </div>
              <span className="font-semibold text-sm text-on-surface">No Registered Students Yet</span>
              <p className="text-xs text-on-surface-variant max-w-md leading-relaxed">
                When visitors register for a course or cohort on the website, their details, contact numbers, and custom answers will be recorded here and can be exported into Excel.
              </p>
            </div>
          ) : filteredAllApplicants.length === 0 ? (
            <div className="py-8 text-center text-xs text-on-surface-variant">
              No applicants match your search or filter. Try clearing the search box.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-surface-container-highest bg-surface-container-low/70 text-on-surface-variant uppercase tracking-wider text-[10px]">
                    <th className="py-2.5 px-3 font-bold">Student Name</th>
                    <th className="py-2.5 px-3 font-bold">Course Applied</th>
                    <th className="py-2.5 px-3 font-bold">Phone / WhatsApp</th>
                    <th className="py-2.5 px-3 font-bold">Cohort</th>
                    <th className="py-2.5 px-3 font-bold">Applied On</th>
                    <th className="py-2.5 px-3 font-bold">Status</th>
                    <th className="py-2.5 px-3 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container-highest">
                  {filteredAllApplicants.map((app) => (
                    <tr key={app.id} className="hover:bg-surface-container-low/50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-on-surface whitespace-nowrap">
                        {app.student_name}
                      </td>
                      <td className="py-3 px-3 text-stitch-primary font-medium whitespace-nowrap">
                        {app.program_title || "Specialty Course"}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap font-mono text-xs">
                        {app.phone}
                      </td>
                      <td className="py-3 px-3 text-on-surface-variant text-[11px] whitespace-nowrap">
                        {app.cohort_dates || "Upcoming Session"}
                      </td>
                      <td className="py-3 px-3 text-on-surface-variant whitespace-nowrap">
                        {new Date(app.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <select
                          className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-surface-container-low border border-surface-container-highest text-stitch-primary outline-none"
                          value={app.status || "pending"}
                          onChange={(e) => handleApplicantStatusChange(app.id, e.target.value)}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="contacted">Contacted</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="py-3 px-3 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5">
                          <a
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#25D366]/15 text-[#0d472a] hover:bg-[#25D366] hover:text-white transition-colors text-xs font-semibold"
                            href={`https://wa.me/${app.phone.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(
                              app.student_name
                            )}%2C%20thank%20you%20for%20registering%20for%20${encodeURIComponent(
                              app.program_title || "Training"
                            )}.`}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <span className="material-symbols-outlined text-xs">chat</span>
                            <span>WhatsApp</span>
                          </a>
                          <button
                            aria-label="Delete applicant"
                            className="w-8 h-8 rounded-lg hover:bg-red-50 text-error flex items-center justify-center transition-colors"
                            type="button"
                            onClick={() => handleDeleteApplicant(app.id)}
                          >
                            <span className="material-symbols-outlined text-sm">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Add New Training Program Modal with Dynamic Form Builder */}
      {showNewProgramModal && (
        <div
          aria-labelledby="new-program-title"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto"
          role="dialog"
        >
          <div className="w-full max-w-xl my-8 bg-surface-container-lowest border border-surface-container-highest rounded-2xl p-6 sm:p-7 flex flex-col gap-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-surface-container-highest pb-3">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-stitch-secondary font-bold">
                  Course Creation &amp; Application Form Builder
                </span>
                <h3 className="font-serif text-lg font-semibold text-stitch-primary mt-0.5" id="new-program-title">
                  Add New Training Course
                </h3>
              </div>
              <button
                aria-label="Close dialog"
                className="w-8 h-8 rounded-lg hover:bg-surface-container-low text-on-surface-variant flex items-center justify-center transition-colors"
                type="button"
                onClick={() => setShowNewProgramModal(false)}
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <form className="flex flex-col gap-4 text-xs" onSubmit={handleCreateProgram}>
              {/* Course Basics */}
              <div className="flex flex-col gap-1">
                <label className="text-on-surface font-semibold" htmlFor="prog-title">
                  Course Title (e.g. Master Barista &amp; Latte Art) *
                </label>
                <input
                  className="px-3 py-2 rounded-lg bg-surface-container-low border border-surface-container-highest text-xs text-on-surface outline-none focus:border-stitch-primary"
                  id="prog-title"
                  placeholder="Enter name of course..."
                  required
                  type="text"
                  value={progTitle}
                  onChange={(e) => setProgTitle(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                <div className="flex flex-col gap-1">
                  <label className="text-on-surface font-semibold" htmlFor="prog-level">Skill Level</label>
                  <select
                    className="px-3 py-2 rounded-lg bg-surface-container-low border border-surface-container-highest text-xs text-on-surface outline-none focus:border-stitch-primary"
                    id="prog-level"
                    value={progLevel}
                    onChange={(e) => setProgLevel(e.target.value)}
                  >
                    <option value="Foundation">Foundation</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Professional">Professional</option>
                    <option value="Masterclass">Masterclass</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-on-surface font-semibold" htmlFor="prog-duration">Duration *</label>
                  <input
                    className="px-3 py-2 rounded-lg bg-surface-container-low border border-surface-container-highest text-xs text-on-surface outline-none focus:border-stitch-primary"
                    id="prog-duration"
                    placeholder="e.g. 2 Weeks"
                    required
                    type="text"
                    value={progDuration}
                    onChange={(e) => setProgDuration(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-on-surface font-semibold" htmlFor="prog-tuition">Tuition Fee (ETB) *</label>
                  <input
                    className="px-3 py-2 rounded-lg bg-surface-container-low border border-surface-container-highest text-xs text-on-surface outline-none focus:border-stitch-primary"
                    id="prog-tuition"
                    placeholder="e.g. 20000"
                    required
                    type="number"
                    value={progTuition}
                    onChange={(e) => setProgTuition(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-on-surface font-semibold" htmlFor="prog-desc">Course Overview *</label>
                <textarea
                  className="px-3 py-2 rounded-lg bg-surface-container-low border border-surface-container-highest text-xs text-on-surface outline-none focus:border-stitch-primary"
                  id="prog-desc"
                  placeholder="Explain what students will learn in this course..."
                  required
                  rows={2}
                  value={progDesc}
                  onChange={(e) => setProgDesc(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-on-surface font-semibold" htmlFor="prog-curriculum">
                  Curriculum Topics (type each topic on a new line)
                </label>
                <textarea
                  className="px-3 py-2 rounded-lg bg-surface-container-low border border-surface-container-highest text-xs text-on-surface outline-none focus:border-stitch-primary font-mono text-[11px]"
                  id="prog-curriculum"
                  placeholder="Espresso extraction science&#10;Milk steaming and microfoam&#10;Latte art free pouring"
                  rows={2}
                  value={progCurriculum}
                  onChange={(e) => setProgCurriculum(e.target.value)}
                />
              </div>

              {/* Dynamic Application Form Builder Section */}
              <div className="p-3.5 rounded-xl bg-surface-container-low border border-surface-container-highest flex flex-col gap-2.5">
                <div className="flex items-center gap-1.5 font-bold text-stitch-primary text-xs uppercase tracking-wider">
                  <span className="material-symbols-outlined text-sm">checklist</span>
                  <span>Application Form Builder (What Users Will Fill)</span>
                </div>
                <p className="text-[11px] text-on-surface-variant">
                  Full Name and Phone / WhatsApp are always required. Check the additional fields you want to include in this course&apos;s application form:
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      checked={askEmail}
                      className="rounded border-surface-container-highest text-stitch-primary focus:ring-stitch-primary"
                      type="checkbox"
                      onChange={(e) => setAskEmail(e.target.checked)}
                    />
                    <span className="text-on-surface">Ask for Email Address</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      checked={askExperience}
                      className="rounded border-surface-container-highest text-stitch-primary focus:ring-stitch-primary"
                      type="checkbox"
                      onChange={(e) => setAskExperience(e.target.checked)}
                    />
                    <span className="text-on-surface">Ask Experience Level</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      checked={askOrganization}
                      className="rounded border-surface-container-highest text-stitch-primary focus:ring-stitch-primary"
                      type="checkbox"
                      onChange={(e) => setAskOrganization(e.target.checked)}
                    />
                    <span className="text-on-surface">Ask Café / Organization</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      checked={askNotes}
                      className="rounded border-surface-container-highest text-stitch-primary focus:ring-stitch-primary"
                      type="checkbox"
                      onChange={(e) => setAskNotes(e.target.checked)}
                    />
                    <span className="text-on-surface">Ask Goals &amp; Questions Note</span>
                  </label>
                </div>

                {/* Custom Questions Adder */}
                <div className="flex flex-col gap-1.5 pt-2 border-t border-surface-container-highest">
                  <label className="text-[11px] font-semibold text-on-surface">
                    Add Custom Questions for Applicants (Optional):
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      className="flex-1 px-3 py-1.5 rounded-lg bg-surface-container-lowest border border-surface-container-highest text-xs text-on-surface outline-none focus:border-stitch-primary"
                      placeholder="e.g. Do you plan to work abroad or open a café?"
                      type="text"
                      value={newQuestionText}
                      onChange={(e) => setNewQuestionText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddCustomQuestion();
                        }
                      }}
                    />
                    <button
                      className="px-3 py-1.5 rounded-lg bg-stitch-secondary text-white text-xs font-semibold hover:bg-stitch-secondary/90 transition-colors shrink-0"
                      type="button"
                      onClick={handleAddCustomQuestion}
                    >
                      + Add
                    </button>
                  </div>

                  {customQuestions.length > 0 && (
                    <div className="flex flex-col gap-1 pt-1">
                      {customQuestions.map((q, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between px-2.5 py-1 rounded bg-surface-container-lowest border border-surface-container-highest text-[11px]"
                        >
                          <span className="text-on-surface truncate">{q}</span>
                          <button
                            aria-label="Remove question"
                            className="text-error hover:underline ml-2"
                            type="button"
                            onClick={() => handleRemoveCustomQuestion(idx)}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-2 border-t border-surface-container-highest">
                <button
                  className="px-3.5 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-semibold transition-colors"
                  type="button"
                  onClick={() => setShowNewProgramModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 rounded-lg bg-stitch-primary hover:bg-stitch-primary-container text-white font-bold text-xs uppercase tracking-wider transition-colors disabled:opacity-50 shadow-sm"
                  disabled={isPending}
                  type="submit"
                >
                  {isPending ? "Saving..." : "Save Course & Form"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Cohort Modal */}
      {selectedProgramForCohort && (
        <div
          aria-labelledby="add-cohort-title"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          role="dialog"
        >
          <div className="w-full max-w-md bg-surface-container-lowest border border-surface-container-highest rounded-2xl p-6 sm:p-7 flex flex-col gap-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-surface-container-highest pb-3">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-stitch-secondary font-bold">
                  Schedule Class Cohort
                </span>
                <h3 className="font-serif text-lg font-semibold text-stitch-primary mt-0.5" id="add-cohort-title">
                  {selectedProgramForCohort.title}
                </h3>
              </div>
              <button
                aria-label="Close dialog"
                className="w-8 h-8 rounded-lg hover:bg-surface-container-low text-on-surface-variant flex items-center justify-center transition-colors"
                type="button"
                onClick={() => setSelectedProgramForCohort(null)}
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <form className="flex flex-col gap-3.5 text-xs" onSubmit={handleCreateCohort}>
              <div className="grid grid-cols-2 gap-2.5">
                <div className="flex flex-col gap-1">
                  <label className="text-on-surface font-semibold" htmlFor="cohort-start">Class Start Date *</label>
                  <input
                    className="px-3 py-2 rounded-lg bg-surface-container-low border border-surface-container-highest text-xs text-on-surface outline-none focus:border-stitch-primary"
                    id="cohort-start"
                    required
                    type="date"
                    value={cohortStartDate}
                    onChange={(e) => setCohortStartDate(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-on-surface font-semibold" htmlFor="cohort-end">Class End Date *</label>
                  <input
                    className="px-3 py-2 rounded-lg bg-surface-container-low border border-surface-container-highest text-xs text-on-surface outline-none focus:border-stitch-primary"
                    id="cohort-end"
                    required
                    type="date"
                    value={cohortEndDate}
                    onChange={(e) => setCohortEndDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-on-surface font-semibold" htmlFor="cohort-time">Session Hours *</label>
                <input
                  className="px-3 py-2 rounded-lg bg-surface-container-low border border-surface-container-highest text-xs text-on-surface outline-none focus:border-stitch-primary"
                  id="cohort-time"
                  placeholder="e.g. Mon–Fri: 9:00 AM – 1:00 PM"
                  required
                  type="text"
                  value={cohortTime}
                  onChange={(e) => setCohortTime(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-on-surface font-semibold" htmlFor="cohort-seats">Total Student Seats Available</label>
                <input
                  className="px-3 py-2 rounded-lg bg-surface-container-low border border-surface-container-highest text-xs text-on-surface outline-none focus:border-stitch-primary"
                  id="cohort-seats"
                  max={20}
                  min={1}
                  required
                  type="number"
                  value={cohortSeats}
                  onChange={(e) => setCohortSeats(e.target.value)}
                />
                <span className="text-[11px] text-on-surface-variant">
                  Tip: Most cohorts have 6 to 10 hands-on student seats.
                </span>
              </div>

              <div className="flex justify-end gap-2.5 pt-2 border-t border-surface-container-highest">
                <button
                  className="px-3.5 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-semibold transition-colors"
                  type="button"
                  onClick={() => setSelectedProgramForCohort(null)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 rounded-lg bg-stitch-primary hover:bg-stitch-primary-container text-white font-bold text-xs uppercase tracking-wider transition-colors disabled:opacity-50 shadow-sm"
                  disabled={isPending}
                  type="submit"
                >
                  {isPending ? "Publishing..." : "Publish Class Dates"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
