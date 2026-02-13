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
          <div className="absolute inset-0 bg-primary/60" />
        </div>
        <div className="relative container h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              {categoryId === "all"
                ? "Explora planes con calma"
                : `${currentCategory?.name || "Planes"}`}
            </h1>
            <p className="text-lg text-cream/90">
              Filtra por categoría y elige con información clara. Si necesitas ayuda, te acompañamos.
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
                      ? "bg-golden text-white"
                      : "bg-white text-primary hover:bg-sage hover:text-white"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Plans Count */}
          <div className="mb-6">
            <p className="text-stormy">
              <span className="font-semibold text-primary">
                {filteredPlans.length}
              </span>{" "}
              experiencias disponibles
            </p>
          </div>

          {/* Plans Grid */}
          {filteredPlans.length > 0 ? (
            <PlansGrid plans={filteredPlans} />
          ) : (
            <div className="text-center py-16">
              <p className="text-stormy text-lg mb-4">
                No encontramos planes con esos filtros. Prueba con otra categoría o escríbenos y te orientamos.
              </p>
              <a
                href="https://wa.me/573001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-golden text-white rounded-lg font-medium hover:bg-golden/90 transition-colors"
              >
                Hablar con un asesor
              </a>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
