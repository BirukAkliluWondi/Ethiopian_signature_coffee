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
      {/* Action Header Card */}
      <div className="p-4 sm:p-5 rounded-xl bg-surface-container-lowest border border-surface-container-highest flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div>
          <h3 className="font-serif text-lg font-semibold text-stitch-primary">
            Curriculum Authoring &amp; Cohort Scheduling
          </h3>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Configure barista syllabi and publish upcoming cohort dates that update the main site live.
          </p>
        </div>

        <button
          className="px-4 py-2 rounded-lg bg-stitch-primary hover:bg-stitch-primary-container text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center gap-1.5 shrink-0"
          type="button"
          onClick={() => setShowNewProgramModal(true)}
        >
          <span className="material-symbols-outlined text-base">add</span>
          <span>New Training Course</span>
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
                    {prog.level}
                  </span>
                  <span className="text-xs text-on-surface-variant font-semibold">{prog.duration}</span>
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
                  <span className="text-[10px] uppercase tracking-wider text-on-surface-variant block font-bold">Tuition</span>
                  <span className="font-serif text-lg font-bold text-stitch-primary">
                    {Number(prog.tuition_etb).toLocaleString()} ETB
                  </span>
                </div>
                <button
                  className="px-3.5 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-stitch-primary text-xs font-semibold flex items-center gap-1.5 transition-colors border border-surface-container-highest"
                  type="button"
                  onClick={() => setSelectedProgramForCohort(prog)}
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                  <span>Add Cohort</span>
                </button>
              </div>
            </div>

            {/* Program Cohorts Table */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-on-surface">
                Scheduled Cohort Dates ({prog.schedules.length}):
              </span>

              {prog.schedules.length === 0 ? (
                <div className="p-4 rounded-lg bg-surface-container-low/60 border border-surface-container-highest text-xs text-on-surface-variant text-center">
                  No upcoming cohorts currently scheduled. Click &ldquo;Add Cohort&rdquo; to open enrollment.
                </div>
              ) : (
                <div className="overflow-x-auto rounded-lg border border-surface-container-highest">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-surface-container-highest bg-surface-container-low/70 text-on-surface-variant uppercase tracking-wider text-[10px]">
                        <th className="py-2.5 px-3 font-bold">Start Date</th>
                        <th className="py-2.5 px-3 font-bold">End Date</th>
                        <th className="py-2.5 px-3 font-bold">Session Hours</th>
                        <th className="py-2.5 px-3 font-bold">Seats Status</th>
                        <th className="py-2.5 px-3 font-bold">Enrollment Status</th>
                        <th className="py-2.5 px-3 font-bold text-right">Action</th>
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
                                <option value="open">Open</option>
                                <option value="filling_fast">Filling Fast</option>
                                <option value="sold_out">Sold Out</option>
                                <option value="completed">Completed</option>
                              </select>
                            </td>
                            <td className="py-2.5 px-3 text-right">
                              <button
                                aria-label="Delete cohort schedule"
                                className="text-error hover:bg-error-container/40 p-1 rounded transition-colors"
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
                  Curriculum Authoring
                </span>
                <h3 className="font-serif text-lg font-semibold text-stitch-primary mt-0.5" id="new-program-title">
                  Create Training Program
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
                <label className="text-on-surface font-semibold" htmlFor="prog-title">Program Title *</label>
                <input
                  className="px-3 py-2 rounded-lg bg-surface-container-low border border-surface-container-highest text-xs text-on-surface outline-none focus:border-stitch-primary"
                  id="prog-title"
                  placeholder="e.g. Master Latte Art & Sensory Science"
                  required
                  type="text"
                  value={progTitle}
                  onChange={(e) => setProgTitle(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                <div className="flex flex-col gap-1">
                  <label className="text-on-surface font-semibold" htmlFor="prog-level">Level</label>
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
                  <label className="text-on-surface font-semibold" htmlFor="prog-tuition">Tuition (ETB) *</label>
                  <input
                    className="px-3 py-2 rounded-lg bg-surface-container-low border border-surface-container-highest text-xs text-on-surface outline-none focus:border-stitch-primary"
                    id="prog-tuition"
                    placeholder="20000"
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
                  placeholder="Detailed description of outcomes and target students..."
                  required
                  rows={2}
                  value={progDesc}
                  onChange={(e) => setProgDesc(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-on-surface font-semibold" htmlFor="prog-curriculum">Curriculum Modules (one per line)</label>
                <textarea
                  className="px-3 py-2 rounded-lg bg-surface-container-low border border-surface-container-highest text-xs text-on-surface outline-none focus:border-stitch-primary font-mono text-[11px]"
                  id="prog-curriculum"
                  placeholder="Espresso extraction science&#10;Microfoam milk mechanics&#10;Bar speed management"
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
                  {isPending ? "Creating..." : "Save Program"}
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
                  Schedule New Cohort
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
                  <label className="text-on-surface font-semibold" htmlFor="cohort-start">Start Date *</label>
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
                  <label className="text-on-surface font-semibold" htmlFor="cohort-end">End Date *</label>
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
                <label className="text-on-surface font-semibold" htmlFor="cohort-seats">Total Seats Available</label>
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
                  {isPending ? "Publishing..." : "Publish Cohort"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
