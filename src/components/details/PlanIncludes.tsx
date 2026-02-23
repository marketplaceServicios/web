import { Link } from "react-router-dom";
import { Plan } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Check, CalendarCheck, CalendarX } from "lucide-react";
import { handleImgError } from "@/lib/imageUtils";

interface PlanIncludesProps {
  plan: Plan;
  selectedDate?: string | null;
  selectedPrice?: number;
}

export default function PlanIncludes({ plan, selectedDate, selectedPrice }: PlanIncludesProps) {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);

  const formatReadableDate = (iso: string) => {
    const [y, m, d] = iso.split("-").map(Number);
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString("es-CO", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const activePrice = selectedDate && selectedPrice != null ? selectedPrice : plan.price;
  const reservaHref = selectedDate
    ? `/reserva/${plan.id}?fecha=${selectedDate}&precio=${activePrice}`
    : `/reserva/${plan.id}`;

  return (
    <div className="bg-white rounded-xl overflow-hidden border sticky top-24">
      {/* Image */}
      <div className="relative h-48">
        <img
          src={plan.image}
          alt={plan.title}
          className="w-full h-full object-cover"
          onError={handleImgError}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-semibold text-lg">{plan.title}</h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h4 className="font-serif font-semibold text-primary mb-4">Lo que incluye</h4>
        <ul className="space-y-3 mb-6">
          {plan.includes.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700">{item}</span>
            </li>
          ))}
        </ul>

        {/* Fecha seleccionada */}
        <div className={`rounded-xl p-4 mb-4 border transition-all ${
          selectedDate
            ? "bg-sage/10 border-sage/30"
            : "bg-amber-50 border-amber-300"
        }`}>
          {selectedDate ? (
            <div className="flex items-start gap-3">
              <CalendarCheck className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-sage uppercase tracking-wide mb-0.5">
                  Fecha seleccionada
                </p>
                <p className="text-sm font-medium text-primary capitalize">
                  {formatReadableDate(selectedDate)}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3">
              <CalendarX className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800 font-medium">
                Elige una fecha en el calendario antes de continuar.
              </p>
            </div>
          )}
        </div>

        {/* Price */}
        <div className="border-t pt-4 mb-4">
          <div className="flex items-baseline justify-between">
            <span className="text-stormy">Precio por persona</span>
            <div className="text-right">
              {plan.originalPrice && !selectedDate && (
                <span className="text-sm text-stormy/60 line-through block">
                  {formatPrice(plan.originalPrice)}
                </span>
              )}
              {selectedDate && activePrice !== plan.price && (
                <span className="text-sm text-stormy/60 line-through block">
                  {formatPrice(plan.price)}
                </span>
              )}
              <span className="text-2xl font-bold text-golden">
                {formatPrice(activePrice)}
              </span>
            </div>
          </div>
        </div>

        {/* CTA */}
        {selectedDate ? (
          <Link to={reservaHref}>
            <Button className="w-full" size="lg">
              Reserva esta fecha
            </Button>
          </Link>
        ) : (
          <Button className="w-full" size="lg" disabled>
            Selecciona una fecha para reservar
          </Button>
        )}
      </div>
    </div>
  );
}
