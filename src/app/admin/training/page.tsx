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
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-4 bg-stitch-primary rounded-full shrink-0" />
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-stitch-primary">
            Services &amp; Training Operations Hub
          </h1>
        </div>
        <p className="text-xs text-on-surface-variant pl-3.5">
          Manage training academy courses, commercial service packages, pricing, client bookings, and Excel rosters.
        </p>
      </div>

      <TrainingCMSClient initialPrograms={programs} initialServicePackages={servicePackages} />
    </div>
  );
}
