import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { Search, Loader2, X, ChevronDown } from "lucide-react";
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

const PRICE_RANGES = [
  { key: "all", label: "Todos los precios", min: undefined, max: undefined },
  { key: "0-500k", label: "$0 - $500K", min: 0, max: 500000 },
  { key: "500k-1m", label: "$500K - $1M", min: 500000, max: 1000000 },
  { key: "1m-2m", label: "$1M - $2M", min: 1000000, max: 2000000 },
  { key: "2m-5m", label: "$2M - $5M", min: 2000000, max: 5000000 },
  { key: "5m+", label: "$5M+", min: 5000000, max: undefined },
] as const;

const CATEGORY_EMOJIS: Record<string, string> = {
  all: "\u{1F3F7}\uFE0F",
  "bodas-silver": "\u{1F48D}",
  celebraciones: "\u{1F38A}",
  servicios: "\u{1F33F}",
  "viajes-silver": "\u2708\uFE0F",
};

export default function PlansPage() {
  const { slug } = useParams<{ slug?: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const legacyCategoriaId = searchParams.get("categoria");

  const [categories, setCategories] = useState<Category[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [precioRange, setPrecioRange] = useState("all");

  const { ref: sentinelRef, inView } = useInView({ threshold: 0 });

  const filterKey = `${slug || "all"}|${debouncedQuery}|${precioRange}`;
  const prevFilterKey = useRef(filterKey);

  // Load categories
  useEffect(() => {
    getCategories().then(setCategories).catch(() => {});
  }, []);

  // Handle legacy redirect
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

        const range = PRICE_RANGES.find((r) => r.key === precioRange);

        const result = await getPlans({
          page: pageNum,
          limit: LIMIT,
          categoriaId: activeCategory ? activeCategory.id : undefined,
          q: debouncedQuery || undefined,
          precioMin: range?.min,
          precioMax: range?.max,
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
    [slug, categories, debouncedQuery, precioRange]
  );

  // Trigger fetch on page/filter change
  useEffect(() => {
    if (legacyCategoriaId) return;
    fetchPlans(page);
  }, [page, fetchPlans, legacyCategoriaId]);

  // Infinite scroll
  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      setPage((p) => p + 1);
    }
  }, [inView, hasMore, isLoading]);

  const allCategories = [ALL_CATEGORY, ...categories];
  const activeSlug = slug || "all";
  const currentCategory = allCategories.find((cat) => cat.slug === activeSlug);
  const currentRange = PRICE_RANGES.find((r) => r.key === precioRange);

  const handleCategoryChange = (newSlug: string) => {
    if (newSlug === "all") {
      navigate("/planes");
    } else {
      navigate(`/planes/categoria/${newSlug}`);
    }
  };

  const hasActiveFilters =
    activeSlug !== "all" || precioRange !== "all" || debouncedQuery;

  const handleClearAll = () => {
    setSearchQuery("");
    setPrecioRange("all");
    navigate("/planes");
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
              Filtra por categor&iacute;a y elige con informaci&oacute;n clara. Si necesitas
              ayuda, te acompa&ntilde;amos.
            </p>
          </div>
        </div>
      </section>

      {/* Floating Filter Card */}
      <div className="container -mt-16 relative z-10 px-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
          {/* Row 1: Search + Price Dropdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stormy/50" />
              <input
                type="text"
                placeholder="\u{1F4CD} \u00BFA d\u00F3nde quieres ir? Ej: Cartagena, San Andr\u00E9s..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-primary placeholder:text-stormy/50 focus:outline-none focus:ring-2 focus:ring-golden/50 focus:bg-white transition-colors"
              />
            </div>
            <div className="relative">
              <select
                value={precioRange}
                onChange={(e) => setPrecioRange(e.target.value)}
                className="w-full appearance-none pl-4 pr-10 py-3 rounded-xl border border-gray-200 bg-gray-50 text-primary text-sm font-medium focus:outline-none focus:ring-2 focus:ring-golden/50 focus:bg-white transition-colors cursor-pointer"
              >
                {PRICE_RANGES.map((range) => (
                  <option key={range.key} value={range.key}>
                    {range.key === "all"
                      ? "\u{1F3F7}\uFE0F Precio: Todos los rangos"
                      : `\u{1F3F7}\uFE0F Precio: ${range.label}`}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-stormy/50 pointer-events-none" />
            </div>
          </div>

          {/* Row 2: Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <div className="flex gap-2 flex-nowrap">
              {allCategories.map((category) => {
                const emoji =
                  CATEGORY_EMOJIS[category.slug] || "\u{1F3F7}\uFE0F";
                return (
                  <button
                    key={category.slug}
                    onClick={() => handleCategoryChange(category.slug)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                      activeSlug === category.slug
                        ? "bg-golden text-white shadow-sm"
                        : "bg-gray-100 text-primary hover:bg-gray-200"
                    }`}
                  >
                    <span>{emoji}</span>
                    {category.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 3: Active Filters */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 flex-wrap pt-1 border-t border-gray-100">
              <span className="text-xs font-medium text-stormy/70 mr-1">
                Filtros activos:
              </span>

              {activeSlug !== "all" && currentCategory && (
                <button
                  onClick={() => navigate("/planes")}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-golden/10 text-golden text-xs font-medium hover:bg-golden/20 transition-colors"
                >
                  {currentCategory.name}
                  <X className="w-3 h-3" />
                </button>
              )}

              {precioRange !== "all" && currentRange && (
                <button
                  onClick={() => setPrecioRange("all")}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-golden/10 text-golden text-xs font-medium hover:bg-golden/20 transition-colors"
                >
                  Precio: {currentRange.label}
                  <X className="w-3 h-3" />
                </button>
              )}

              {debouncedQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-golden/10 text-golden text-xs font-medium hover:bg-golden/20 transition-colors"
                >
                  B&uacute;squeda: {debouncedQuery}
                  <X className="w-3 h-3" />
                </button>
              )}

              <button
                onClick={handleClearAll}
                className="text-xs text-stormy/60 hover:text-stormy underline ml-1 transition-colors"
              >
                Limpiar todo
              </button>

              <span className="ml-auto text-xs text-stormy/70">
                <span className="font-semibold text-primary">
                  {totalResults}
                </span>{" "}
                experiencias encontradas
              </span>
            </div>
          )}

          {/* Results count when no active filters */}
          {!hasActiveFilters && totalResults > 0 && (
            <div className="text-right">
              <span className="text-xs text-stormy/70">
                <span className="font-semibold text-primary">
                  {totalResults}
                </span>{" "}
                experiencias encontradas
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Plans Grid */}
      <section className="pt-8 pb-12 bg-cream">
        <div className="container">
          {plans.length > 0 ? (
            <PlansGrid plans={plans} />
          ) : !isLoading ? (
            <div className="text-center py-16">
              <p className="text-stormy text-lg mb-4">
                No encontramos planes con esos filtros. Prueba con otra
                categor&iacute;a o escr&iacute;benos y te orientamos.
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

          {isLoading && (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-golden" />
            </div>
          )}

          {hasMore && !isLoading && <div ref={sentinelRef} className="h-4" />}
        </div>
      </section>
    </div>
  );
}
