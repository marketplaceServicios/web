import HeroBanner from "@/components/home/HeroBanner";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedOffer from "@/components/home/FeaturedOffer";
import PopularPlans from "@/components/home/PopularPlans";
import Testimonials from "@/components/home/Testimonials";

export default function HomePage() {
  return (
    <div>
      <HeroBanner />
      <CategoryGrid />
      <FeaturedOffer />
      <PopularPlans />
      <Testimonials />
    </div>
  );
}
