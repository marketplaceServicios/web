import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getOfferPlans } from "@/data/mockData";
import { Clock } from "lucide-react";

export default function FeaturedOffer() {
  const offers = getOfferPlans();
  const featuredOffer = offers[0];

  if (!featuredOffer) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="relative rounded-2xl overflow-hidden bg-primary">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Image */}
            <div className="relative h-64 md:h-auto">
              <img
                src={featuredOffer.image}
                alt={featuredOffer.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Badge */}
              <div className="absolute top-4 left-4 bg-golden text-white px-4 py-1 rounded-full text-sm font-semibold">
                EXPERIENCIA DESTACADA
              </div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                {featuredOffer.title}
              </h2>
              <p className="text-cream/80 mb-6">{featuredOffer.description}</p>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center text-cream/80">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{featuredOffer.duration}</span>
                </div>
              </div>

              <div className="flex items-baseline gap-3 mb-6">
                {featuredOffer.originalPrice && (
                  <span className="text-cream/60 line-through text-lg">
                    {formatPrice(featuredOffer.originalPrice)}
                  </span>
                )}
                <span className="text-3xl font-bold text-golden">
                  {formatPrice(featuredOffer.price)}
                </span>
              </div>

              <Link to={`/planes/${featuredOffer.id}`}>
                <Button size="lg" className="w-full md:w-auto">
                  Ver experiencia
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
