import { Plan } from "@/data/mockData";
import PlanCard from "./PlanCard";

interface PlansGridProps {
  plans: Plan[];
}

export default function PlansGrid({ plans }: PlansGridProps) {
  if (plans.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-stormy text-lg">
          No se encontraron experiencias en esta categoría.
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {plans.map((plan) => (
        <PlanCard key={plan.id} plan={plan} highlighted={plan.highlighted} />
      ))}
    </div>
  );
}
