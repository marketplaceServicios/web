import { Link } from "react-router-dom";
import { categories } from "@/data/mockData";

export default function CategoryGrid() {
  const displayCategories = categories.filter((c) => c.id !== "all");

  return (
    <section className="py-16 bg-cream">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-serif font-bold text-primary mb-2">
            ¿Qué quieres vivir?
          </h2>
          <p className="text-stormy max-w-2xl mx-auto">
            Elige una categoría y mira opciones claras, con fotos reales y
            detalles útiles para decidir con calma.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {displayCategories.map((category) => (
            <Link
              key={category.id}
              to={`/planes?categoria=${category.id}`}
              className="group relative aspect-square rounded-xl overflow-hidden"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundImage: `url(${category.image})` }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <span className="text-white font-semibold text-lg text-center mb-2">
                  {category.name}
                </span>
                <span className="text-white/70 text-xs text-center hidden md:block">
                  {category.description}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/categorias"
            className="text-golden font-medium hover:underline"
          >
            Ver categorías
          </Link>
        </div>
      </div>
    </section>
  );
}
