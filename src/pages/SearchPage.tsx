import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, Loader2 } from "lucide-react";
import {
  getPlans,
  getCategories,
  getExperiencias360,
  type Experience360,
} from "@/lib/api";
import type { Category, Plan } from "@/data/mockData";
import PlanCard from "@/components/plans/PlanCard";
import { handleImgError } from "@/lib/imageUtils";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [inputValue, setInputValue] = useState(query);

  const [plans, setPlans] = useState<Plan[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [experiences, setExperiences] = useState<Experience360[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  useEffect(() => {
    if (!query.trim()) {
      setPlans([]);
      setCategories([]);
      setExperiences([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const q = query.toLowerCase();

    Promise.all([
      getPlans({ q: query, limit: 12 }).catch(() => ({ data: [] })),
      getCategories().catch(() => []),
      getExperiencias360().catch(() => []),
    ]).then(([plansResult, allCategories, allExperiences]) => {
      setPlans("data" in plansResult ? plansResult.data : []);

      setCategories(
        allCategories.filter(
          (c) =>
            c.name.toLowerCase().includes(q) ||
            c.description.toLowerCase().includes(q)
        )
      );

      setExperiences(
        allExperiences.filter(
          (e) =>
            e.title.toLowerCase().includes(q) ||
            e.description.toLowerCase().includes(q)
        )
      );

      setLoading(false);
    });
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setSearchParams({ q: inputValue.trim() });
    }
  };

  const totalResults = plans.length + categories.length + experiences.length;

  return (
    <div className="min-h-screen bg-cream">
      {/* Search Header */}
      <section className="bg-primary py-10">
        <div className="container">
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-white mb-6 text-center">
            Buscar
          </h1>
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stormy/50" />
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Busca planes, categorías, experiencias..."
                className="w-full h-14 pl-12 pr-4 rounded-2xl border-0 bg-white text-primary placeholder:text-stormy/50 focus:outline-none focus:ring-2 focus:ring-golden/50 text-lg"
                autoFocus
              />
            </div>
          </form>
        </div>
      </section>

      <div className="container py-10">
        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-golden" />
          </div>
        ) : !query.trim() ? (
          <p className="text-center text-stormy py-16 text-lg">
            Escribe algo para buscar entre planes, categorías y experiencias.
          </p>
        ) : totalResults === 0 ? (
          <div className="text-center py-16">
            <p className="text-stormy text-lg mb-2">
              No encontramos resultados para "{query}"
            </p>
            <p className="text-stormy/70 text-sm">
              Intenta con otras palabras clave o explora nuestros{" "}
              <Link to="/planes" className="text-golden hover:underline">
                planes
              </Link>
              .
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Results summary */}
            <p className="text-stormy text-sm">
              {totalResults} resultado{totalResults !== 1 ? "s" : ""} para "
              {query}"
            </p>

            {/* Plans */}
            {plans.length > 0 && (
              <section>
                <h2 className="font-serif font-bold text-primary text-xl mb-4">
                  Planes ({plans.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {plans.map((plan) => (
                    <PlanCard key={plan.id} plan={plan} />
                  ))}
                </div>
              </section>
            )}

            {/* Categories */}
            {categories.length > 0 && (
              <section>
                <h2 className="font-serif font-bold text-primary text-xl mb-4">
                  Categorías ({categories.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/planes/categoria/${cat.slug}`}
                      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="relative h-32 overflow-hidden">
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={handleImgError}
                        />
                        <div className="absolute inset-0 bg-primary/30" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-serif font-bold text-primary">
                          {cat.name}
                        </h3>
                        {cat.description && (
                          <p className="text-sm text-stormy line-clamp-2 mt-1">
                            {cat.description}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Experiences 360 */}
            {experiences.length > 0 && (
              <section>
                <h2 className="font-serif font-bold text-primary text-xl mb-4">
                  Experiencias 360 ({experiences.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {experiences.map((exp) => (
                    <Link
                      key={exp.id}
                      to="/experiencias-360"
                      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="relative h-32 overflow-hidden">
                        <img
                          src={exp.thumbnail}
                          alt={exp.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={handleImgError}
                        />
                        <div className="absolute top-2 right-2 bg-golden text-white px-2 py-0.5 rounded-full text-xs font-semibold">
                          360°
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-serif font-bold text-primary">
                          {exp.title}
                        </h3>
                        {exp.description && (
                          <p className="text-sm text-stormy line-clamp-2 mt-1">
                            {exp.description}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
