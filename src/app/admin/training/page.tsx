import { getTrainingProgramsAction } from "@/app/actions/admin-cms";
import TrainingCMSClient from "./TrainingCMSClient";

export default async function AdminTrainingPage() {
  const res = await getTrainingProgramsAction();
  const programs = res.success && res.data ? res.data : [];

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
          Barista Academy Programs &amp; Cohort Scheduler
        </h1>
        <p className="text-xs text-stone-400 mt-1">
          Create new barista training courses, configure curricula, and schedule upcoming cohort dates that display live on the website.
        </p>
      </div>

      <TrainingCMSClient initialPrograms={programs} />
    </div>
  );
}
