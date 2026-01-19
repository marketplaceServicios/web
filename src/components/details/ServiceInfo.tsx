import { Plan } from "@/data/mockData";
import { MapPin, Clock, Star } from "lucide-react";

interface ServiceInfoProps {
  plan: Plan;
}

export default function ServiceInfo({ plan }: ServiceInfoProps) {
  return (
    <div className="space-y-4">
      <div>
        <span className="inline-block bg-forest text-white px-3 py-1 rounded-full text-sm font-medium mb-3">
          {plan.category}
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-forest">
          {plan.title}
        </h1>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-gray-600">
        <div className="flex items-center">
          <MapPin className="w-5 h-5 mr-1 text-primary" />
          <span>{plan.location}</span>
        </div>
        <div className="flex items-center">
          <Clock className="w-5 h-5 mr-1 text-primary" />
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
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <span className="text-forest font-semibold">{plan.rating}</span>
        <span className="text-gray-500">({plan.reviews} reseñas)</span>
      </div>

      {/* Description */}
      <div className="pt-4 border-t">
        <h2 className="text-xl font-semibold text-forest mb-3">Descripción</h2>
        <p className="text-gray-700 leading-relaxed">{plan.description}</p>
      </div>
    </div>
  );
}
