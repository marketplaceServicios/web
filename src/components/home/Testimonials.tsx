import { Card, CardContent } from "@/components/ui/card";
import { testimonials } from "@/data/mockData";
import { Star, Quote } from "lucide-react";

export default function Testimonials() {
  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-serif font-bold text-primary mb-2">
            Lo que dicen quienes ya vivieron la experiencia
          </h2>
          <p className="text-stormy">
            Testimonios de momentos que permanecen en la memoria
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="relative">
              <CardContent className="p-6">
                {/* Quote Icon */}
                <Quote className="w-10 h-10 text-sage/30 mb-4" />

                {/* Text */}
                <p className="text-gray-700 mb-6 italic font-serif">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <p className="font-semibold text-primary">
                      {testimonial.name}
                    </p>
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
          ))}
        </div>
      </div>
    </section>
  );
}
