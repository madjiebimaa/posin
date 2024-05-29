import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { Customer } from "@/lib/types";
import { nanoid } from "@/lib/utils";

type CustomerState = {
  customers: Customer[];
  selectedCustomer: Customer | null;
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
  selectedCustomer: null,
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
            selectedCustomer:
              state.selectedCustomer &&
              state.selectedCustomer.id !== customer.id
                ? customer
                : !state.selectedCustomer
                  ? customer
                  : null,
          })),
        reset: () =>
          set(() => ({ selectedCustomer: initialState["selectedCustomer"] })),
      },
    }),
    {
      name: "customer-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        customers: state.customers,
        selectedCustomer: state.selectedCustomer,
      }),
    },
  ),
);

export const useCustomers = () => customerStore((state) => state.customers);
export const useSelectedCustomer = () =>
  customerStore((state) => state.selectedCustomer);
export const useCustomerActions = () => customerStore((state) => state.actions);
