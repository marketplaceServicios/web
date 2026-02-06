import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getFeaturedPlans } from "@/data/mockData";
import { MapPin, Star } from "lucide-react";

export default function PopularPlans() {
  const plans = getFeaturedPlans().slice(0, 3);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="py-16 bg-cream">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-serif font-bold text-primary mb-2">
            Experiencias populares
          </h2>
          <p className="text-stormy">
            Momentos elegidos por quienes saben distinguir lo verdaderamente importante
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className="overflow-hidden hover:shadow-lg transition-shadow border-2 border-transparent hover:border-golden"
            >
              {/* Image */}
              <div className="relative h-48">
                <img
                  src={plan.image}
                  alt={plan.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-sage text-white px-3 py-1 rounded-full text-xs font-medium">
                  {plan.category}
                </div>
              </div>

              <CardContent className="p-5">
                <h3 className="text-xl font-serif font-semibold text-primary mb-2">
                  {plan.title}
                </h3>

                <div className="flex items-center text-stormy text-sm mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{plan.location}</span>
                </div>

                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(plan.rating)
                            ? "text-golden fill-golden"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-stormy">
                    ({plan.reviews} reseñas)
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-stormy">Desde</span>
                    <p className="text-xl font-bold text-golden">
                      {formatPrice(plan.price)}
                    </p>
                  </div>
                  <Link to={`/planes/${plan.id}`}>
                    <Button variant="outline" size="sm">
                      Ver más
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/planes">
            <Button size="lg" variant="secondary">
              Ver todas las experiencias
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
