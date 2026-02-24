import { Eye } from "lucide-react";
import type { Experience360 } from "@/data/experiences360Data";
import { handleImgError } from "@/lib/imageUtils";

interface Experience360CardProps {
  experience: Experience360;
  onClick: () => void;
}

export default function Experience360Card({
  experience,
  onClick,
}: Experience360CardProps) {
  return (
    <button
      onClick={onClick}
      className="group block rounded-2xl bg-white hover:shadow-lg transition-all duration-300 text-left w-full overflow-hidden"
    >
      {/* Image */}
      <div className="relative overflow-hidden rounded-t-2xl">
        <img
          src={experience.thumbnail}
          alt={experience.title}
          className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-300"
          onError={handleImgError}
        />

        {/* 360 Badge */}
        <div className="absolute top-3 right-3 bg-golden text-white px-3 py-1 rounded-full text-xs font-semibold">
          360°
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-4">
            <Eye className="w-6 h-6 text-primary" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-2">
        <h3 className="font-serif font-bold text-primary text-lg leading-snug">
          {experience.title}
        </h3>
        <p className="text-sm text-stormy line-clamp-2">
          {experience.description}
        </p>
        <div className="pt-2">
          <span className="inline-flex items-center gap-1.5 text-golden text-sm font-medium">
            <Eye className="w-4 h-4" />
            Ver experiencia 360°
          </span>
        </div>
      </div>
    </button>
  );
}
