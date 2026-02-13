import CategoriesGrid from "@/components/categories/CategoriesGrid";

export default function CategoriesPage() {
  return (
    <div>
      {/* Hero Banner */}
      <section className="relative h-[300px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920')",
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative container h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              ¿Qué quieres vivir?
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Elige una categoría y encuentra opciones claras, con fotos reales y detalles útiles para decidir con calma.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 bg-cream">
        <div className="container">
          <CategoriesGrid />
        </div>
      </section>
    </div>
  );
}
