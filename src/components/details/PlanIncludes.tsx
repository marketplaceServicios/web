import { Link } from "react-router-dom";
import { Plan } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface PlanIncludesProps {
  plan: Plan;
}

export default function PlanIncludes({ plan }: PlanIncludesProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden border sticky top-24">
      {/* Image */}
      <div className="relative h-48">
        <img
          src={plan.image}
          alt={plan.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-semibold text-lg">{plan.title}</h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h4 className="font-serif font-semibold text-primary mb-4">La experiencia incluye:</h4>
        <ul className="space-y-3 mb-6">
          {plan.includes.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700">{item}</span>
            </li>
          ))}
        </ul>

        {/* Price */}
        <div className="border-t pt-4 mb-4">
          <div className="flex items-baseline justify-between">
            <span className="text-stormy">Precio por persona</span>
            <div className="text-right">
              {plan.originalPrice && (
                <span className="text-sm text-stormy/60 line-through block">
                  {formatPrice(plan.originalPrice)}
                </span>
              )}
              <span className="text-2xl font-bold text-golden">
                {formatPrice(plan.price)}
              </span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <Link to={`/reserva/${plan.id}`}>
          <Button className="w-full" size="lg">
            Reservar experiencia
          </Button>
        </Link>
      </div>
    </div>
  );
}
