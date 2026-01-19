import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Category } from "@/data/mockData";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <div className="relative group rounded-xl overflow-hidden aspect-[4/3]">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${category.image})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
        <p className="text-white/80 text-sm mb-4">{category.description}</p>
        <Link to={`/planes?categoria=${category.id}`}>
          <Button variant="outline" className="bg-white/10 border-white text-white hover:bg-white hover:text-forest">
            Ver planes
          </Button>
        </Link>
      </div>
    </div>
  );
}
