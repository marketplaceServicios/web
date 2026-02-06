import { Link } from "react-router-dom";
import { categories } from "@/data/mockData";

export default function CategoryGrid() {
  return (
    <section className="py-16 bg-cream">
      <div className="container">
        <h2 className="text-3xl font-serif font-bold text-primary text-center mb-10">
          CATEGORÍAS
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
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
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-semibold text-lg text-center px-2">
                  {category.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
