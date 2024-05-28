import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { Customer } from "@/lib/types";
import { nanoid } from "@/lib/utils";

type CustomerState = {
  customers: Customer[];
  customer: Customer | null;
};

type CustomerActions = {
  actions: {
    addCustomer: (name: Customer["name"]) => void;
    selectCustomer: (customer: Customer) => void;
    reset: () => void;
  };
};

const initialState: CustomerState = {
  customers: [],
  customer: null,
};

const customerStore = create<CustomerState & CustomerActions>()(
  persist(
    (set) => ({
      ...initialState,
      actions: {
        addCustomer: (name) =>
          set((state) => ({
            customers: [...state.customers, { id: nanoid(), name }],
          })),
        selectCustomer: (customer) =>
          set((state) => ({
            customer:
              state.customer && state.customer.id !== customer.id
                ? customer
                : !state.customer
                  ? customer
                  : null,
          })),
        reset: () => set(() => ({ customer: initialState["customer"] })),
      },
    }),
    {
      name: "customer-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        customers: state.customers,
        customer: state.customer,
      }),
    },
  ),
);

export const useCustomers = () => customerStore((state) => state.customers);
export const useCustomer = () => customerStore((state) => state.customer);
export const useCustomerActions = () => customerStore((state) => state.actions);
