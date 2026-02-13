import { Plan } from "@/data/mockData";
import { MapPin, Clock, Star } from "lucide-react";

interface ServiceInfoProps {
  plan: Plan;
}

export default function ServiceInfo({ plan }: ServiceInfoProps) {
  return (
    <div className="space-y-4">
      <div>
        <span className="inline-block bg-sage text-white px-3 py-1 rounded-full text-sm font-medium mb-3">
          {plan.category}
        </span>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary">
          {plan.title}
        </h1>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-stormy">
        <div className="flex items-center">
          <MapPin className="w-5 h-5 mr-1 text-golden" />
          <span>{plan.location}</span>
        </div>
        <div className="flex items-center">
          <Clock className="w-5 h-5 mr-1 text-golden" />
          <span>{plan.duration}</span>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < Math.floor(plan.rating)
                  ? "text-golden fill-golden"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <span className="text-primary font-semibold">{plan.rating}</span>
        <span className="text-stormy">({plan.reviews} reseñas)</span>
      </div>

      {/* Dato clave */}
      {plan.datoClave && (
        <div className="pt-4">
          <span className="inline-block bg-sage/10 text-sage px-4 py-2 rounded-full text-sm font-medium">
            {plan.datoClave}
          </span>
        </div>
      )}

      {/* Description */}
      <div className="pt-4 border-t">
        <h2 className="text-xl font-serif font-semibold text-primary mb-3">Descripción</h2>
        <p className="text-gray-700 leading-relaxed">{plan.description}</p>
      </div>
    </div>
  );
}
