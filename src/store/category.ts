import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { Category, CategoryName } from "@/lib/types";

import categories from "@/data/categories.json";

type CategoryState = {
  categories: Category[];
};

const initialState: CategoryState = {
  categories: categories.map((category) => ({
    ...category,
    name: category.name as CategoryName,
  })),
};

const categoryStore = create<CategoryState>()(
  persist(
    () => ({
      ...initialState,
    }),
    {
      name: "category-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ categories: state.categories }),
    },
  ),
);

export const useCategories = () => categoryStore((state) => state.categories);
