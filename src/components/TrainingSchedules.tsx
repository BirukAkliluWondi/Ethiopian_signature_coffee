"use client";

import { useState, useEffect } from "react";
import { getTrainingProgramsAction } from "@/app/actions/admin-cms";
import TrainingApplicationModal from "./TrainingApplicationModal";

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

interface ProgramWithCohorts {
  id: string;
  title: string;
  level: string;
  duration: string;
  tuition_etb: number;
  description: string;
  has_application_form?: boolean;
  form_config?: any;
  schedules: Cohort[];
}

export default function TrainingSchedules() {
  const [programs, setPrograms] = useState<ProgramWithCohorts[]>([]);
  const [selectedProgramId, setSelectedProgramId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  // Application Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCohort, setSelectedCohort] = useState<Cohort | null>(null);

  useEffect(() => {
    async function loadData() {
      const res = await getTrainingProgramsAction();
      if (res.success && res.data && res.data.length > 0) {
        setPrograms(res.data as ProgramWithCohorts[]);
        setSelectedProgramId(res.data[0].id);
      }
      setIsLoading(false);
    }
    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="py-12 flex items-center justify-center text-xs text-white/50">
        Loading live cohort calendar...
      </div>
    );
  }

  if (programs.length === 0) {
    return null;
  }

  const selectedProgram = programs.find((p) => p.id === selectedProgramId) || programs[0];
  const cohorts = selectedProgram?.schedules || [];

  const handleOpenApplication = (cohort: Cohort | null = null) => {
    setSelectedCohort(cohort);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-6 pt-4">
      {/* Program Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-white/10">
        {programs.map((prog) => {
          const isSelected = prog.id === selectedProgramId;
          return (
            <button
              key={prog.id}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                isSelected
                  ? "bg-brand-yellow text-stone-900 border-brand-yellow shadow-cozy-sm font-bold"
                  : "bg-white/5 text-white/70 border-white/10 hover:text-white hover:bg-white/10"
              }`}
              type="button"
              onClick={() => setSelectedProgramId(prog.id)}
            >
              <span>{prog.title}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Program Details & Live Cohort Schedule Table */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/5 p-4 sm:p-5 rounded-2xl border border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-wider text-brand-yellow font-bold">
                {selectedProgram.level || "Certified Program"}
              </span>
            </div>
            <h4 className="font-serif text-lg sm:text-xl font-bold text-white mt-0.5">
              {selectedProgram.title}
            </h4>
            <p className="text-xs text-white/70 max-w-xl mt-1 leading-relaxed">
              {selectedProgram.description}
            </p>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
            <div className="text-left sm:text-right">
              <span className="text-[10px] uppercase tracking-wider text-white/50 block">Tuition</span>
              <span className="font-serif text-lg font-bold text-brand-yellow">
                {Number(selectedProgram.tuition_etb).toLocaleString()} ETB
              </span>
            </div>
            <div className="text-left sm:text-right pl-3 border-l border-white/15">
              <span className="text-[10px] uppercase tracking-wider text-white/50 block">Duration</span>
              <span className="text-xs font-semibold text-white">
                {selectedProgram.duration}
              </span>
            </div>
            <button
              className="btn-shimmer px-4 py-2 rounded-xl bg-brand-yellow hover:bg-brand-yellow-light text-stone-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 ml-2"
              type="button"
              onClick={() => handleOpenApplication(null)}
            >
              Apply for Course
            </button>
          </div>
        </div>

        {/* Cohorts Grid / List */}
        {cohorts.length === 0 ? (
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center flex flex-col items-center justify-center gap-3">
            <span className="material-symbols-outlined text-3xl text-brand-yellow">event_upcoming</span>
            <div className="flex flex-col gap-1 max-w-md">
              <span className="text-sm font-semibold text-white">Next Cohort Opening Soon</span>
              <p className="text-xs text-white/60 leading-relaxed">
                New dates for this training program are being scheduled. You can submit an advance application below to reserve your priority placement.
              </p>
            </div>
            <button
              className="mt-1 px-5 py-2 rounded-xl bg-brand-yellow text-stone-950 font-bold text-xs uppercase tracking-wider hover:bg-brand-yellow-light transition-all"
              type="button"
              onClick={() => handleOpenApplication(null)}
            >
              Submit Priority Application
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cohorts.map((cohort) => {
              const seatsAvailable = Math.max(0, cohort.seats_total - cohort.seats_booked);
              const isSoldOut = cohort.status === "sold_out" || seatsAvailable === 0;

              return (
                <div
                  key={cohort.id}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-brand-yellow/40 transition-all flex flex-col justify-between gap-4 group"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-brand-yellow uppercase tracking-wider">
                        {cohort.status === "filling_fast"
                          ? "Filling Fast"
                          : isSoldOut
                          ? "Sold Out"
                          : "Enrollment Open"}
                      </span>
                      <span className="text-xs text-white/80 font-semibold font-mono">
                        {seatsAvailable} seats remaining
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-white">
                        {new Date(cohort.start_date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}{" "}
                        –{" "}
                        {new Date(cohort.end_date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="text-[11px] text-white/60 mt-0.5">
                        {cohort.session_time}
                      </span>
                    </div>
                  </div>

                  <button
                    className={`w-full py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-center transition-all flex items-center justify-center gap-1.5 ${
                      isSoldOut
                        ? "bg-white/10 text-white/40 cursor-not-allowed pointer-events-none"
                        : "btn-shimmer bg-brand-yellow hover:bg-brand-yellow-light text-stone-950 active:scale-95 cursor-pointer shadow-cozy-sm"
                    }`}
                    disabled={isSoldOut}
                    type="button"
                    onClick={() => handleOpenApplication(cohort)}
                  >
                    <span>{isSoldOut ? "Cohort Full" : "Register Cohort"}</span>
                    {!isSoldOut && (
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Public Application Modal */}
      <TrainingApplicationModal
        cohort={selectedCohort}
        isOpen={isModalOpen}
        program={selectedProgram}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
