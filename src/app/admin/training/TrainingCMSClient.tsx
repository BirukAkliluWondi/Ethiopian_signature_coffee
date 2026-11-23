"use client";

import { useState, useTransition } from "react";
import {
  createTrainingProgramAction,
  createCohortScheduleAction,
  updateCohortScheduleAction,
  deleteCohortScheduleAction,
  updateAcademyApplicantStatusAction,
  deleteAcademyApplicantAction,
  createServicePackageAction,
  deleteServicePackageAction,
  updateServiceBookingStatusAction,
  deleteServiceBookingAction,
  ServicePackageItem,
} from "@/app/actions/admin-cms";
import {
  exportProgramApplicantsToExcel,
  exportAllApplicantsToExcel,
  exportServiceBookingsToExcel,
  exportAllServiceBookingsToExcel,
  ApplicantExportItem,
  ServiceBookingExportItem,
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

const SERVICE_CATEGORIES = [
  "Turnkey Setup & Advisory",
  "Equipment & Technical Advisory",
  "Beverage & Menu Development",
  "Event & Hospitality Catering",
  "Quality Audit & Staff SOPs",
  "Custom Advisory Offering",
];

export default function TrainingCMSClient({
  initialPrograms,
  initialServicePackages = [],
}: {
  initialPrograms: Program[];
  initialServicePackages?: ServicePackageItem[];
}) {
  const [programs, setPrograms] = useState<Program[]>(initialPrograms);
  const [servicePackages, setServicePackages] = useState<ServicePackageItem[]>(initialServicePackages);
  const [activeTab, setActiveTab] = useState<"courses" | "services" | "applicants">("courses");

  // Expanded drawers
  const [expandedApplicantsProgramId, setExpandedApplicantsProgramId] = useState<string | null>(null);
  const [expandedBookingsPackageId, setExpandedBookingsPackageId] = useState<string | null>(null);

  // Modals state
  const [showChoiceModal, setShowChoiceModal] = useState(false);
  const [showNewProgramModal, setShowNewProgramModal] = useState(false);
  const [showNewServiceModal, setShowNewServiceModal] = useState(false);
  const [selectedProgramForCohort, setSelectedProgramForCohort] = useState<Program | null>(null);

  // New Program Form State
  const [progTitle, setProgTitle] = useState("");
  const [progLevel, setProgLevel] = useState("Foundation");
  const [progDuration, setProgDuration] = useState("");
  const [progTuition, setProgTuition] = useState("");
  const [progDesc, setProgDesc] = useState("");
  const [progCurriculum, setProgCurriculum] = useState("");
  const [progAskEmail, setProgAskEmail] = useState(true);
  const [progAskExperience, setProgAskExperience] = useState(true);
  const [progAskOrganization, setProgAskOrganization] = useState(true);
  const [progAskNotes, setProgAskNotes] = useState(true);
  const [progCustomQuestions, setProgCustomQuestions] = useState<string[]>([]);
  const [progNewQuestionText, setProgNewQuestionText] = useState("");

  // New Service Package Form State
  const [servTitle, setServTitle] = useState("");
  const [servCategory, setServCategory] = useState(SERVICE_CATEGORIES[0]);
  const [servPricingModel, setServPricingModel] = useState<"fixed" | "starting_from" | "per_day" | "custom_quote">("fixed");
  const [servPriceEtb, setServPriceEtb] = useState("");
  const [servTimeline, setServTimeline] = useState("");
  const [servDesc, setServDesc] = useState("");
  const [servDeliverables, setServDeliverables] = useState<string[]>([]);
  const [servNewDeliverableText, setServNewDeliverableText] = useState("");
  const [servAskEmail, setServAskEmail] = useState(true);
  const [servAskBusiness, setServAskBusiness] = useState(true);
  const [servAskLocation, setServAskLocation] = useState(true);
  const [servAskTimeline, setServAskTimeline] = useState(true);
  const [servAskNotes, setServAskNotes] = useState(true);
  const [servCustomQuestions, setServCustomQuestions] = useState<string[]>([]);
  const [servNewQuestionText, setServNewQuestionText] = useState("");

  // New Cohort Form State
  const [cohortStartDate, setCohortStartDate] = useState("");
  const [cohortEndDate, setCohortEndDate] = useState("");
  const [cohortTime, setCohortTime] = useState("Mon–Fri: 9:00 AM – 1:00 PM");
  const [cohortSeats, setCohortSeats] = useState("8");

  // Search & Filter for All Registrations & Bookings
  const [unifiedSearch, setUnifiedSearch] = useState("");
  const [unifiedTypeFilter, setUnifiedTypeFilter] = useState<"all" | "training" | "service">("all");
  const [unifiedStatusFilter, setUnifiedStatusFilter] = useState("all");

  const [isPending, startTransition] = useTransition();

  // Consolidate all applicants across programs
  const allApplicants: ApplicantExportItem[] = programs.flatMap(
    (p) => (p.applicants || []).map((a) => ({ ...a, program_title: p.title }))
  );

  // Consolidate all service bookings across packages
  const allServiceBookings: ServiceBookingExportItem[] = servicePackages.flatMap(
    (s) => (s.bookings || []).map((b) => ({ ...b, package_title: s.title }))
  );

  // Combine unified rows
  const combinedEntries = [
    ...allApplicants.map((a) => ({
      id: a.id,
      kind: "training" as const,
      name: a.student_name,
      phone: a.phone,
      email: a.email,
      offeringTitle: a.program_title || "Specialty Course",
      secondaryInfo: a.organization ? `Org: ${a.organization}` : (a.experience_level || "Applicant"),
      date: a.created_at,
      status: a.status || "pending",
      raw: a,
    })),
    ...allServiceBookings.map((b) => ({
      id: b.id,
      kind: "service" as const,
      name: b.client_name,
      phone: b.phone,
      email: b.email,
      offeringTitle: b.package_title || "Service Package",
      secondaryInfo: b.business_name ? `Venue: ${b.business_name}` : (b.venue_location || "Inquiry"),
      date: b.created_at,
      status: b.status || "new",
      raw: b,
    })),
  ];

  const filteredCombinedEntries = combinedEntries.filter((entry) => {
    const matchesSearch =
      entry.name.toLowerCase().includes(unifiedSearch.toLowerCase()) ||
      entry.phone.includes(unifiedSearch) ||
      (entry.email && entry.email.toLowerCase().includes(unifiedSearch.toLowerCase())) ||
      entry.offeringTitle.toLowerCase().includes(unifiedSearch.toLowerCase()) ||
      entry.secondaryInfo.toLowerCase().includes(unifiedSearch.toLowerCase());

    const matchesType =
      unifiedTypeFilter === "all" || entry.kind === unifiedTypeFilter;

    const matchesStatus =
      unifiedStatusFilter === "all" || entry.status.toLowerCase() === unifiedStatusFilter.toLowerCase();

    return matchesSearch && matchesType && matchesStatus;
  });

  // Program Form Question Helpers
  const handleAddProgQuestion = () => {
    if (!progNewQuestionText.trim()) return;
    setProgCustomQuestions((prev) => [...prev, progNewQuestionText.trim()]);
    setProgNewQuestionText("");
  };

  const handleRemoveProgQuestion = (index: number) => {
    setProgCustomQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  // Service Deliverables Helpers
  const handleAddDeliverable = () => {
    if (!servNewDeliverableText.trim()) return;
    setServDeliverables((prev) => [...prev, servNewDeliverableText.trim()]);
    setServNewDeliverableText("");
  };

  const handleRemoveDeliverable = (index: number) => {
    setServDeliverables((prev) => prev.filter((_, i) => i !== index));
  };

  // Service Form Question Helpers
  const handleAddServQuestion = () => {
    if (!servNewQuestionText.trim()) return;
    setServCustomQuestions((prev) => [...prev, servNewQuestionText.trim()]);
    setServNewQuestionText("");
  };

  const handleRemoveServQuestion = (index: number) => {
    setServCustomQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  // Create Program
  const handleCreateProgram = (e: React.FormEvent) => {
    e.preventDefault();
    if (!progTitle.trim() || !progDuration.trim()) return;

    const curriculumArray = progCurriculum
      .split("\n")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const tuitionNum = parseFloat(progTuition) || 0;

    startTransition(async () => {
      const res = await createTrainingProgramAction({
        title: progTitle,
        level: progLevel,
        duration: progDuration,
        tuition_etb: tuitionNum,
        description: progDesc,
        curriculum: curriculumArray,
        has_application_form: true,
        form_config: {
          ask_email: progAskEmail,
          ask_experience: progAskExperience,
          ask_organization: progAskOrganization,
          ask_notes: progAskNotes,
          custom_questions: progCustomQuestions,
        },
      });

      if (res.success && res.data) {
        setPrograms((prev) => [
          {
            ...res.data,
            schedules: [],
            applicants: [],
            applicant_count: 0,
          },
          ...prev,
        ]);
        setShowNewProgramModal(false);
        setProgTitle("");
        setProgDuration("");
        setProgTuition("");
        setProgDesc("");
        setProgCurriculum("");
        setProgCustomQuestions([]);
      } else {
        alert(res.error || "Failed to create program.");
      }
    });
  };

  // Create Service Package
  const handleCreateServicePackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!servTitle.trim() || !servCategory.trim()) return;

    const priceNum = parseFloat(servPriceEtb) || 0;

    startTransition(async () => {
      const res = await createServicePackageAction({
        title: servTitle,
        category: servCategory,
        description: servDesc,
        price_etb: priceNum,
        pricing_model: servPricingModel,
        timeline: servTimeline || "Flexible",
        deliverables: servDeliverables,
        has_booking_form: true,
        form_config: {
          ask_email: servAskEmail,
          ask_business: servAskBusiness,
          ask_location: servAskLocation,
          ask_timeline: servAskTimeline,
          ask_notes: servAskNotes,
          custom_questions: servCustomQuestions,
        },
      });

      if (res.success && res.data) {
        setServicePackages((prev) => [
          {
            ...res.data,
            bookings: [],
            booking_count: 0,
          },
          ...prev,
        ]);
        setShowNewServiceModal(false);
        setServTitle("");
        setServPriceEtb("");
        setServTimeline("");
        setServDesc("");
        setServDeliverables([]);
        setServCustomQuestions([]);
      } else {
        alert(res.error || "Failed to create service package.");
      }
    });
  };

  // Create Cohort Schedule
  const handleCreateCohort = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProgramForCohort || !cohortStartDate || !cohortEndDate) return;

    startTransition(async () => {
      const res = await createCohortScheduleAction({
        program_id: selectedProgramForCohort.id,
        start_date: cohortStartDate,
        end_date: cohortEndDate,
        session_time: cohortTime,
        seats_total: parseInt(cohortSeats) || 8,
      });

      if (res.success && res.data) {
        setPrograms((prev) =>
          prev.map((p) => {
            if (p.id === selectedProgramForCohort.id) {
              return {
                ...p,
                schedules: [...p.schedules, res.data],
              };
            }
            return p;
          })
        );
        setSelectedProgramForCohort(null);
        setCohortStartDate("");
        setCohortEndDate("");
      } else {
        alert(res.error || "Failed to schedule cohort.");
      }
    });
  };

  // Cohort Status Toggle
  const handleToggleCohortStatus = (programId: string, cohort: Cohort) => {
    const nextStatus = cohort.status === "open" ? "closed" : "open";
    startTransition(async () => {
      await updateCohortScheduleAction(cohort.id, { status: nextStatus });
      setPrograms((prev) =>
        prev.map((p) => {
          if (p.id === programId) {
            return {
              ...p,
              schedules: p.schedules.map((s) => (s.id === cohort.id ? { ...s, status: nextStatus } : s)),
            };
          }
          return p;
        })
      );
    });
  };

  // Delete Cohort Schedule
  const handleDeleteCohort = (programId: string, cohortId: string) => {
    if (!confirm("Are you sure you want to remove this cohort schedule?")) return;
    startTransition(async () => {
      await deleteCohortScheduleAction(cohortId);
      setPrograms((prev) =>
        prev.map((p) => {
          if (p.id === programId) {
            return {
              ...p,
              schedules: p.schedules.filter((s) => s.id !== cohortId),
            };
          }
          return p;
        })
      );
    });
  };

  // Update Applicant Status
  const handleUpdateApplicantStatus = (programId: string, applicantId: string, newStatus: string) => {
    setPrograms((prev) =>
      prev.map((p) => {
        if (p.id === programId) {
          return {
            ...p,
            applicants: (p.applicants || []).map((a) => (a.id === applicantId ? { ...a, status: newStatus } : a)),
          };
        }
        return p;
      })
    );
    startTransition(async () => {
      await updateAcademyApplicantStatusAction(applicantId, newStatus);
    });
  };

  // Delete Applicant
  const handleDeleteApplicant = (applicantId: string) => {
    if (!confirm("Are you sure you want to remove this student record?")) return;
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

  // Update Service Booking Status
  const handleUpdateServiceBookingStatus = (packageId: string, bookingId: string, newStatus: string) => {
    setServicePackages((prev) =>
      prev.map((pkg) => {
        if (pkg.id === packageId) {
          return {
            ...pkg,
            bookings: (pkg.bookings || []).map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b)),
          };
        }
        return pkg;
      })
    );
    startTransition(async () => {
      await updateServiceBookingStatusAction(bookingId, newStatus);
    });
  };

  // Delete Service Booking
  const handleDeleteServiceBooking = (packageId: string, bookingId: string) => {
    if (!confirm("Are you sure you want to delete this service booking record?")) return;
    setServicePackages((prev) =>
      prev.map((pkg) => {
        if (pkg.id === packageId) {
          return {
            ...pkg,
            bookings: (pkg.bookings || []).filter((b) => b.id !== bookingId),
            booking_count: Math.max(0, (pkg.booking_count || 1) - 1),
          };
        }
        return pkg;
      })
    );
    startTransition(async () => {
      await deleteServiceBookingAction(bookingId);
    });
  };

  // Delete Service Package
  const handleDeleteServicePackage = (packageId: string) => {
    if (!confirm("Are you sure you want to remove this service package?")) return;
    setServicePackages((prev) => prev.filter((p) => p.id !== packageId));
    startTransition(async () => {
      await deleteServicePackageAction(packageId);
    });
  };

  const formatPriceDisplay = (pkg: ServicePackageItem) => {
    const formattedNum = Number(pkg.price_etb || 0).toLocaleString();
    switch (pkg.pricing_model) {
      case "starting_from":
        return `Starting from ETB ${formattedNum}`;
      case "per_day":
        return `ETB ${formattedNum} / Day`;
      case "custom_quote":
        return "Custom Quote";
      case "fixed":
      default:
        return `ETB ${formattedNum}`;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Operator Step-by-Step Guide */}
      <div className="p-4 rounded-xl bg-surface-container-lowest border border-surface-container-highest shadow-sm flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded bg-stitch-primary text-white flex items-center justify-center text-xs font-bold shrink-0">
            ?
          </span>
          <h2 className="font-semibold text-xs text-stitch-primary uppercase tracking-wider">
            Step-by-Step Guide: Managing Services, Courses, Prices &amp; Inquiries
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
          <div className="p-3 rounded-lg bg-surface-container-low border border-surface-container-highest flex items-start gap-2.5">
            <span className="w-5 h-5 rounded bg-stitch-primary text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
              1
            </span>
            <div className="flex flex-col">
              <span className="font-bold text-on-surface">Post Training or Service</span>
              <span className="text-[11px] text-on-surface-variant mt-0.5 leading-relaxed">
                Click <strong>+ Add New...</strong> to choose between publishing a Barista Course or a Commercial Service Package with custom pricing.
              </span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-surface-container-low border border-surface-container-highest flex items-start gap-2.5">
            <span className="w-5 h-5 rounded bg-stitch-secondary text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
              2
            </span>
            <div className="flex flex-col">
              <span className="font-bold text-on-surface">Publish Scope &amp; Dates</span>
              <span className="text-[11px] text-on-surface-variant mt-0.5 leading-relaxed">
                Define deliverables, pricing models, and cohort schedules. Forms appear instantly on the public website for clients to book.
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
                Expand applicants on any card or switch to <strong>All Registrations &amp; Bookings</strong> to export clean Excel spreadsheets.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header with 3 Tabs & Primary Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface-container-lowest p-4 rounded-xl border border-surface-container-highest shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          {/* Tab 1: Training Programs */}
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
            <span>Training Programs ({programs.length})</span>
          </button>

          {/* Tab 2: Service Packages */}
          <button
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "services"
                ? "bg-stitch-primary text-white shadow-xs"
                : "bg-surface-container-low text-on-surface-variant hover:text-stitch-primary hover:bg-surface-container"
            }`}
            type="button"
            onClick={() => setActiveTab("services")}
          >
            <span className="material-symbols-outlined text-sm">design_services</span>
            <span>Service Packages ({servicePackages.length})</span>
          </button>

          {/* Tab 3: Unified Registrations & Bookings */}
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
            <span>All Registrations &amp; Bookings ({combinedEntries.length})</span>
          </button>
        </div>

        {/* Primary Action Button */}
        <button
          className="px-4 py-2 bg-stitch-primary text-white text-xs font-bold rounded-lg hover:bg-stitch-primary/90 transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95 shrink-0"
          type="button"
          onClick={() => setShowChoiceModal(true)}
        >
          <span className="material-symbols-outlined text-base">add_circle</span>
          <span>+ Add New...</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: TRAINING PROGRAMS & COHORTS */}
      {/* ========================================================================= */}
      {activeTab === "courses" && (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((prog) => {
              const isExpanded = expandedApplicantsProgramId === prog.id;
              const applicantsList = prog.applicants || [];

              return (
                <div
                  key={prog.id}
                  className="bg-surface-container-lowest border border-surface-container-highest rounded-2xl p-5 flex flex-col justify-between shadow-xs hover:border-stitch-primary/30 transition-all gap-5"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-stitch-secondary tracking-wider uppercase">
                        {prog.level} Level
                      </span>
                      <span className="text-xs font-semibold text-on-surface-variant">
                        {prog.duration}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-serif text-lg font-bold text-on-surface">{prog.title}</h3>
                      <p className="text-xs text-on-surface-variant line-clamp-2 mt-1">
                        {prog.description || "Comprehensive hands-on barista calibration & sensory curriculum."}
                      </p>
                    </div>

                    <div className="p-3 bg-surface-container-low rounded-xl flex items-baseline justify-between border border-surface-container-highest">
                      <span className="text-xs text-on-surface-variant font-medium">Tuition:</span>
                      <span className="font-serif font-bold text-stitch-primary text-base">
                        {prog.tuition_etb > 0 ? `${prog.tuition_etb.toLocaleString()} ETB` : "Contact for Tuition"}
                      </span>
                    </div>

                    {/* Cohort Schedules List */}
                    <div className="flex flex-col gap-2 pt-1">
                      <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
                        Active Cohorts ({prog.schedules.length})
                      </span>

                      {prog.schedules.length === 0 ? (
                        <p className="text-[11px] text-outline italic">No upcoming cohort dates scheduled yet.</p>
                      ) : (
                        <div className="flex flex-col gap-1.5">
                          {prog.schedules.map((cohort) => (
                            <div
                              key={cohort.id}
                              className="p-2.5 rounded-lg bg-surface-container-low border border-surface-container-highest flex items-center justify-between text-xs"
                            >
                              <div className="flex flex-col">
                                <span className="font-semibold text-on-surface">
                                  {new Date(cohort.start_date).toLocaleDateString()} – {new Date(cohort.end_date).toLocaleDateString()}
                                </span>
                                <span className="text-[10px] text-on-surface-variant">
                                  Seats: {cohort.seats_booked || 0} / {cohort.seats_total} booked
                                </span>
                              </div>

                              <div className="flex items-center gap-1.5">
                                <button
                                  className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                    cohort.status === "open"
                                      ? "bg-stitch-primary/10 text-stitch-primary"
                                      : "bg-surface-container text-outline"
                                  }`}
                                  type="button"
                                  onClick={() => handleToggleCohortStatus(prog.id, cohort)}
                                >
                                  {cohort.status === "open" ? "Open" : "Closed"}
                                </button>
                                <button
                                  className="text-outline hover:text-stitch-error transition-colors p-1"
                                  title="Delete cohort"
                                  type="button"
                                  onClick={() => handleDeleteCohort(prog.id, cohort.id)}
                                >
                                  <span className="material-symbols-outlined text-sm">delete</span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions & Applicant Drawer Trigger */}
                  <div className="flex flex-col gap-2 pt-2 border-t border-surface-container-highest">
                    <div className="flex items-center gap-2">
                      <button
                        className="flex-1 py-2 bg-surface-container-low hover:bg-surface-container text-stitch-primary font-bold text-xs rounded-xl transition-all border border-surface-container-highest flex items-center justify-center gap-1.5"
                        type="button"
                        onClick={() => setSelectedProgramForCohort(prog)}
                      >
                        <span className="material-symbols-outlined text-sm">calendar_month</span>
                        <span>+ Add Dates</span>
                      </button>

                      <button
                        className="px-3 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 border border-amber-500/20 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1"
                        title="Download applicants as Excel .xlsx"
                        type="button"
                        onClick={() => exportProgramApplicantsToExcel(prog.title, applicantsList)}
                      >
                        <span className="material-symbols-outlined text-sm">file_download</span>
                        <span>Export Excel</span>
                      </button>
                    </div>

                    <button
                      className="w-full py-2 bg-surface-container-low hover:bg-stitch-primary hover:text-white text-on-surface font-semibold text-xs rounded-xl transition-all border border-surface-container-highest flex items-center justify-between px-3"
                      type="button"
                      onClick={() => setExpandedApplicantsProgramId(isExpanded ? null : prog.id)}
                    >
                      <span className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-sm">group</span>
                        <span>Applicants ( {prog.applicant_count || applicantsList.length} )</span>
                      </span>
                      <span className="material-symbols-outlined text-sm transition-transform duration-200">
                        {isExpanded ? "expand_less" : "expand_more"}
                      </span>
                    </button>

                    {/* Expandable Applicant Table Drawer */}
                    {isExpanded && (
                      <div className="mt-2 p-3 bg-surface-container-low border border-surface-container-highest rounded-xl flex flex-col gap-2.5">
                        {applicantsList.length === 0 ? (
                          <p className="text-xs text-outline italic text-center py-2">
                            No students registered for this course yet.
                          </p>
                        ) : (
                          <div className="flex flex-col gap-2">
                            {applicantsList.map((app) => (
                              <div
                                key={app.id}
                                className="p-2.5 rounded-lg bg-surface-container-lowest border border-surface-container-highest flex flex-col gap-1.5 text-xs"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-bold text-on-surface">{app.student_name}</span>
                                  <select
                                    className="text-[10px] font-semibold bg-surface-container-low border border-surface-container-highest rounded px-1.5 py-0.5 focus:outline-none"
                                    value={app.status || "pending"}
                                    onChange={(e) => handleUpdateApplicantStatus(prog.id, app.id, e.target.value)}
                                  >
                                    <option value="pending">Pending</option>
                                    <option value="confirmed">Confirmed</option>
                                    <option value="contacted">Contacted</option>
                                    <option value="cancelled">Cancelled</option>
                                  </select>
                                </div>

                                <div className="flex items-center gap-2 text-[11px] text-on-surface-variant">
                                  <span>{app.phone}</span>
                                  {app.email && <span>• {app.email}</span>}
                                </div>

                                <div className="flex items-center justify-between pt-1 border-t border-surface-container-highest">
                                  <a
                                    className="text-[10px] font-bold text-stitch-primary hover:underline flex items-center gap-1"
                                    href={`https://wa.me/${app.phone.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(app.student_name)}!%20Reaching%20out%20from%20Ethiopian%20Signature%20Coffee%20regarding%20your%20registration%20for%20${encodeURIComponent(prog.title)}.`}
                                    rel="noreferrer"
                                    target="_blank"
                                  >
                                    <span className="material-symbols-outlined text-xs text-[#25D366]">chat</span>
                                    <span>Chat on WhatsApp</span>
                                  </a>

                                  <button
                                    className="text-outline hover:text-stitch-error transition-colors"
                                    title="Delete applicant"
                                    type="button"
                                    onClick={() => handleDeleteApplicant(app.id)}
                                  >
                                    <span className="material-symbols-outlined text-xs">delete</span>
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: SERVICE PACKAGES & PRICING */}
      {/* ========================================================================= */}
      {activeTab === "services" && (
        <div className="flex flex-col gap-6">
          {servicePackages.length === 0 ? (
            <div className="p-12 text-center bg-surface-container-lowest border border-surface-container-highest rounded-2xl flex flex-col items-center justify-center gap-3">
              <span className="material-symbols-outlined text-4xl text-outline">design_services</span>
              <h3 className="font-serif text-lg font-bold text-on-surface">No Service Packages Added Yet</h3>
              <p className="text-xs text-on-surface-variant max-w-sm">
                Create commercial service packages with transparent pricing, project timelines, and custom client booking forms.
              </p>
              <button
                className="mt-2 px-4 py-2 bg-stitch-primary text-white text-xs font-bold rounded-lg hover:bg-stitch-primary/90 transition-all flex items-center gap-1.5"
                type="button"
                onClick={() => setShowNewServiceModal(true)}
              >
                <span className="material-symbols-outlined text-sm">add</span>
                <span>Post First Service Package</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {servicePackages.map((pkg) => {
                const isExpanded = expandedBookingsPackageId === pkg.id;
                const bookingsList = pkg.bookings || [];

                return (
                  <div
                    key={pkg.id}
                    className="bg-surface-container-lowest border border-surface-container-highest rounded-2xl p-5 flex flex-col justify-between shadow-xs hover:border-stitch-primary/30 transition-all gap-5"
                  >
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-stitch-secondary tracking-wider uppercase">
                          {pkg.category}
                        </span>
                        {pkg.timeline && (
                          <span className="text-xs font-semibold text-on-surface-variant bg-surface-container-low px-2 py-0.5 rounded border border-surface-container-highest">
                            {pkg.timeline}
                          </span>
                        )}
                      </div>

                      <div>
                        <h3 className="font-serif text-lg font-bold text-on-surface">{pkg.title}</h3>
                        <p className="text-xs text-on-surface-variant line-clamp-2 mt-1">
                          {pkg.description || "Commercial specialty advisory package."}
                        </p>
                      </div>

                      {/* Pricing Tag */}
                      <div className="p-3 bg-surface-container-low rounded-xl flex items-baseline justify-between border border-surface-container-highest">
                        <span className="text-xs text-on-surface-variant font-medium">Pricing:</span>
                        <span className="font-serif font-bold text-stitch-primary text-base">
                          {formatPriceDisplay(pkg)}
                        </span>
                      </div>

                      {/* Deliverables Preview */}
                      {pkg.deliverables && pkg.deliverables.length > 0 && (
                        <div className="flex flex-col gap-1.5 pt-1">
                          <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
                            Scope Deliverables ({pkg.deliverables.length}):
                          </span>
                          <div className="flex flex-col gap-1">
                            {pkg.deliverables.slice(0, 3).map((d, dIdx) => (
                              <div key={dIdx} className="flex items-start gap-1.5 text-xs text-on-surface">
                                <span className="material-symbols-outlined text-xs text-stitch-primary shrink-0 mt-0.5">
                                  check_circle
                                </span>
                                <span className="line-clamp-1">{d}</span>
                              </div>
                            ))}
                            {pkg.deliverables.length > 3 && (
                              <span className="text-[10px] text-outline pl-4">
                                + {pkg.deliverables.length - 3} more scope items
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Actions & Bookings Drawer */}
                    <div className="flex flex-col gap-2 pt-2 border-t border-surface-container-highest">
                      <div className="flex items-center gap-2">
                        <button
                          className="flex-1 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 border border-amber-500/20 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1"
                          title="Download bookings as Excel .xlsx"
                          type="button"
                          onClick={() => exportServiceBookingsToExcel(pkg.title, bookingsList)}
                        >
                          <span className="material-symbols-outlined text-sm">file_download</span>
                          <span>Export Excel</span>
                        </button>

                        <button
                          className="p-2 text-outline hover:text-stitch-error transition-colors rounded-xl border border-surface-container-highest hover:bg-surface-container"
                          title="Delete package"
                          type="button"
                          onClick={() => handleDeleteServicePackage(pkg.id)}
                        >
                          <span className="material-symbols-outlined text-base">delete</span>
                        </button>
                      </div>

                      <button
                        className="w-full py-2 bg-surface-container-low hover:bg-stitch-primary hover:text-white text-on-surface font-semibold text-xs rounded-xl transition-all border border-surface-container-highest flex items-center justify-between px-3"
                        type="button"
                        onClick={() => setExpandedBookingsPackageId(isExpanded ? null : pkg.id)}
                      >
                        <span className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-sm">receipt_long</span>
                          <span>Bookings &amp; Inquiries ( {pkg.booking_count || bookingsList.length} )</span>
                        </span>
                        <span className="material-symbols-outlined text-sm transition-transform duration-200">
                          {isExpanded ? "expand_less" : "expand_more"}
                        </span>
                      </button>

                      {/* Expandable Bookings Table Drawer */}
                      {isExpanded && (
                        <div className="mt-2 p-3 bg-surface-container-low border border-surface-container-highest rounded-xl flex flex-col gap-2.5">
                          {bookingsList.length === 0 ? (
                            <p className="text-xs text-outline italic text-center py-2">
                              No client bookings received for this package yet.
                            </p>
                          ) : (
                            <div className="flex flex-col gap-2">
                              {bookingsList.map((book: any) => (
                                <div
                                  key={book.id}
                                  className="p-2.5 rounded-lg bg-surface-container-lowest border border-surface-container-highest flex flex-col gap-1.5 text-xs"
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="font-bold text-on-surface">{book.client_name}</span>
                                    <select
                                      className="text-[10px] font-semibold bg-surface-container-low border border-surface-container-highest rounded px-1.5 py-0.5 focus:outline-none"
                                      value={book.status || "new"}
                                      onChange={(e) => handleUpdateServiceBookingStatus(pkg.id, book.id, e.target.value)}
                                    >
                                      <option value="new">New</option>
                                      <option value="contacted">Contacted</option>
                                      <option value="proposal_sent">Proposal Sent</option>
                                      <option value="confirmed">Confirmed</option>
                                      <option value="completed">Completed</option>
                                      <option value="cancelled">Cancelled</option>
                                    </select>
                                  </div>

                                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-on-surface-variant">
                                    <span>{book.phone}</span>
                                    {book.business_name && <span>• {book.business_name}</span>}
                                    {book.venue_location && <span>• {book.venue_location}</span>}
                                  </div>

                                  {book.notes && (
                                    <p className="text-[11px] text-on-surface bg-surface-container-low p-1.5 rounded italic">
                                      &ldquo;{book.notes}&rdquo;
                                    </p>
                                  )}

                                  <div className="flex items-center justify-between pt-1 border-t border-surface-container-highest">
                                    <a
                                      className="text-[10px] font-bold text-stitch-primary hover:underline flex items-center gap-1"
                                      href={`https://wa.me/${book.phone.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(book.client_name)}!%20Reaching%20out%20from%20Ethiopian%20Signature%20Coffee%20regarding%20your%20inquiry%20for%20the%20${encodeURIComponent(pkg.title)}%20package.`}
                                      rel="noreferrer"
                                      target="_blank"
                                    >
                                      <span className="material-symbols-outlined text-xs text-[#25D366]">chat</span>
                                      <span>Chat on WhatsApp</span>
                                    </a>

                                    <button
                                      className="text-outline hover:text-stitch-error transition-colors"
                                      title="Delete booking"
                                      type="button"
                                      onClick={() => handleDeleteServiceBooking(pkg.id, book.id)}
                                    >
                                      <span className="material-symbols-outlined text-xs">delete</span>
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: ALL REGISTRATIONS & BOOKINGS (MASTER CRM) */}
      {/* ========================================================================= */}
      {activeTab === "applicants" && (
        <div className="flex flex-col gap-4 bg-surface-container-lowest p-5 rounded-2xl border border-surface-container-highest shadow-xs">
          {/* Controls Bar */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 flex-1">
              {/* Search */}
              <div className="relative flex-1">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-sm text-outline">
                  search
                </span>
                <input
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-surface-container-low border border-surface-container-highest text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-stitch-primary"
                  placeholder="Search students, clients, phone, business..."
                  type="text"
                  value={unifiedSearch}
                  onChange={(e) => setUnifiedSearch(e.target.value)}
                />
              </div>

              {/* Type Filter */}
              <select
                className="px-3 py-2 text-xs rounded-xl bg-surface-container-low border border-surface-container-highest text-on-surface focus:outline-none font-medium"
                value={unifiedTypeFilter}
                onChange={(e: any) => setUnifiedTypeFilter(e.target.value)}
              >
                <option value="all">All Offerings</option>
                <option value="training">Training Courses</option>
                <option value="service">Service Packages</option>
              </select>

              {/* Status Filter */}
              <select
                className="px-3 py-2 text-xs rounded-xl bg-surface-container-low border border-surface-container-highest text-on-surface focus:outline-none font-medium"
                value={unifiedStatusFilter}
                onChange={(e) => setUnifiedStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending / New</option>
                <option value="confirmed">Confirmed</option>
                <option value="contacted">Contacted</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Master Excel Export Button */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                className="px-4 py-2 bg-stitch-primary text-white text-xs font-bold rounded-xl hover:bg-stitch-primary/90 transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                type="button"
                onClick={() => {
                  if (unifiedTypeFilter === "service") {
                    exportAllServiceBookingsToExcel(allServiceBookings);
                  } else if (unifiedTypeFilter === "training") {
                    exportAllApplicantsToExcel(allApplicants);
                  } else {
                    // Export both
                    exportAllApplicantsToExcel(allApplicants);
                    exportAllServiceBookingsToExcel(allServiceBookings);
                  }
                }}
              >
                <span className="material-symbols-outlined text-base">file_download</span>
                <span>Export All to Excel (.xlsx)</span>
              </button>
            </div>
          </div>

          {/* Master Table */}
          <div className="overflow-x-auto border border-surface-container-highest rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-container-low border-b border-surface-container-highest text-on-surface-variant font-bold">
                <tr>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Client / Student</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Program / Package</th>
                  <th className="py-3 px-4">Details</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-highest">
                {filteredCombinedEntries.length === 0 ? (
                  <tr>
                    <td className="py-8 text-center text-outline italic" colSpan={8}>
                      No registrations or client bookings matched your search filter.
                    </td>
                  </tr>
                ) : (
                  filteredCombinedEntries.map((row) => (
                    <tr key={`${row.kind}_${row.id}`} className="hover:bg-surface-container-low/50 transition-colors">
                      <td className="py-3 px-4">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                            row.kind === "training"
                              ? "bg-stitch-primary/10 text-stitch-primary"
                              : "bg-stitch-secondary/15 text-stitch-secondary"
                          }`}
                        >
                          {row.kind === "training" ? "Training" : "Service"}
                        </span>
                      </td>

                      <td className="py-3 px-4 font-bold text-on-surface">
                        {row.name}
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex flex-col">
                          <span>{row.phone}</span>
                          {row.email && <span className="text-[10px] text-outline">{row.email}</span>}
                        </div>
                      </td>

                      <td className="py-3 px-4 font-medium text-stitch-primary">
                        {row.offeringTitle}
                      </td>

                      <td className="py-3 px-4 text-on-surface-variant">
                        {row.secondaryInfo}
                      </td>

                      <td className="py-3 px-4 text-on-surface-variant">
                        {new Date(row.date).toLocaleDateString()}
                      </td>

                      <td className="py-3 px-4">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-surface-container text-on-surface uppercase">
                          {row.status}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <a
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-[#25D366] hover:underline"
                          href={`https://wa.me/${row.phone.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(row.name)}!%20Reaching%20out%20from%20Ethiopian%20Signature%20Coffee%20regarding%20your%20inquiry.`}
                          rel="noreferrer"
                          target="_blank"
                        >
                          <span className="material-symbols-outlined text-sm">chat</span>
                          <span>WhatsApp</span>
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: WHAT WOULD YOU LIKE TO CREATE CHOICE MODAL */}
      {/* ========================================================================= */}
      {showChoiceModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-surface-container-lowest border border-surface-container-highest rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col gap-6">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-stitch-secondary uppercase tracking-wider">
                  Select Offering Type
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-on-surface">
                  What would you like to create?
                </h3>
              </div>
              <button
                className="text-outline hover:text-on-surface p-1 rounded-lg"
                type="button"
                onClick={() => setShowChoiceModal(false)}
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Choice A: Training Program */}
              <button
                className="p-5 rounded-xl border border-surface-container-highest bg-surface-container-low hover:bg-surface-container hover:border-stitch-primary/40 text-left transition-all flex flex-col justify-between gap-3 group"
                type="button"
                onClick={() => {
                  setShowChoiceModal(false);
                  setShowNewProgramModal(true);
                }}
              >
                <div className="w-10 h-10 rounded-xl bg-stitch-primary/10 text-stitch-primary flex items-center justify-center group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-2xl">school</span>
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-on-surface group-hover:text-stitch-primary">
                    Training Course
                  </h4>
                  <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                    Barista academy curriculum, course levels, cohort class dates, and student registration forms.
                  </p>
                </div>
              </button>

              {/* Choice B: Service Package */}
              <button
                className="p-5 rounded-xl border border-surface-container-highest bg-surface-container-low hover:bg-surface-container hover:border-stitch-primary/40 text-left transition-all flex flex-col justify-between gap-3 group"
                type="button"
                onClick={() => {
                  setShowChoiceModal(false);
                  setShowNewServiceModal(true);
                }}
              >
                <div className="w-10 h-10 rounded-xl bg-stitch-secondary/15 text-stitch-secondary flex items-center justify-center group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-2xl">design_services</span>
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-on-surface group-hover:text-stitch-primary">
                    Service Package
                  </h4>
                  <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                    Commercial advisory packages, transparent ETB pricing, project timelines, deliverables, and client booking forms.
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: NEW SERVICE PACKAGE CREATOR MODAL */}
      {/* ========================================================================= */}
      {showNewServiceModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-surface-container-lowest border border-surface-container-highest rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col gap-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-surface-container-highest pb-4">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-stitch-secondary uppercase tracking-wider">
                  New Commercial Offering
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-on-surface">
                  Publish New Service Package &amp; Price
                </h3>
              </div>
              <button
                className="text-outline hover:text-on-surface p-1 rounded-lg"
                type="button"
                onClick={() => setShowNewServiceModal(false)}
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <form className="flex flex-col gap-5" onSubmit={handleCreateServicePackage}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Title */}
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-on-surface">Service Package Title *</label>
                  <input
                    required
                    className="px-3.5 py-2.5 text-xs rounded-xl bg-surface-container-low border border-surface-container-highest text-on-surface focus:outline-none focus:ring-1 focus:ring-stitch-primary"
                    placeholder="e.g. Turnkey Café Setup & Organization"
                    type="text"
                    value={servTitle}
                    onChange={(e) => setServTitle(e.target.value)}
                  />
                </div>

                {/* Category */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-on-surface">Practice Category *</label>
                  <select
                    className="px-3.5 py-2.5 text-xs rounded-xl bg-surface-container-low border border-surface-container-highest text-on-surface focus:outline-none focus:ring-1 focus:ring-stitch-primary font-medium"
                    value={servCategory}
                    onChange={(e) => setServCategory(e.target.value)}
                  >
                    {SERVICE_CATEGORIES.map((cat, idx) => (
                      <option key={idx} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Pricing Model */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-on-surface">Pricing Model *</label>
                  <select
                    className="px-3.5 py-2.5 text-xs rounded-xl bg-surface-container-low border border-surface-container-highest text-on-surface focus:outline-none focus:ring-1 focus:ring-stitch-primary font-medium"
                    value={servPricingModel}
                    onChange={(e: any) => setServPricingModel(e.target.value)}
                  >
                    <option value="fixed">Fixed Price (ETB)</option>
                    <option value="starting_from">Starting From (ETB)</option>
                    <option value="per_day">Per Day / Event (ETB)</option>
                    <option value="custom_quote">Custom Quote (Contact Us)</option>
                  </select>
                </div>

                {/* Price (ETB) */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-on-surface">
                    Price (ETB) {servPricingModel === "custom_quote" && "(Optional)"}
                  </label>
                  <input
                    className="px-3.5 py-2.5 text-xs rounded-xl bg-surface-container-low border border-surface-container-highest text-on-surface focus:outline-none focus:ring-1 focus:ring-stitch-primary"
                    disabled={servPricingModel === "custom_quote"}
                    placeholder="e.g. 45000"
                    type="number"
                    value={servPriceEtb}
                    onChange={(e) => setServPriceEtb(e.target.value)}
                  />
                </div>

                {/* Project Timeline */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-on-surface">Project Timeline</label>
                  <input
                    className="px-3.5 py-2.5 text-xs rounded-xl bg-surface-container-low border border-surface-container-highest text-on-surface focus:outline-none focus:ring-1 focus:ring-stitch-primary"
                    placeholder="e.g. 4–6 Weeks, 3 Days, Per Event"
                    type="text"
                    value={servTimeline}
                    onChange={(e) => setServTimeline(e.target.value)}
                  />
                </div>

                {/* Description */}
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-on-surface">Executive Overview &amp; Description</label>
                  <textarea
                    className="px-3.5 py-2.5 text-xs rounded-xl bg-surface-container-low border border-surface-container-highest text-on-surface focus:outline-none focus:ring-1 focus:ring-stitch-primary resize-none"
                    placeholder="Provide a clear description of the service scope, outcomes, and value for café owners..."
                    rows={3}
                    value={servDesc}
                    onChange={(e) => setServDesc(e.target.value)}
                  />
                </div>
              </div>

              {/* Dynamic Deliverables Builder */}
              <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container-highest flex flex-col gap-3">
                <label className="text-xs font-bold text-on-surface">
                  Included Scope &amp; Deliverables Checklist
                </label>
                <div className="flex items-center gap-2">
                  <input
                    className="flex-1 px-3 py-2 text-xs rounded-lg bg-surface-container-lowest border border-surface-container-highest text-on-surface focus:outline-none focus:ring-1 focus:ring-stitch-primary"
                    placeholder="e.g. High-volume bar layout & ergonomics plan"
                    type="text"
                    value={servNewDeliverableText}
                    onChange={(e) => setServNewDeliverableText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddDeliverable();
                      }
                    }}
                  />
                  <button
                    className="px-3.5 py-2 bg-stitch-primary text-white text-xs font-bold rounded-lg hover:bg-stitch-primary/90 transition-all shrink-0"
                    type="button"
                    onClick={handleAddDeliverable}
                  >
                    + Add Scope Item
                  </button>
                </div>

                {servDeliverables.length > 0 && (
                  <div className="flex flex-col gap-1.5 pt-1">
                    {servDeliverables.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2 rounded-lg bg-surface-container-lowest border border-surface-container-highest text-xs"
                      >
                        <span className="flex items-center gap-1.5 text-on-surface">
                          <span className="material-symbols-outlined text-xs text-stitch-primary">check_circle</span>
                          <span>{item}</span>
                        </span>
                        <button
                          className="text-outline hover:text-stitch-error"
                          type="button"
                          onClick={() => handleRemoveDeliverable(idx)}
                        >
                          <span className="material-symbols-outlined text-xs">close</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Form Builder Configuration */}
              <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container-highest flex flex-col gap-3">
                <span className="text-xs font-bold text-stitch-primary uppercase tracking-wider">
                  Client Booking Form Configuration (What Visitors Will Fill)
                </span>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  Toggle the questions you want to ask when clients click &quot;Book Service Package&quot; on the website:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-surface-container-lowest border border-surface-container-highest cursor-pointer">
                    <input
                      checked={servAskEmail}
                      className="rounded text-stitch-primary focus:ring-0"
                      type="checkbox"
                      onChange={(e) => setServAskEmail(e.target.checked)}
                    />
                    <span>Ask for Email Address</span>
                  </label>

                  <label className="flex items-center gap-2 p-2 rounded-lg bg-surface-container-lowest border border-surface-container-highest cursor-pointer">
                    <input
                      checked={servAskBusiness}
                      className="rounded text-stitch-primary focus:ring-0"
                      type="checkbox"
                      onChange={(e) => setServAskBusiness(e.target.checked)}
                    />
                    <span>Ask Café / Business Name</span>
                  </label>

                  <label className="flex items-center gap-2 p-2 rounded-lg bg-surface-container-lowest border border-surface-container-highest cursor-pointer">
                    <input
                      checked={servAskLocation}
                      className="rounded text-stitch-primary focus:ring-0"
                      type="checkbox"
                      onChange={(e) => setServAskLocation(e.target.checked)}
                    />
                    <span>Ask Venue City / Location</span>
                  </label>

                  <label className="flex items-center gap-2 p-2 rounded-lg bg-surface-container-lowest border border-surface-container-highest cursor-pointer">
                    <input
                      checked={servAskTimeline}
                      className="rounded text-stitch-primary focus:ring-0"
                      type="checkbox"
                      onChange={(e) => setServAskTimeline(e.target.checked)}
                    />
                    <span>Ask Target Start Timeline</span>
                  </label>

                  <label className="flex items-center gap-2 p-2 rounded-lg bg-surface-container-lowest border border-surface-container-highest cursor-pointer sm:col-span-2">
                    <input
                      checked={servAskNotes}
                      className="rounded text-stitch-primary focus:ring-0"
                      type="checkbox"
                      onChange={(e) => setServAskNotes(e.target.checked)}
                    />
                    <span>Ask Project Notes &amp; Specific Requirements</span>
                  </label>
                </div>

                {/* Custom Questions */}
                <div className="flex flex-col gap-2 pt-2 border-t border-surface-container-highest">
                  <span className="text-xs font-bold text-on-surface">Add Custom Project Question:</span>
                  <div className="flex items-center gap-2">
                    <input
                      className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-surface-container-lowest border border-surface-container-highest text-on-surface focus:outline-none"
                      placeholder="e.g. What espresso machine model are you using?"
                      type="text"
                      value={servNewQuestionText}
                      onChange={(e) => setServNewQuestionText(e.target.value)}
                    />
                    <button
                      className="px-3 py-1.5 bg-surface-container text-stitch-primary border border-surface-container-highest text-xs font-bold rounded-lg hover:bg-surface-container-highest transition-all shrink-0"
                      type="button"
                      onClick={handleAddServQuestion}
                    >
                      + Add Question
                    </button>
                  </div>

                  {servCustomQuestions.length > 0 && (
                    <div className="flex flex-col gap-1.5 pt-1">
                      {servCustomQuestions.map((q, qIdx) => (
                        <div
                          key={qIdx}
                          className="flex items-center justify-between p-2 rounded-lg bg-surface-container-lowest border border-surface-container-highest text-xs"
                        >
                          <span className="text-on-surface">{q}</span>
                          <button
                            className="text-outline hover:text-stitch-error"
                            type="button"
                            onClick={() => handleRemoveServQuestion(qIdx)}
                          >
                            <span className="material-symbols-outlined text-xs">close</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Action */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-surface-container-highest">
                <button
                  className="px-4 py-2 bg-surface-container-low text-on-surface-variant text-xs font-medium rounded-xl hover:bg-surface-container transition-all"
                  type="button"
                  onClick={() => setShowNewServiceModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-6 py-2.5 bg-stitch-primary text-white text-xs font-bold rounded-xl hover:bg-stitch-primary/90 transition-all shadow-sm"
                  disabled={isPending}
                  type="submit"
                >
                  {isPending ? "Publishing Package..." : "Publish Service Package"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: NEW TRAINING COURSE CREATOR MODAL (EXISTING) */}
      {/* ========================================================================= */}
      {showNewProgramModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-surface-container-lowest border border-surface-container-highest rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col gap-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-surface-container-highest pb-4">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-stitch-secondary uppercase tracking-wider">
                  Barista Academy Curriculum
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-on-surface">
                  Add New Training Course
                </h3>
              </div>
              <button
                className="text-outline hover:text-on-surface p-1 rounded-lg"
                type="button"
                onClick={() => setShowNewProgramModal(false)}
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <form className="flex flex-col gap-4" onSubmit={handleCreateProgram}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-on-surface">Course Title *</label>
                  <input
                    required
                    className="px-3.5 py-2 text-xs rounded-xl bg-surface-container-low border border-surface-container-highest text-on-surface focus:outline-none focus:ring-1 focus:ring-stitch-primary"
                    placeholder="e.g. Master Barista & Sensory Extraction"
                    type="text"
                    value={progTitle}
                    onChange={(e) => setProgTitle(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-on-surface">Skill Level *</label>
                  <select
                    className="px-3.5 py-2 text-xs rounded-xl bg-surface-container-low border border-surface-container-highest text-on-surface focus:outline-none font-medium"
                    value={progLevel}
                    onChange={(e) => setProgLevel(e.target.value)}
                  >
                    <option value="Foundation">Foundation</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Masterclass">Masterclass</option>
                    <option value="Executive">Executive</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-on-surface">Course Duration *</label>
                  <input
                    required
                    className="px-3.5 py-2 text-xs rounded-xl bg-surface-container-low border border-surface-container-highest text-on-surface focus:outline-none"
                    placeholder="e.g. 10 Days (40 Hours)"
                    type="text"
                    value={progDuration}
                    onChange={(e) => setProgDuration(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-on-surface">Tuition Fee (ETB)</label>
                  <input
                    className="px-3.5 py-2 text-xs rounded-xl bg-surface-container-low border border-surface-container-highest text-on-surface focus:outline-none"
                    placeholder="e.g. 14500"
                    type="number"
                    value={progTuition}
                    onChange={(e) => setProgTuition(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-on-surface">Course Overview</label>
                  <textarea
                    className="px-3.5 py-2 text-xs rounded-xl bg-surface-container-low border border-surface-container-highest text-on-surface focus:outline-none resize-none"
                    placeholder="Brief description of training competencies..."
                    rows={2}
                    value={progDesc}
                    onChange={(e) => setProgDesc(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-on-surface">
                    Curriculum Modules (one per line)
                  </label>
                  <textarea
                    className="px-3.5 py-2 text-xs rounded-xl bg-surface-container-low border border-surface-container-highest text-on-surface focus:outline-none font-mono text-[11px]"
                    placeholder="Coffee Agronomy & Green Evaluation&#10;Espresso Extraction Ratios&#10;Milk Chemistry & Steaming Physics"
                    rows={3}
                    value={progCurriculum}
                    onChange={(e) => setProgCurriculum(e.target.value)}
                  />
                </div>
              </div>

              {/* Form Builder Configuration */}
              <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container-highest flex flex-col gap-3">
                <span className="text-xs font-bold text-stitch-primary uppercase tracking-wider">
                  Application Form Builder (What Users Will Fill)
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-surface-container-lowest border border-surface-container-highest cursor-pointer">
                    <input
                      checked={progAskEmail}
                      className="rounded text-stitch-primary focus:ring-0"
                      type="checkbox"
                      onChange={(e) => setProgAskEmail(e.target.checked)}
                    />
                    <span>Ask for Email Address</span>
                  </label>

                  <label className="flex items-center gap-2 p-2 rounded-lg bg-surface-container-lowest border border-surface-container-highest cursor-pointer">
                    <input
                      checked={progAskExperience}
                      className="rounded text-stitch-primary focus:ring-0"
                      type="checkbox"
                      onChange={(e) => setProgAskExperience(e.target.checked)}
                    />
                    <span>Ask Experience Level</span>
                  </label>

                  <label className="flex items-center gap-2 p-2 rounded-lg bg-surface-container-lowest border border-surface-container-highest cursor-pointer">
                    <input
                      checked={progAskOrganization}
                      className="rounded text-stitch-primary focus:ring-0"
                      type="checkbox"
                      onChange={(e) => setProgAskOrganization(e.target.checked)}
                    />
                    <span>Ask Café / Organization</span>
                  </label>

                  <label className="flex items-center gap-2 p-2 rounded-lg bg-surface-container-lowest border border-surface-container-highest cursor-pointer">
                    <input
                      checked={progAskNotes}
                      className="rounded text-stitch-primary focus:ring-0"
                      type="checkbox"
                      onChange={(e) => setProgAskNotes(e.target.checked)}
                    />
                    <span>Ask Goals &amp; Questions Note</span>
                  </label>
                </div>

                <div className="flex flex-col gap-2 pt-2 border-t border-surface-container-highest">
                  <span className="text-xs font-bold text-on-surface">Add Custom Question:</span>
                  <div className="flex items-center gap-2">
                    <input
                      className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-surface-container-lowest border border-surface-container-highest text-on-surface focus:outline-none"
                      placeholder="e.g. Do you have prior espresso machine experience?"
                      type="text"
                      value={progNewQuestionText}
                      onChange={(e) => setProgNewQuestionText(e.target.value)}
                    />
                    <button
                      className="px-3 py-1.5 bg-surface-container text-stitch-primary border border-surface-container-highest text-xs font-bold rounded-lg hover:bg-surface-container-highest transition-all shrink-0"
                      type="button"
                      onClick={handleAddProgQuestion}
                    >
                      + Add
                    </button>
                  </div>

                  {progCustomQuestions.length > 0 && (
                    <div className="flex flex-col gap-1.5 pt-1">
                      {progCustomQuestions.map((q, qIdx) => (
                        <div
                          key={qIdx}
                          className="flex items-center justify-between p-2 rounded-lg bg-surface-container-lowest border border-surface-container-highest text-xs"
                        >
                          <span className="text-on-surface">{q}</span>
                          <button
                            className="text-outline hover:text-stitch-error"
                            type="button"
                            onClick={() => handleRemoveProgQuestion(qIdx)}
                          >
                            <span className="material-symbols-outlined text-xs">close</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-surface-container-highest">
                <button
                  className="px-4 py-2 bg-surface-container-low text-on-surface-variant text-xs font-medium rounded-xl hover:bg-surface-container transition-all"
                  type="button"
                  onClick={() => setShowNewProgramModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-6 py-2.5 bg-stitch-primary text-white text-xs font-bold rounded-xl hover:bg-stitch-primary/90 transition-all shadow-sm"
                  disabled={isPending}
                  type="submit"
                >
                  {isPending ? "Publishing Course..." : "Publish Course to Academy"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: SCHEDULE COHORT DATES MODAL (EXISTING) */}
      {/* ========================================================================= */}
      {selectedProgramForCohort && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-surface-container-lowest border border-surface-container-highest rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col gap-5">
            <div className="flex items-start justify-between border-b border-surface-container-highest pb-3">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-stitch-secondary uppercase tracking-wider">
                  Open New Class Session
                </span>
                <h3 className="font-serif text-lg font-bold text-on-surface">
                  {selectedProgramForCohort.title}
                </h3>
              </div>
              <button
                className="text-outline hover:text-on-surface p-1 rounded-lg"
                type="button"
                onClick={() => setSelectedProgramForCohort(null)}
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <form className="flex flex-col gap-4 text-xs" onSubmit={handleCreateCohort}>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-on-surface">Start Date *</label>
                  <input
                    required
                    className="px-3 py-2 rounded-xl bg-surface-container-low border border-surface-container-highest text-on-surface focus:outline-none"
                    type="date"
                    value={cohortStartDate}
                    onChange={(e) => setCohortStartDate(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-on-surface">End Date *</label>
                  <input
                    required
                    className="px-3 py-2 rounded-xl bg-surface-container-low border border-surface-container-highest text-on-surface focus:outline-none"
                    type="date"
                    value={cohortEndDate}
                    onChange={(e) => setCohortEndDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-on-surface">Daily Session Hours</label>
                <input
                  className="px-3 py-2 rounded-xl bg-surface-container-low border border-surface-container-highest text-on-surface focus:outline-none"
                  placeholder="e.g. Mon–Fri: 9:00 AM – 1:00 PM"
                  type="text"
                  value={cohortTime}
                  onChange={(e) => setCohortTime(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-on-surface">Total Available Seats</label>
                <input
                  className="px-3 py-2 rounded-xl bg-surface-container-low border border-surface-container-highest text-on-surface focus:outline-none"
                  type="number"
                  value={cohortSeats}
                  onChange={(e) => setCohortSeats(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-surface-container-highest">
                <button
                  className="px-4 py-2 bg-surface-container-low text-on-surface-variant font-medium rounded-xl hover:bg-surface-container"
                  type="button"
                  onClick={() => setSelectedProgramForCohort(null)}
                >
                  Cancel
                </button>
                <button
                  className="px-5 py-2 bg-stitch-primary text-white font-bold rounded-xl hover:bg-stitch-primary/90 transition-all shadow-sm"
                  disabled={isPending}
                  type="submit"
                >
                  {isPending ? "Scheduling..." : "Save Cohort Schedule"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
