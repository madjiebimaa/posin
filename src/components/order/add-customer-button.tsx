"use client";

import { useCommandState } from "cmdk";

import { Button } from "@/components/ui/button";

import { useCustomerActions } from "@/store/customer";

export default function AddCustomerButton() {
  const name = useCommandState((state) => state.search);
  const customerActions = useCustomerActions();

  return (
    <Button
      size="sm"
      className="w-full"
      disabled={name.length === 0}
      onClick={() => customerActions.addCustomer(name)}
    >
      Add a new customer
    </Button>
  );
}
