import { create } from "zustand";

import { Cart, Product } from "@/lib/types";
import { nanoid } from "@/lib/utils";
import { createJSONStorage, persist } from "zustand/middleware";

type CartState = {
  cart: Cart;
};

type CartActions = {
  actions: {
    toggleItem: (product: Product) => void;
    increaseItemQuantity: (id: Product["id"]) => void;
    decreaseItemQuantity: (id: Product["id"]) => void;
    deleteItem: (id: Product["id"]) => void;
    reset: () => void;
  };
};

const initialState: CartState = {
  cart: [],
};

const cartStore = create<CartState & CartActions>()(
  persist(
    (set) => ({
      ...initialState,
      actions: {
        toggleItem: (product) =>
          set((state) => {
            const isProductSelected = Boolean(
              state.cart.find((item) => item.product.id === product.id),
            );

            const nextCart = isProductSelected
              ? state.cart.filter((item) => item.product.id !== product.id)
              : [
                  ...state.cart,
                  {
                    id: nanoid(),
                    product,
                    quantity: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                  },
                ];

            return {
              cart: nextCart,
            };
          }),
        increaseItemQuantity: (id: Product["id"]) =>
          set((state) => ({
            cart: state.cart.map((item) => {
              return item.product.id === id
                ? { ...item, quantity: item.quantity + 1 }
                : item;
            }),
          })),
        decreaseItemQuantity: (id: Product["id"]) =>
          set((state) => ({
            cart: state.cart.map((item) => {
              return item.product.id === id && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item;
            }),
          })),
        deleteItem: (id) =>
          set((state) => ({
            cart: state.cart.filter((item) => item.product.id !== id),
          })),
        reset: () => set(() => ({ ...initialState })),
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ cart: state.cart }),
    },
  ),
);

export const useCart = () => cartStore((state) => state.cart);
export const useCartActions = () => cartStore((state) => state.actions);
