import { useState, useEffect, useCallback } from "react";
import { X, Loader2 } from "lucide-react";
import Experience360Card from "@/components/experiencias360/Experience360Card";
import { getExperiencias360, type Experience360 } from "@/lib/api";

export default function Experiencias360Page() {
  const [experiences360, setExperiences360] = useState<Experience360[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedExperience, setSelectedExperience] =
    useState<Experience360 | null>(null);

  useEffect(() => {
    getExperiencias360()
      .then(setExperiences360)
      .catch(() => setExperiences360([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (selectedExperience) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedExperience]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setSelectedExperience(null);
    }
  }, []);

  useEffect(() => {
    if (selectedExperience) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedExperience, handleKeyDown]);

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative h-[300px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920')",
          }}
        >
          <div className="absolute inset-0 bg-primary/60" />
        </div>
        <div className="relative container h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              Experiencias 360°
            </h1>
            <p className="text-lg text-cream/90 max-w-2xl mx-auto">
              Explora nuestros destinos de forma inmersiva. Haz clic en
              cualquier experiencia para recorrerla en 360 grados.
            </p>
          </div>
        </div>
      </section>

      {/* Cards Grid */}
      <section className="py-16 bg-cream">
        <div className="container">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-golden" />
            </div>
          ) : experiences360.length === 0 ? (
            <p className="text-center text-stormy py-12">
              No hay experiencias disponibles en este momento.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {experiences360.map((experience) => (
                <Experience360Card
                  key={experience.id}
                  experience={experience}
                  onClick={() => setSelectedExperience(experience)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {selectedExperience && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedExperience(null);
            }
          }}
        >
          <div className="relative w-full max-w-6xl h-[80vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-serif font-bold text-primary text-xl">
                {selectedExperience.title}
              </h2>
              <button
                onClick={() => setSelectedExperience(null)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5 text-stormy" />
              </button>
            </div>

            {/* Iframe */}
            <div className="flex-1 relative">
              <iframe
                src={selectedExperience.iframeSrc}
                title={`Experiencia 360: ${selectedExperience.title}`}
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allowFullScreen
                allow="xr-spatial-tracking; gyroscope; accelerometer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
