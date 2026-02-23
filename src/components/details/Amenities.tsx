import {
  Bus, Utensils, UserCheck, Camera, Home, Sparkles,
  Heart, Wifi, Shield, Coffee, Waves, Car,
  Music, ShoppingBag, Accessibility, Star,
  Compass, Leaf, BookOpen, Activity,
} from "lucide-react";

interface AmenitiesProps {
  amenities: string[];
}

const amenityIcons: Record<string, { icon: React.ElementType; label: string }> = {
  transport:     { icon: Bus,           label: "Transporte" },
  food:          { icon: Utensils,      label: "Alimentación" },
  guide:         { icon: UserCheck,     label: "Guía turístico" },
  photos:        { icon: Camera,        label: "Fotos" },
  hotel:         { icon: Home,          label: "Alojamiento" },
  breakfast:     { icon: Coffee,        label: "Desayuno" },
  spa:           { icon: Sparkles,      label: "SPA" },
  pool:          { icon: Waves,         label: "Piscina" },
  medical:       { icon: Heart,         label: "Asistencia médica" },
  insurance:     { icon: Shield,        label: "Seguro de viaje" },
  wifi:          { icon: Wifi,          label: "WiFi" },
  parking:       { icon: Car,           label: "Parqueadero" },
  entertainment: { icon: Music,         label: "Entretenimiento" },
  shopping:      { icon: ShoppingBag,   label: "Compras" },
  accessibility: { icon: Accessibility, label: "Silla de ruedas" },
  tour:          { icon: Compass,       label: "Recorrido guiado" },
  wellness:      { icon: Leaf,          label: "Bienestar" },
  activities:    { icon: Activity,      label: "Actividades" },
  workshop:      { icon: BookOpen,      label: "Taller / Clase" },
  dinner:        { icon: Star,          label: "Cena incluida" },
  // legacy keys (mockData)
  restaurant:    { icon: Utensils,      label: "Alimentación" },
};

export default function Amenities({ amenities }: AmenitiesProps) {
  if (!amenities || amenities.length === 0) return null;

  return (
    <div className="pt-4 border-t">
      <h2 className="text-xl font-semibold text-forest mb-4">Servicios incluidos</h2>
      <div className="flex flex-wrap gap-3">
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
