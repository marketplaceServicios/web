import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plan } from "@/data/mockData";
import { MapPin, Calendar } from "lucide-react";

interface PlanCardProps {
  plan: Plan;
  highlighted?: boolean;
}

export default function PlanCard({ plan, highlighted = false }: PlanCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("es-CO", {
      day: "numeric",
      month: "short",
    });
  };

  return (
    <Card
      className={`overflow-hidden hover:shadow-lg transition-all ${
        highlighted
          ? "border-2 border-golden ring-2 ring-golden/20"
          : "border-2 border-transparent hover:border-golden"
      }`}
    >
      {/* Image */}
      <div className="relative h-48">
        <img
          src={plan.image}
          alt={plan.title}
          className="w-full h-full object-cover"
        />
        {plan.isOffer && (
          <div className="absolute top-3 right-3 bg-golden text-white px-3 py-1 rounded-full text-xs font-semibold">
            OFERTA
          </div>
        )}
        {highlighted && (
          <div className="absolute top-3 left-3 bg-sage text-white px-3 py-1 rounded-full text-xs font-semibold">
            DESTACADO
          </div>
        )}
        {plan.datoClave && (
          <div className="absolute bottom-3 left-3 bg-white/90 text-primary px-3 py-1 rounded-full text-xs font-medium">
            {plan.datoClave}
          </div>
        )}
      </div>

      <CardContent className="p-5">
        <h3 className="text-xl font-serif font-semibold text-primary mb-2">{plan.title}</h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-stormy text-sm">
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="truncate">{plan.location}</span>
          </div>
          <div className="flex items-center text-stormy text-sm">
            <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>
              {formatDate(plan.startDate)} - {formatDate(plan.endDate)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            {plan.originalPrice && (
              <span className="text-sm text-stormy/60 line-through block">
                {formatPrice(plan.originalPrice)}
              </span>
            )}
            <span className="text-xl font-bold text-golden">
              {formatPrice(plan.price)}
            </span>
            <span className="text-sm text-stormy ml-1">/ persona</span>
          </div>
          <Link to={`/planes/${plan.id}`}>
            <Button size="sm">Ver plan</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
