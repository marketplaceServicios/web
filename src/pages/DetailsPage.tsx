import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { getPlanById, getPlanFechasLlenas } from "@/lib/api";
import type { Plan } from "@/data/mockData";
import ImageGallery from "@/components/details/ImageGallery";
import ServiceInfo from "@/components/details/ServiceInfo";
import Amenities from "@/components/details/Amenities";
import PriceCalendar from "@/components/details/PriceCalendar";
import PlanIncludes from "@/components/details/PlanIncludes";
import QuoteForm from "@/components/details/QuoteForm";

export default function DetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<number>(0);
  const [fechasLlenas, setFechasLlenas] = useState<string[]>([]);

  const handleDateSelect = (isoDate: string, price: number) => {
    setSelectedDate(isoDate);
    setSelectedPrice(price);
  };

  useEffect(() => {
    if (!id) { setLoading(false); return; }
    getPlanById(id)
      .then((p) => {
        setPlan(p);
        setLoading(false);
        getPlanFechasLlenas(id).then(setFechasLlenas);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="text-stormy text-lg">Cargando plan...</p>
      </div>
    );
  }

  if (!plan) {
    return <Navigate to="/planes" replace />;
  }

  return (
    <div className="bg-cream min-h-screen">
      {/* Hero */}
      <section className="relative h-[220px] md:h-[260px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${plan.image})` }}
        >
          <div className="absolute inset-0 bg-primary/60" />
        </div>
        <div className="relative container h-full flex items-center px-4 md:px-6">
          <div className="min-w-0">
            <span className="inline-block bg-sage text-white px-3 py-1 rounded-full text-sm font-medium mb-2">
              {plan.category}
            </span>
            <h1 className="text-2xl md:text-4xl font-serif font-bold text-white leading-tight">
              {plan.title}
            </h1>
            <p className="text-cream/80 text-sm md:text-base">{plan.location}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Gallery */}
              <ImageGallery images={plan.images} title={plan.title} />

              {/* Service Info */}
              <div className="bg-white rounded-xl p-6 border">
                <ServiceInfo plan={plan} />
                <Amenities amenities={plan.amenities} />
              </div>

              {/* Calendar */}
              <PriceCalendar
                price={plan.price}
                disponibilidad={plan.disponibilidad}
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
                fechasLlenas={fechasLlenas}
              />

              {/* Quote Form */}
              <QuoteForm planId={plan.id} planTitle={plan.title} />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <PlanIncludes
                plan={plan}
                selectedDate={selectedDate}
                selectedPrice={selectedPrice || plan.price}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
