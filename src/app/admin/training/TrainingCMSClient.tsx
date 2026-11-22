"use client";

import { useState, useTransition } from "react";
import {
  createTrainingProgramAction,
  createCohortScheduleAction,
  updateCohortScheduleAction,
  deleteCohortScheduleAction,
} from "@/app/actions/admin-cms";

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
  schedules: Cohort[];
}

export default function TrainingCMSClient({
  initialPrograms,
}: {
  initialPrograms: Program[];
}) {
  const [programs, setPrograms] = useState<Program[]>(initialPrograms);
  const [showNewProgramModal, setShowNewProgramModal] = useState(false);
  const [selectedProgramForCohort, setSelectedProgramForCohort] = useState<Program | null>(null);

  // New Program Form State
  const [progTitle, setProgTitle] = useState("");
  const [progLevel, setProgLevel] = useState("Foundation");
  const [progDuration, setProgDuration] = useState("");
  const [progTuition, setProgTuition] = useState("");
  const [progDesc, setProgDesc] = useState("");
  const [progCurriculum, setProgCurriculum] = useState("");

  // New Cohort Form State
  const [cohortStartDate, setCohortStartDate] = useState("");
  const [cohortEndDate, setCohortEndDate] = useState("");
  const [cohortTime, setCohortTime] = useState("Mon–Fri: 9:00 AM – 1:00 PM");
  const [cohortSeats, setCohortSeats] = useState("8");

  const [isPending, startTransition] = useTransition();

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
      });

      if (res.success) {
        setShowNewProgramModal(false);
        setProgTitle("");
        setProgDuration("");
        setProgTuition("");
        setProgDesc("");
        setProgCurriculum("");
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

  const handleStatusChange = (cohortId: string, programId: string, newStatus: string) => {
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

  return (
    <div className="flex flex-col gap-6">
      {/* Step-by-Step Guide for Academy Schedules */}
      <div className="p-4 rounded-xl bg-surface-container-lowest border border-surface-container-highest shadow-sm flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded bg-stitch-primary text-white flex items-center justify-center text-xs font-bold shrink-0">
            ?
          </span>
          <h2 className="font-semibold text-xs text-stitch-primary uppercase tracking-wider">
            Step-by-Step Guide: How to Schedule Barista Classes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
          <div className="p-3 rounded-lg bg-surface-container-low border border-surface-container-highest flex items-start gap-2.5">
            <span className="w-5 h-5 rounded bg-stitch-primary text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
              1
            </span>
            <div className="flex flex-col">
              <span className="font-bold text-on-surface">Choose Course</span>
              <span className="text-[11px] text-on-surface-variant mt-0.5 leading-relaxed">
                Review your courses below. Click <strong>+ Add New Course</strong> if you want to create a brand new curriculum.
              </span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-surface-container-low border border-surface-container-highest flex items-start gap-2.5">
            <span className="w-5 h-5 rounded bg-stitch-secondary text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
              2
            </span>
            <div className="flex flex-col">
              <span className="font-bold text-on-surface">Click &ldquo;Add Class Dates&rdquo;</span>
              <span className="text-[11px] text-on-surface-variant mt-0.5 leading-relaxed">
                Set the start date, end date, session hours (e.g. Mon–Fri 9am–1pm), and available student seats.
              </span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-surface-container-low border border-surface-container-highest flex items-start gap-2.5">
            <span className="w-5 h-5 rounded bg-[#25D366] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
              3
            </span>
            <div className="flex flex-col">
              <span className="font-bold text-on-surface">Publish Online</span>
              <span className="text-[11px] text-on-surface-variant mt-0.5 leading-relaxed">
                Your new class dates appear live on the website immediately so visitors can apply!
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Header Card */}
      <div className="p-4 sm:p-5 rounded-xl bg-surface-container-lowest border border-surface-container-highest flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div>
          <h3 className="font-serif text-lg font-semibold text-stitch-primary">
            Active Barista Courses ({programs.length})
          </h3>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Click <strong>Add Class Dates</strong> on any course below to open a new cohort schedule.
          </p>
        </div>

        <button
          className="px-4 py-2 rounded-lg bg-stitch-primary hover:bg-stitch-primary-container text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center gap-1.5 shrink-0"
          type="button"
          onClick={() => setShowNewProgramModal(true)}
        >
          <span className="material-symbols-outlined text-base">add</span>
          <span>+ Add New Training Course</span>
        </button>
      </div>

      {/* Programs List */}
      <div className="flex flex-col gap-5">
        {programs.map((prog) => (
          <div
            key={prog.id}
            className="p-5 rounded-xl bg-surface-container-lowest border border-surface-container-highest flex flex-col gap-5 shadow-sm"
          >
            {/* Program Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-surface-container-highest pb-4">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-stitch-tertiary-fixed text-stitch-tertiary">
                    {prog.level} Level
                  </span>
                  <span className="text-xs text-on-surface-variant font-semibold">Duration: {prog.duration}</span>
                </div>
                <h4 className="font-serif text-lg sm:text-xl font-semibold text-stitch-primary mt-1">
                  {prog.title}
                </h4>
                <p className="text-xs text-on-surface-variant mt-1 max-w-2xl leading-relaxed">
                  {prog.description}
                </p>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-wider text-on-surface-variant block font-bold">Tuition Price</span>
                  <span className="font-serif text-lg font-bold text-stitch-primary">
                    {Number(prog.tuition_etb).toLocaleString()} ETB
                  </span>
                </div>
                <button
                  className="px-3.5 py-2 rounded-lg bg-stitch-primary text-white hover:bg-stitch-primary-container text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                  type="button"
                  onClick={() => setSelectedProgramForCohort(prog)}
                >
                  <span className="material-symbols-outlined text-sm">calendar_add_on</span>
                  <span>Add Class Dates</span>
                </button>
              </div>
            </div>

            {/* Program Cohorts Table */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-on-surface">
                Scheduled Class Dates for this Course ({prog.schedules.length}):
              </span>

              {prog.schedules.length === 0 ? (
                <div className="p-4 rounded-lg bg-surface-container-low/60 border border-surface-container-highest text-xs text-on-surface-variant text-center">
                  No upcoming dates scheduled yet. Click &ldquo;Add Class Dates&rdquo; above to open enrollment for students!
                </div>
              ) : (
                <div className="overflow-x-auto rounded-lg border border-surface-container-highest">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-surface-container-highest bg-surface-container-low/70 text-on-surface-variant uppercase tracking-wider text-[10px]">
                        <th className="py-2.5 px-3 font-bold">Start Date</th>
                        <th className="py-2.5 px-3 font-bold">End Date</th>
                        <th className="py-2.5 px-3 font-bold">Class Hours</th>
                        <th className="py-2.5 px-3 font-bold">Seats Status</th>
                        <th className="py-2.5 px-3 font-bold">Enrollment Status</th>
                        <th className="py-2.5 px-3 font-bold text-right">Delete</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-container-highest">
                      {prog.schedules.map((cohort) => {
                        const available = Math.max(0, cohort.seats_total - cohort.seats_booked);
                        return (
                          <tr key={cohort.id} className="hover:bg-surface-container-low/40 transition-colors">
                            <td className="py-2.5 px-3 font-semibold text-on-surface">
                              {new Date(cohort.start_date).toLocaleDateString()}
                            </td>
                            <td className="py-2.5 px-3 text-on-surface-variant">
                              {new Date(cohort.end_date).toLocaleDateString()}
                            </td>
                            <td className="py-2.5 px-3 text-on-surface-variant">
                              {cohort.session_time}
                            </td>
                            <td className="py-2.5 px-3">
                              <span className="text-on-surface font-medium">
                                {cohort.seats_booked} / {cohort.seats_total} booked
                              </span>
                              <span className="text-on-surface-variant text-[11px] ml-1">
                                ({available} left)
                              </span>
                            </td>
                            <td className="py-2.5 px-3">
                              <select
                                className="px-2 py-1 rounded bg-surface-container-low border border-surface-container-highest text-[11px] font-bold uppercase tracking-wider text-stitch-primary outline-none focus:border-stitch-primary"
                                value={cohort.status}
                                onChange={(e) =>
                                  handleStatusChange(cohort.id, prog.id, e.target.value)
                                }
                              >
                                <option value="open">Open (Enrolling)</option>
                                <option value="filling_fast">Filling Fast</option>
                                <option value="sold_out">Sold Out</option>
                                <option value="completed">Completed</option>
                              </select>
                            </td>
                            <td className="py-2.5 px-3 text-right">
                              <button
                                aria-label="Delete class dates"
                                className="text-error hover:bg-error-container/40 p-1.5 rounded transition-colors"
                                title="Delete this date"
                                type="button"
                                onClick={() => handleDeleteCohort(cohort.id, prog.id)}
                              >
                                <span className="material-symbols-outlined text-base">delete</span>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* New Program Modal */}
      {showNewProgramModal && (
        <div
          aria-labelledby="new-program-title"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          role="dialog"
        >
          <div className="w-full max-w-lg bg-surface-container-lowest border border-surface-container-highest rounded-2xl p-6 sm:p-7 flex flex-col gap-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-surface-container-highest pb-3">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-stitch-secondary font-bold">
                  Step 1 of 2: Create Course
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

            <form className="flex flex-col gap-3.5 text-xs" onSubmit={handleCreateProgram}>
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
                  rows={3}
                  value={progCurriculum}
                  onChange={(e) => setProgCurriculum(e.target.value)}
                />
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
                  {isPending ? "Saving..." : "Save Course"}
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
                  Step 2 of 2: Schedule Class
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
