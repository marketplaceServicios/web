import { useParams, Navigate } from "react-router-dom";
import { getPlanById } from "@/data/mockData";
import ImageGallery from "@/components/details/ImageGallery";
import ServiceInfo from "@/components/details/ServiceInfo";
import Amenities from "@/components/details/Amenities";
import PriceCalendar from "@/components/details/PriceCalendar";
import PlanIncludes from "@/components/details/PlanIncludes";
import QuoteForm from "@/components/details/QuoteForm";

export default function DetailsPage() {
  const { id } = useParams<{ id: string }>();
  const plan = id ? getPlanById(id) : undefined;

  if (!plan) {
    return <Navigate to="/planes" replace />;
  }

  return (
    <div className="bg-cream min-h-screen">
      {/* Hero */}
      <section className="relative h-[200px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${plan.image})` }}
        >
          <div className="absolute inset-0 bg-primary/60" />
        </div>
        <div className="relative container h-full flex items-center">
          <div>
            <span className="inline-block bg-sage text-white px-3 py-1 rounded-full text-sm font-medium mb-2">
              {plan.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-white">
              {plan.title}
            </h1>
            <p className="text-cream/80">{plan.location}</p>
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
              <PriceCalendar price={plan.price} startDate={plan.startDate} />

              {/* Quote Form */}
              <QuoteForm />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <PlanIncludes plan={plan} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
