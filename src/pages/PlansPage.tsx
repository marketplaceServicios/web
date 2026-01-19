import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import PlansGrid from "@/components/plans/PlansGrid";
import { categories, getPlansByCategory } from "@/data/mockData";

export default function PlansPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryId = searchParams.get("categoria") || "all";

  const filteredPlans = useMemo(() => {
    return getPlansByCategory(categoryId);
  }, [categoryId]);

  const currentCategory = categories.find((cat) => cat.id === categoryId);

  const handleCategoryChange = (newCategoryId: string) => {
    if (newCategoryId === "all") {
      searchParams.delete("categoria");
    } else {
      searchParams.set("categoria", newCategoryId);
    }
    setSearchParams(searchParams);
  };

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative h-[300px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              currentCategory?.image
                ? `url(${currentCategory.image})`
                : "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920')",
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative container h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {categoryId === "all"
                ? "Escapa a la aventura!"
                : `Planes de ${currentCategory?.name || "Viaje"}`}
            </h1>
            <p className="text-lg text-white/90">
              Descubre los mejores destinos para tu próximo viaje
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Plans */}
      <section className="py-12 bg-cream">
        <div className="container">
          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    categoryId === category.id
                      ? "bg-primary text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Plans Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              <span className="font-semibold text-forest">
                {filteredPlans.length}
              </span>{" "}
              planes disponibles
            </p>
          </div>

          {/* Plans Grid */}
          <PlansGrid plans={filteredPlans} />
        </div>
      </section>
    </div>
  );
}
