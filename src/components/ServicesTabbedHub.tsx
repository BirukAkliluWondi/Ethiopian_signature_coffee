"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { CoreServicesSection, CateringShowcaseSection } from "./Services";
import DynamicServicePackages from "./DynamicServicePackages";
import Process from "./Process";
import type { ServicePackageForBooking } from "./ServiceBookingModal";

type ServiceTab = "practices" | "packages" | "catering" | "process";

export default function ServicesTabbedHub({
  initialPackages,
  mediaSlots,
}: {
  initialPackages: ServicePackageForBooking[];
  mediaSlots?: Record<string, string>;
}) {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<ServiceTab>("practices");

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (
      tabParam === "practices" ||
      tabParam === "packages" ||
      tabParam === "catering" ||
      tabParam === "process"
    ) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const tabs: Array<{ id: ServiceTab; label: string; icon: string }> = [
    { id: "practices", label: "Core Practices (1–6)", icon: "storefront" },
    { id: "packages", label: `Packages & Pricing (${initialPackages.length})`, icon: "sell" },
    { id: "catering", label: "Luxury Catering", icon: "restaurant" },
    { id: "process", label: "4-Stage Process", icon: "timeline" },
  ];

  return (
    <div className="flex flex-col gap-8 sm:gap-10">
      {/* Interactive Domain Tab Bar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border-subtle pb-4">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 border ${
                isActive
                  ? "bg-brand-green text-white border-brand-green shadow-cozy-sm"
                  : "bg-surface-white text-text-muted border-border-subtle hover:text-brand-green hover:border-brand-green/40"
              }`}
              type="button"
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="material-symbols-outlined text-base">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Tab Viewport */}
      {activeTab === "practices" && (
        <div className="animate-in fade-in duration-300">
          <CoreServicesSection mediaSlots={mediaSlots} />
        </div>
      )}

      {activeTab === "packages" && (
        <div className="animate-in fade-in duration-300">
          {initialPackages.length > 0 ? (
            <DynamicServicePackages initialPackages={initialPackages} />
          ) : (
            <div className="p-10 rounded-2xl bg-surface-white border border-border-subtle text-center flex flex-col items-center gap-2 shadow-cozy-sm">
              <span className="material-symbols-outlined text-3xl text-brand-green/50">
                inventory_2
              </span>
              <h3 className="font-serif text-xl font-bold text-text-main">
                Custom Turnkey Packages Available
              </h3>
              <p className="text-xs sm:text-sm text-text-muted max-w-md">
                Tailored café setup, consulting retainers, and catering proposals are customized to your venue footprint. Open our consultation desk below for an instant quote.
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab === "catering" && (
        <div className="animate-in fade-in duration-300">
          <CateringShowcaseSection mediaSlots={mediaSlots} />
        </div>
      )}

      {activeTab === "process" && (
        <div className="animate-in fade-in duration-300">
          <Process />
        </div>
      )}
    </div>
  );
}
