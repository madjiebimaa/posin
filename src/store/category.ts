import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { Category } from "@/lib/types";
import { getCategoryIcon } from "@/lib/utils";

import categories from "@/data/categories.json";

type CategoryState = {
  categories: Category[];
};

const initialState: CategoryState = {
  categories: categories.map((category) => ({
    ...category,
    icon: getCategoryIcon(category.icon),
  })),
};

const categoryStore = create<CategoryState>()(
  persist(
    () => ({
      ...initialState,
    }),
    {
      name: "category-storage",
      storage: createJSONStorage(() => localStorage, {
        reviver: (key, value) => {
          if (key === "categories" && value instanceof Array) {
            return value.map((category: any) => ({
              ...category,
              icon: getCategoryIcon(category.icon),
            }));
          }

          return value;
        },
        replacer: (key, value) => {
          if (key === "categories" && value instanceof Array) {
            return value.map((category: Category) => ({
              ...category,
              icon: category.icon.displayName,
            }));
          }

          return value;
        },
      }),
      partialize: (state) => ({ categories: state.categories }),
    },
  ),
);

export const useCategories = () => categoryStore((state) => state.categories);
