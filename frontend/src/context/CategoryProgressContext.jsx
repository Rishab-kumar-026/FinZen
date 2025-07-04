import React, { createContext, useContext, useEffect, useState } from "react";

// Default categories (icon as string)
const defaultCategories = {
  food: { limit: 5000, spent: 0, duration: 1, name: 'Food', icon: 'Utensils' },
  shopping: { limit: 3000, spent: 0, duration: 1, name: 'Shopping', icon: 'ShoppingBag' },
  rent: { limit: 15000, spent: 0, duration: 1, name: 'Rent', icon: 'Home' },
  travel: { limit: 2000, spent: 0, duration: 1, name: 'Travel', icon: 'Plane' },
  entertainment: { limit: 1500, spent: 0, duration: 1, name: 'Entertainment', icon: 'Play' },
  others: { limit: 1000, spent: 0, duration: 1, name: 'Others', icon: 'MoreHorizontal' }
};

const CategoryProgressContext = createContext();

export function useCategoryProgress() {
  return useContext(CategoryProgressContext);
}

export function CategoryProgressProvider({ children }) {
  const [categories, setCategories] = useState(() => {
    try {
      const stored = localStorage.getItem('finzen_categories');
      if (stored) return JSON.parse(stored);
    } catch {}
    return defaultCategories;
  });

  useEffect(() => {
    localStorage.setItem('finzen_categories', JSON.stringify(categories));
  }, [categories]);

  return (
    <CategoryProgressContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoryProgressContext.Provider>
  );
} 