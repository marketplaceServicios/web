import { categories } from "@/data/mockData";
import CategoryCard from "./CategoryCard";

export default function CategoriesGrid() {
  // Filter out "Todos" category for the dedicated categories page
  const filteredCategories = categories.filter((cat) => cat.id !== "all");

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredCategories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}
