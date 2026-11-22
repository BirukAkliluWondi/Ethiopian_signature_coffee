"use client";

import { useState, useEffect } from "react";
import { getTrainingProgramsAction } from "@/app/actions/admin-cms";

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
  schedules: Cohort[];
}

export default function TrainingSchedules() {
  const [programs, setPrograms] = useState<ProgramWithCohorts[]>([]);
  const [selectedProgramId, setSelectedProgramId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 className="font-serif text-lg sm:text-xl font-bold text-white">
              {selectedProgram.title}
            </h4>
            <p className="text-xs text-white/60 max-w-xl mt-1">
              {selectedProgram.description}
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-wider text-white/50 block">Tuition</span>
              <span className="font-serif text-lg font-bold text-brand-yellow">
                {Number(selectedProgram.tuition_etb).toLocaleString()} ETB
              </span>
            </div>
            <div className="text-right pl-3 border-l border-white/15">
              <span className="text-[10px] uppercase tracking-wider text-white/50 block">Duration</span>
              <span className="text-xs font-semibold text-white">
                {selectedProgram.duration}
              </span>
            </div>
          </div>
        </div>

        {/* Cohorts Grid / List */}
        {cohorts.length === 0 ? (
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center text-xs text-white/60">
            New cohort dates for this course will be published shortly. Inquire directly to reserve advance placement.
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
                      <span className="text-xs text-white/80 font-semibold">
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

                  <a
                    className={`w-full py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-center transition-all flex items-center justify-center ${
                      isSoldOut
                        ? "bg-white/10 text-white/40 cursor-not-allowed pointer-events-none"
                        : "bg-brand-yellow hover:bg-brand-yellow-light text-stone-950 active:scale-95"
                    }`}
                    href="#contact"
                  >
                    <span>{isSoldOut ? "Cohort Full" : "Register Cohort"}</span>
                  </a>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
