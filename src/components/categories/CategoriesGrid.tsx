import { categories as mockCategories, type Category } from "@/data/mockData";
import CategoryCard from "./CategoryCard";

interface Props {
  categories?: Category[];
}

export default function CategoriesGrid({ categories }: Props) {
  const filteredCategories = (categories ?? mockCategories).filter((cat) => cat.id !== "all");

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredCategories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}
