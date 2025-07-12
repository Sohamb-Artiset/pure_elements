import React, { useState } from 'react';

export interface Category {
  id: number;
  name: string;
  link: string;
  subcategories?: Category[];
}

interface NestedCategoriesProps {
  categories: Category[];
}

const NestedCategories: React.FC<NestedCategoriesProps> = ({ categories }) => {
  const [openIds, setOpenIds] = useState<Set<number>>(new Set());

  const toggle = (id: number) => {
    setOpenIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const renderCategories = (cats: Category[], level = 0) => (
    <ul className={level === 0 ? 'space-y-2' : 'ml-6 border-l pl-4 space-y-2'}>
      {cats.map(cat => {
        const hasChildren = cat.subcategories && cat.subcategories.length > 0;
        const isOpen = openIds.has(cat.id);
        return (
          <li key={cat.id}>
            <div className="flex items-center cursor-pointer select-none group" onClick={() => hasChildren && toggle(cat.id)}>
              {hasChildren && (
                <span className="mr-2 text-gray-400 group-hover:text-gray-600 transition-transform">
                  <svg className={`w-4 h-4 inline transform ${isOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              )}
              <a
                href={cat.link}
                className={`block py-1 text-gray-800 hover:text-blue-600 ${hasChildren ? 'font-semibold' : ''}`}
                onClick={e => hasChildren && e.preventDefault()}
              >
                {cat.name}
              </a>
            </div>
            {hasChildren && isOpen && cat.subcategories && renderCategories(cat.subcategories, level + 1)}
          </li>
        );
      })}
    </ul>
  );

  return <nav>{renderCategories(categories)}</nav>;
};

export default NestedCategories; 