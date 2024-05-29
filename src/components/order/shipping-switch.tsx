"use client";

import { toast } from "sonner";

import { Switch } from "@/components/ui/switch";

import { useSelectedCustomer } from "@/store/customer";
import { useOrder, useOrderActions } from "@/store/order";

export default function ShippingSwitch() {
  const order = useOrder();
  const orderActions = useOrderActions();
  const selectedCustomer = useSelectedCustomer();

  const handleSwitchClick = () => {
    if (selectedCustomer) {
      orderActions.toggleIsNeedShipped();
    } else {
      toast.info("Please select a customer to enable the shipping option.");
    }
  };

  return (
    <section className="flex flex-col gap-2">
      <p className="font-normal text-muted-foreground">Shipping Options</p>
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">Ship this order</p>
          <Switch
            checked={order.isNeedShipped}
            onCheckedChange={handleSwitchClick}
          />
        </div>
        <p className="pr-[50px] text-xs text-muted-foreground">
          If you want this order to be shipped, enable this option.
        </p>
      </div>
    </section>
  );
}
