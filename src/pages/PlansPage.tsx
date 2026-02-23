import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { Search, Loader2 } from "lucide-react";
import PlansGrid from "@/components/plans/PlansGrid";
import { getCategories, getPlans } from "@/lib/api";
import type { Category, Plan } from "@/data/mockData";
import { FALLBACK_IMAGE } from "@/lib/imageUtils";

const ALL_CATEGORY: Category = {
  id: "all",
  name: "Todos",
  slug: "all",
  image: "",
  description: "",
};

const LIMIT = 20;

export default function PlansPage() {
  const { slug } = useParams<{ slug?: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Redirect old ?categoria=ID links to slug-based URLs
  const legacyCategoriaId = searchParams.get("categoria");

  const [categories, setCategories] = useState<Category[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [precioMin, setPrecioMin] = useState("");
  const [precioMax, setPrecioMax] = useState("");

  // Intersection observer for infinite scroll
  const { ref: sentinelRef, inView } = useInView({ threshold: 0 });

  // Track current filter state to detect changes
  const filterKey = `${slug || "all"}|${debouncedQuery}|${precioMin}|${precioMax}`;
  const prevFilterKey = useRef(filterKey);

  // Load categories
  useEffect(() => {
    getCategories().then(setCategories).catch(() => {});
  }, []);

  // Handle legacy redirect: ?categoria=ID → /planes/categoria/:slug
  useEffect(() => {
    if (legacyCategoriaId && categories.length > 0) {
      const found = categories.find((c) => c.id === legacyCategoriaId);
      if (found) {
        navigate(`/planes/categoria/${found.slug}`, { replace: true });
      } else {
        navigate("/planes", { replace: true });
      }
    }
  }, [legacyCategoriaId, categories, navigate]);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Reset when filters change
  useEffect(() => {
    if (filterKey !== prevFilterKey.current) {
      prevFilterKey.current = filterKey;
      setPlans([]);
      setPage(1);
      setHasMore(true);
    }
  }, [filterKey]);

  // Fetch plans
  const fetchPlans = useCallback(
    async (pageNum: number) => {
      setIsLoading(true);
      try {
        const activeSlug = slug || "all";
        const activeCategory =
          activeSlug !== "all"
            ? categories.find((c) => c.slug === activeSlug)
            : null;

        const result = await getPlans({
          page: pageNum,
          limit: LIMIT,
          categoriaId: activeCategory ? activeCategory.id : undefined,
          q: debouncedQuery || undefined,
          precioMin: precioMin ? Number(precioMin) : undefined,
          precioMax: precioMax ? Number(precioMax) : undefined,
        });

        setPlans((prev) =>
          pageNum === 1 ? result.data : [...prev, ...result.data]
        );
        setTotalResults(result.total);
        setHasMore(pageNum < result.totalPages);
      } catch {
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    },
    [slug, categories, debouncedQuery, precioMin, precioMax]
  );

  // Trigger fetch on page/filter change
  useEffect(() => {
    if (legacyCategoriaId) return; // wait for redirect
    fetchPlans(page);
  }, [page, fetchPlans, legacyCategoriaId]);

  // Infinite scroll: load next page when sentinel is in view
  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      setPage((p) => p + 1);
    }
  }, [inView, hasMore, isLoading]);

  const allCategories = [ALL_CATEGORY, ...categories];
  const activeSlug = slug || "all";
  const currentCategory = allCategories.find((cat) => cat.slug === activeSlug);

  const handleCategoryChange = (newSlug: string) => {
    if (newSlug === "all") {
      navigate("/planes");
    } else {
      navigate(`/planes/categoria/${newSlug}`);
    }
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
                ? `url(${currentCategory.image}), url(${FALLBACK_IMAGE})`
                : "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920')",
          }}
        >
          <div className="absolute inset-0 bg-primary/60" />
        </div>
        <div className="relative container h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              {activeSlug === "all"
                ? "Explora planes con calma"
                : `${currentCategory?.name || "Planes"}`}
            </h1>
            <p className="text-lg text-cream/90">
              Filtra por categoría y elige con información clara. Si necesitas
              ayuda, te acompañamos.
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Plans */}
      <section className="py-12 bg-cream">
        <div className="container">
          {/* Search Bar */}
          <div className="mb-6 flex justify-center">
            <div className="relative w-full max-w-lg">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-stormy" />
              <input
                type="text"
                placeholder="Buscar por destino o nombre..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 bg-white text-primary placeholder:text-stormy/60 focus:outline-none focus:ring-2 focus:ring-golden/50"
              />
            </div>
          </div>

          {/* Price Filter */}
          <div className="mb-6 flex justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <label className="text-sm text-stormy font-medium">Precio min</label>
              <input
                type="number"
                placeholder="$ 0"
                value={precioMin}
                onChange={(e) => setPrecioMin(e.target.value)}
                className="w-32 px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-primary focus:outline-none focus:ring-2 focus:ring-golden/50"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm text-stormy font-medium">Precio max</label>
              <input
                type="number"
                placeholder="$ 5,000,000"
                value={precioMax}
                onChange={(e) => setPrecioMax(e.target.value)}
                className="w-32 px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-primary focus:outline-none focus:ring-2 focus:ring-golden/50"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {allCategories.map((category) => (
                <button
                  key={category.slug}
                  onClick={() => handleCategoryChange(category.slug)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeSlug === category.slug
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
                {totalResults}
              </span>{" "}
              experiencias disponibles
            </p>
          </div>

          {/* Plans Grid */}
          {plans.length > 0 ? (
            <PlansGrid plans={plans} />
          ) : !isLoading ? (
            <div className="text-center py-16">
              <p className="text-stormy text-lg mb-4">
                No encontramos planes con esos filtros. Prueba con otra
                categoría o escríbenos y te orientamos.
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
          ) : null}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-golden" />
            </div>
          )}

          {/* Infinite scroll sentinel */}
          {hasMore && !isLoading && <div ref={sentinelRef} className="h-4" />}
        </div>
      </section>
    </div>
  );
}
