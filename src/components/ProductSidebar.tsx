
import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

interface Category {
  name: string;
  href: string;
  subcategories?: { name: string; href: string; }[];
}

interface ProductSidebarProps {
  categories: Category[];
  activeCategory?: string;
}

export const ProductSidebar = ({ categories, activeCategory }: ProductSidebarProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryToggle = (categoryName: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryName) 
        ? prev.filter(name => name !== categoryName)
        : [...prev, categoryName]
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6 h-fit">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories</h3>
      <div className="space-y-3">
        {categories.map((category, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center space-x-3">
              <Checkbox
                id={`category-${index}`}
                checked={selectedCategories.includes(category.name)}
                onCheckedChange={() => handleCategoryToggle(category.name)}
              />
              <Link
                to={category.href}
                className={`block flex-1 px-3 py-2 rounded-md transition-colors text-sm md:text-base ${
                  activeCategory === category.name
                    ? 'bg-teal-100 text-teal-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                }`}
              >
                {category.name}
              </Link>
            </div>
            {category.subcategories && category.subcategories.length > 0 && (
              <div className="ml-6 space-y-1">
                {category.subcategories.map((sub, subIndex) => (
                  <div key={subIndex} className="flex items-center space-x-3">
                    <Checkbox
                      id={`sub-${index}-${subIndex}`}
                      checked={selectedCategories.includes(sub.name)}
                      onCheckedChange={() => handleCategoryToggle(sub.name)}
                    />
                    <Link
                      to={sub.href}
                      className="block flex-1 px-3 py-1 text-xs md:text-sm text-gray-500 hover:text-teal-600 transition-colors"
                    >
                      {sub.name}
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
