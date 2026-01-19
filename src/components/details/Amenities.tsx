import { Bus, Utensils, Sparkles, Camera, UserCheck } from "lucide-react";

interface AmenitiesProps {
  amenities: string[];
}

const amenityIcons: Record<string, { icon: React.ElementType; label: string }> = {
  transport: { icon: Bus, label: "Transporte" },
  restaurant: { icon: Utensils, label: "Alimentación" },
  spa: { icon: Sparkles, label: "SPA" },
  photos: { icon: Camera, label: "Fotos" },
  guide: { icon: UserCheck, label: "Guía turístico" },
};

export default function Amenities({ amenities }: AmenitiesProps) {
  return (
    <div className="pt-4 border-t">
      <h2 className="text-xl font-semibold text-forest mb-4">Servicios incluidos</h2>
      <div className="flex flex-wrap gap-4">
        {amenities.map((amenity) => {
          const config = amenityIcons[amenity];
          if (!config) return null;
          const Icon = config.icon;
          return (
            <div
              key={amenity}
              className="flex items-center gap-2 bg-cream px-4 py-2 rounded-lg"
            >
              <Icon className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-gray-700">
                {config.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
