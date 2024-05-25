import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { DEFAULT_PAYMENT_METHOD } from "@/lib/constants";
import { AddOrderArgs, Order, PaymentMethod } from "@/lib/types";
import { nanoid } from "@/lib/utils";

type OrderState = {
  orders: Order[];
  paymentMethod: PaymentMethod;
};

type OrderActions = {
  actions: {
    addOrder: (args: AddOrderArgs) => void;
    selectPaymentMethod: (paymentMethod: PaymentMethod) => void;
  };
};

const initialState: OrderState = {
  orders: [],
  paymentMethod: DEFAULT_PAYMENT_METHOD,
};

const orderStore = create<OrderState & OrderActions>()(
  persist(
    (set) => ({
      ...initialState,
      actions: {
        addOrder: ({ customer, cart, paymentMethod }) =>
          set((state) => ({
            orders: [
              ...state.orders,
              {
                id: nanoid(),
                customer,
                cart,
                paymentMethod,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            ],
            paymentMethod: DEFAULT_PAYMENT_METHOD,
          })),
        selectPaymentMethod: (paymentMethod) => set(() => ({ paymentMethod })),
      },
    }),
    {
      name: "order-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ orders: state.orders }),
    },
  ),
);

export const useOrders = () => orderStore((state) => state.orders);
export const usePaymentMethod = () => orderStore(state => state.paymentMethod)
export const useOrderActions = () => orderStore((state) => state.actions);
