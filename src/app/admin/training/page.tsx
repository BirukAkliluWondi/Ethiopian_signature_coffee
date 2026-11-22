import { getTrainingProgramsAction } from "@/app/actions/admin-cms";
import TrainingCMSClient from "./TrainingCMSClient";

export default async function AdminTrainingPage() {
  const res = await getTrainingProgramsAction();
  const programs = res.success && res.data ? res.data : [];

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-4 bg-stitch-primary rounded-full shrink-0" />
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-stitch-primary">
            Barista Academy Programs &amp; Cohort Scheduler
          </h1>
        </div>
        <p className="text-xs text-on-surface-variant pl-3.5">
          Create new barista training courses, configure curricula, and schedule upcoming cohort dates that display live on the website.
        </p>
      </div>

      <TrainingCMSClient initialPrograms={programs} />
    </div>
  );
}
