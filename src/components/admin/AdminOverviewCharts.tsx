"use client";

import { useState } from "react";
import Link from "next/link";

interface ActivityDay {
  dateLabel: string;
  dayShort: string;
  inquiries: number;
  bookings: number;
}

interface ServiceDemandItem {
  name: string;
  count: number;
  percentage: number;
}

interface CohortItem {
  id: string;
  programTitle: string;
  startDate: string;
  seatsTotal: number;
  seatsBooked: number;
  status: string;
}

export default function AdminOverviewCharts({
  activitySeries,
  serviceDemand,
  cohorts,
}: {
  activitySeries: ActivityDay[];
  serviceDemand: ServiceDemandItem[];
  cohorts: CohortItem[];
}) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const maxDailyTotal = Math.max(
    4,
    ...activitySeries.map((d) => Math.max(d.inquiries, d.bookings, d.inquiries + d.bookings))
  );

  const total7DayInquiries = activitySeries.reduce((s, d) => s + d.inquiries, 0);
  const total7DayBookings = activitySeries.reduce((s, d) => s + d.bookings, 0);

  const hoveredDay = hoveredIdx !== null ? activitySeries[hoveredIdx] : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 w-full">
      {/* Left 7 Columns: 7-Day Activity Chart */}
      <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] p-5 flex flex-col justify-between gap-5 overflow-hidden min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">
              7-Day Client Activity
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Daily incoming inquiries compared with course &amp; service bookings
            </p>
          </div>

          {/* Interactive Legend / Hover Readout */}
          <div className="flex items-center gap-4 text-xs bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200/70 shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-xs bg-[#062b18]" />
              <span className="font-semibold text-slate-700">
                Inquiries ({hoveredDay ? hoveredDay.inquiries : total7DayInquiries})
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-xs bg-[#d48800]" />
              <span className="font-semibold text-slate-700">
                Bookings ({hoveredDay ? hoveredDay.bookings : total7DayBookings})
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Chart Bars */}
        <div className="relative h-56 flex flex-col justify-end pt-8">
          {/* Subtle Horizontal Gridlines */}
          <div className="absolute inset-x-0 top-8 bottom-8 flex flex-col justify-between pointer-events-none">
            {[maxDailyTotal, Math.ceil(maxDailyTotal / 2), 0].map((val, idx) => (
              <div key={idx} className="flex items-center gap-2 w-full">
                <span className="text-[10px] font-mono text-slate-400 w-5 text-right shrink-0">
                  {val}
                </span>
                <div className="flex-1 border-b border-dashed border-slate-200/80" />
              </div>
            ))}
          </div>

          {/* Bars Row (strictly 7 equal-width grid columns so nothing overflows) */}
          <div className="relative z-10 grid grid-cols-7 gap-1 sm:gap-2 pl-7 h-44 w-full">
            {activitySeries.map((day, idx) => {
              const inqPct = Math.round((day.inquiries / maxDailyTotal) * 100);
              const bookPct = Math.round((day.bookings / maxDailyTotal) * 100);
              const isHovered = hoveredIdx === idx;

              return (
                <div
                  key={day.dateLabel}
                  className="relative flex flex-col items-center h-full justify-end group cursor-pointer min-w-0"
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  {/* Floating Hover Tooltip (positioned absolutely so it never stretches column width) */}
                  <div
                    className={`absolute -top-6 ${
                      idx === 0
                        ? "left-0"
                        : idx === activitySeries.length - 1
                        ? "right-0"
                        : "left-1/2 -translate-x-1/2"
                    } px-2 py-1 rounded bg-slate-900 text-white text-[10px] font-medium whitespace-nowrap transition-opacity pointer-events-none shadow-md z-20 ${
                      isHovered ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {day.dateLabel}: {day.inquiries} inq · {day.bookings} book
                  </div>

                  {/* Paired Vertical Bars */}
                  <div
                    className={`w-full max-w-[44px] flex items-end justify-center gap-1 h-32 px-1 py-1 rounded-lg transition-colors ${
                      isHovered ? "bg-slate-100/90" : ""
                    }`}
                  >
                    <div
                      className="w-2.5 sm:w-3.5 bg-[#062b18] rounded-t-sm transition-all duration-300"
                      style={{ height: `${Math.max(day.inquiries > 0 ? 14 : 5, inqPct)}%`, opacity: day.inquiries > 0 ? 1 : 0.18 }}
                      title={`${day.inquiries} inquiries`}
                    />
                    <div
                      className="w-2.5 sm:w-3.5 bg-[#d48800] rounded-t-sm transition-all duration-300"
                      style={{ height: `${Math.max(day.bookings > 0 ? 14 : 5, bookPct)}%`, opacity: day.bookings > 0 ? 1 : 0.18 }}
                      title={`${day.bookings} bookings`}
                    />
                  </div>

                  {/* X-Axis Day Label */}
                  <span
                    className={`text-[11px] mt-2 font-medium transition-colors truncate ${
                      isHovered ? "text-[#062b18] font-bold" : "text-slate-500"
                    }`}
                  >
                    {day.dayShort}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right 5 Columns: Demand Breakdown & Cohort Capacity */}
      <div className="lg:col-span-5 flex flex-col gap-5">
        {/* Service Demand Card */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] p-5 flex flex-col gap-3.5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">
              Demand by Service Category
            </h2>
            <Link
              className="text-[11px] font-semibold text-[#062b18] hover:underline"
              href="/admin/leads"
            >
              Details →
            </Link>
          </div>

          {serviceDemand.length === 0 ? (
            <div className="py-6 text-center text-xs text-slate-400">
              Service breakdown will populate as client inquiries arrive.
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {serviceDemand.map((item, idx) => (
                <div key={item.name} className="flex flex-col gap-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-700 truncate max-w-[210px]">
                      {item.name}
                    </span>
                    <span className="font-bold text-slate-900 tabular-nums">
                      {item.count}{" "}
                      <span className="text-[10px] font-normal text-slate-400">
                        ({item.percentage}%)
                      </span>
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-sm overflow-hidden">
                    <div
                      className={`h-full rounded-sm transition-all duration-500 ${
                        idx === 0
                          ? "bg-[#062b18]"
                          : idx === 1
                          ? "bg-[#d48800]"
                          : "bg-emerald-600/80"
                      }`}
                      style={{ width: `${Math.max(8, item.percentage)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming Cohort Occupancy Card */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] p-5 flex flex-col gap-3.5 flex-1">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">
              Upcoming Academy Cohorts
            </h2>
            <Link
              className="text-[11px] font-semibold text-[#062b18] hover:underline"
              href="/admin/training"
            >
              Manage →
            </Link>
          </div>

          {cohorts.length === 0 ? (
            <div className="py-4 text-center text-xs text-slate-400">
              No active upcoming cohorts scheduled.
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {cohorts.map((cohort) => {
                const pct = Math.min(
                  100,
                  Math.round((cohort.seatsBooked / Math.max(1, cohort.seatsTotal)) * 100)
                );
                return (
                  <div key={cohort.id} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-slate-800 truncate">
                        {cohort.programTitle}
                      </span>
                      <span className="text-[11px] font-mono text-slate-600 shrink-0">
                        {cohort.seatsBooked}/{cohort.seatsTotal} seats
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-sm overflow-hidden">
                        <div
                          className={`h-full rounded-sm ${
                            pct >= 90 ? "bg-rose-600" : pct >= 60 ? "bg-[#d48800]" : "bg-[#062b18]"
                          }`}
                          style={{ width: `${Math.max(4, pct)}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-medium text-slate-400 shrink-0">
                        {new Date(cohort.startDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
