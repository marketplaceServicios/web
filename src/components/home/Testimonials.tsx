import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { getTestimonials } from "@/lib/api";
import type { Testimonial } from "@/data/mockData";
import { Star, Quote } from "lucide-react";
import { handleImgError } from "@/lib/imageUtils";

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="relative h-full">
      <CardContent className="p-6 flex flex-col h-full">
        {/* Quote Icon */}
        <Quote className="w-10 h-10 text-sage/30 mb-4" />

        {/* Text */}
        <p className="text-gray-700 mb-6 italic font-serif flex-1">
          "{testimonial.text}"
        </p>

        {/* Author */}
        <div className="flex items-center">
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full object-cover mr-4"
            onError={handleImgError}
          />
          <div>
            <p className="font-semibold text-primary">
              {testimonial.name}
            </p>
            {testimonial.city && (
              <p className="text-sm text-stormy">{testimonial.city}</p>
            )}
            <div className="flex items-center mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < testimonial.rating
                      ? "text-golden fill-golden"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    getTestimonials()
      .then(setTestimonials)
      .catch(() => setTestimonials([]));
  }, []);

  if (testimonials.length === 0) return null;

  const useSlider = testimonials.length > 3;
  // Duration scales with number of items for consistent speed
  const duration = testimonials.length * 6;

  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-serif font-bold text-primary mb-2">
            Historias reales, decisiones más tranquilas
          </h2>
          <p className="text-stormy">
            Experiencias contadas por quienes ya viajaron o celebraron. Porque la confianza también se construye escuchando.
          </p>
        </div>

        {useSlider ? (
          <div
            className="overflow-hidden rounded-xl"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              className="flex gap-6 w-max"
              style={{
                animation: `scroll-testimonials ${duration}s linear infinite`,
                animationPlayState: isPaused ? "paused" : "running",
              }}
            >
              {[...testimonials, ...testimonials].map((testimonial, i) => (
                <div key={`${testimonial.id}-${i}`} className="w-[360px] flex-shrink-0">
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>

            <style>{`
              @keyframes scroll-testimonials {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
            `}</style>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
