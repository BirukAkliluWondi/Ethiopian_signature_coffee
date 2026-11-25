import { Suspense } from "react";
import { getTrainingProgramsAction, getServicePackagesAction } from "@/app/actions/admin-cms";
import TrainingCMSClient from "./TrainingCMSClient";

export default async function AdminTrainingPage() {
  const [progRes, pkgRes] = await Promise.all([
    getTrainingProgramsAction(),
    getServicePackagesAction(),
  ]);

  const programs = progRes.success && progRes.data ? progRes.data : [];
  const servicePackages = pkgRes.success && pkgRes.data ? pkgRes.data : [];

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Services &amp; Training Hub
        </h1>
        <p className="text-xs text-slate-500">
          Manage academy courses, commercial service packages, dynamic pricing, client bookings, and Excel rosters.
        </p>
      </div>

      <Suspense fallback={<div className="p-8 text-center text-xs text-slate-500">Loading operations hub...</div>}>
        <TrainingCMSClient initialPrograms={programs} initialServicePackages={servicePackages} />
      </Suspense>
    </div>
  );
}
