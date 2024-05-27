import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import {
  DEFAULT_PAYMENT_METHOD,
  DEFAULT_SHIPPING_TRANSPORTATION,
} from "@/lib/constants";
import {
  AddOrderArgs,
  Order,
  PaymentMethod,
  ShippingTransportation,
} from "@/lib/types";
import { nanoid } from "@/lib/utils";

type OrderState = {
  orders: Order[];
  order: {
    isNeedShipped: boolean;
    shipping: Order["shipping"];
    paymentMethod: Order["paymentMethod"];
  };
};

type OrderActions = {
  actions: {
    addOrder: (args: AddOrderArgs) => void;
    toggleIsNeedShipped: () => void;
    selectTransportation: (transportation: ShippingTransportation) => void;
    selectPaymentMethod: (paymentMethod: PaymentMethod) => void;
  };
};

const initialState: OrderState = {
  orders: [],
  order: {
    isNeedShipped: false,
    shipping: null,
    paymentMethod: DEFAULT_PAYMENT_METHOD,
  },
};

const orderStore = create<OrderState & OrderActions>()(
  persist(
    (set) => ({
      ...initialState,
      actions: {
        addOrder: ({ customer, cart }) =>
          set((state) => ({
            orders: [
              ...state.orders,
              {
                id: nanoid(),
                customer,
                cart,
                shipping: state.order.shipping,
                paymentMethod: state.order.paymentMethod,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            ],
            order: initialState["order"],
          })),
        toggleIsNeedShipped: () =>
          set((state) => {
            const nextIsNeedShipped = !state.order.isNeedShipped;
            return {
              order: {
                ...state.order,
                isNeedShipped: nextIsNeedShipped,
                shipping: nextIsNeedShipped
                  ? {
                      address: null,
                      transportation: DEFAULT_SHIPPING_TRANSPORTATION,
                    }
                  : null,
              },
            };
          }),
        selectTransportation: (transportation) =>
          set((state) => ({
            order: state.order.isNeedShipped
              ? {
                  ...state.order,
                  shipping: state.order.shipping
                    ? {
                        ...state.order.shipping,
                        transportation,
                      }
                    : { address: null, transportation },
                }
              : state.order,
          })),
        selectPaymentMethod: (paymentMethod) =>
          set((state) => ({ order: { ...state.order, paymentMethod } })),
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
export const useOrder = () => orderStore((state) => state.order);
export const useOrderActions = () => orderStore((state) => state.actions);
