"use client";

import { useState, useEffect } from "react";
import ServiceBookingModal, { ServicePackageForBooking } from "./ServiceBookingModal";
import { getServicePackagesAction } from "@/app/actions/admin-cms";

export default function DynamicServicePackages({
  initialPackages,
}: {
  initialPackages?: ServicePackageForBooking[];
}) {
  const [packages, setPackages] = useState<ServicePackageForBooking[]>(initialPackages || []);
  const [selectedPkg, setSelectedPkg] = useState<ServicePackageForBooking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!initialPackages || initialPackages.length === 0) {
      getServicePackagesAction().then((res) => {
        if (res.success && res.data.length > 0) {
          setPackages(res.data.filter((p) => p.is_active));
        }
      });
    }
  }, [initialPackages]);

  if (!packages || packages.length === 0) {
    return null;
  }

  const formatPrice = (pkg: ServicePackageForBooking) => {
    const formatted = Number(pkg.price_etb || 0).toLocaleString();
    switch (pkg.pricing_model) {
      case "starting_from":
        return `Starting from ETB ${formatted}`;
      case "per_day":
        return `ETB ${formatted} / Day`;
      case "custom_quote":
        return "Custom Quote";
      case "fixed":
      default:
        return `ETB ${formatted}`;
    }
  };

  const handleOpenBooking = (pkg: ServicePackageForBooking) => {
    setSelectedPkg(pkg);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-6 sm:gap-8 pt-4">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-border-subtle pb-4">
        <div className="flex flex-col gap-1">
          <span className="text-xs uppercase tracking-wider text-brand-green font-bold">
            Transparent Pricing &amp; Scope
          </span>
          <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-text-main">
            Featured Service Packages
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-text-muted max-w-sm">
          Fixed-price advisory and operational packages engineered to launch, optimize, and scale your coffee establishment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <article
            key={pkg.id}
            className="spotlight-card group flex flex-col justify-between rounded-2xl bg-surface-white border border-border-subtle overflow-hidden shadow-cozy hover:shadow-roast-bloom hover:-translate-y-1.5 hover:border-brand-yellow/50 transition-all duration-300"
          >
            <div className="p-5 sm:p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] uppercase tracking-wider text-brand-green font-bold">
                  {pkg.category}
                </span>
                {pkg.timeline && (
                  <span className="text-[11px] text-text-muted font-medium bg-surface-subtle px-2 py-0.5 rounded-md border border-border-subtle">
                    {pkg.timeline}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <h4 className="font-serif text-lg sm:text-xl font-bold text-text-main group-hover:text-brand-green transition-colors">
                  {pkg.title}
                </h4>
                <p className="text-xs text-text-muted leading-relaxed line-clamp-3">
                  {pkg.description}
                </p>
              </div>

              {/* Price Banner */}
              <div className="p-3.5 rounded-xl bg-surface-subtle border border-border-subtle flex items-baseline justify-between gap-2">
                <span className="text-xs text-text-muted font-medium">Investment:</span>
                <span className="font-serif font-bold text-base sm:text-lg text-brand-green">
                  {formatPrice(pkg)}
                </span>
              </div>

              {/* Deliverables Checklist */}
              {pkg.deliverables && pkg.deliverables.length > 0 && (
                <div className="flex flex-col gap-2 pt-1">
                  <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">
                    Scope Deliverables:
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {pkg.deliverables.slice(0, 4).map((d, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2 text-xs text-text-main">
                        <span className="material-symbols-outlined text-sm text-brand-green shrink-0 mt-0.5">
                          check_circle
                        </span>
                        <span className="leading-snug">{d}</span>
                      </div>
                    ))}
                    {pkg.deliverables.length > 4 && (
                      <span className="text-[11px] text-text-muted pl-5 italic">
                        + {pkg.deliverables.length - 4} additional scope items
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Card Action Button */}
            <div className="p-5 sm:p-6 pt-0">
              <button
                className="w-full h-11 px-5 rounded-xl bg-brand-green hover:bg-brand-green-dark text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-cozy-sm flex items-center justify-center gap-2 active:scale-95 group-hover:shadow-md"
                type="button"
                onClick={() => handleOpenBooking(pkg)}
              >
                <span>Book Service Package</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </article>
        ))}
      </div>

      <ServiceBookingModal
        isOpen={isModalOpen}
        pkg={selectedPkg}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPkg(null);
        }}
      />
    </div>
  );
}
