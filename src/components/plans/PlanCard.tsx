import { Link } from "react-router-dom";
import { Plan } from "@/data/mockData";
import { MapPin, Building2 } from "lucide-react";
import { handleImgError } from "@/lib/imageUtils";

interface PlanCardProps {
  plan: Plan;
  highlighted?: boolean;
}

export default function PlanCard({ plan }: PlanCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Link
      to={`/planes/${plan.id}`}
      className="group block rounded-2xl bg-white hover:shadow-md transition-shadow"
    >
      {/* Image */}
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={plan.image}
          alt={plan.title}
          className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-300"
          onError={handleImgError}
        />

        {/* Rating - top right */}
        {plan.rating > 0 && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
            <span className="text-xs">{"\u2B50"}</span>
            <span className="text-xs font-semibold text-primary">
              {plan.rating}
            </span>
          </div>
        )}

        {/* Offer tag */}
        {plan.isOffer && (
          <div className="absolute bottom-3 left-3 bg-golden text-white px-3 py-1 rounded-full text-xs font-semibold">
            OFERTA
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        {/* Category + Location */}
        <div className="flex items-center gap-2 text-xs text-stormy">
          <span className="uppercase font-semibold text-primary/70 border border-gray-200 rounded-full px-2 py-0.5">
            {plan.category}
          </span>
          <span className="text-stormy/40">&middot;</span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {plan.location}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif font-bold text-primary text-base leading-snug">
          {plan.title}
        </h3>

        {/* Provider */}
        {plan.providerName && (
          <div className="flex items-center gap-1 text-xs text-stormy/70">
            <Building2 className="w-3 h-3" />
            <span>{plan.providerName}</span>
          </div>
        )}

        {/* Description */}
        {plan.description && (
          <p className="text-sm text-stormy line-clamp-2">
            {plan.description}
          </p>
        )}

        {/* Price */}
        <div className="pt-1">
          {plan.originalPrice && (
            <span className="text-xs text-stormy/60 line-through mr-2">
              {formatPrice(plan.originalPrice)}
            </span>
          )}
          <span className="text-lg font-bold text-golden">
            {formatPrice(plan.price)}
          </span>
          <span className="text-xs text-stormy ml-1">/ persona</span>
        </div>
      </div>
    </Link>
  );
}
