import { useState, useEffect } from "react";
import HeroBanner from "@/components/home/HeroBanner";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedOffer from "@/components/home/FeaturedOffer";
import PopularPlans from "@/components/home/PopularPlans";
import Testimonials from "@/components/home/Testimonials";
import { getCategories, getFeaturedPlans, getOfferPlans } from "@/lib/api";
import type { Category, Plan } from "@/data/mockData";

export default function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredPlans, setFeaturedPlans] = useState<Plan[]>([]);
  const [offerPlan, setOfferPlan] = useState<Plan | null>(null);

  useEffect(() => {
    getCategories().then(setCategories).catch(() => {});
    getFeaturedPlans().then(setFeaturedPlans).catch(() => {});
    getOfferPlans().then((plans) => setOfferPlan(plans[0] ?? null)).catch(() => {});
  }, []);

  return (
    <div>
      <HeroBanner />
      <CategoryGrid categories={categories} />
      <FeaturedOffer offer={offerPlan} />
      <PopularPlans plans={featuredPlans} />
      <Testimonials />
    </div>
  );
}
