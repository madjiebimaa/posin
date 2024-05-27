"use client";

import { Switch } from "@/components/ui/switch";

import { useOrder, useOrderActions } from "@/store/order";

export default function ShippingSwitch() {
  const order = useOrder();
  const orderActions = useOrderActions();

  return (
    <section className="flex flex-col gap-2">
      <p className="font-normal text-muted-foreground">Shipping Options</p>
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold">Ship this order</p>
          <Switch
            checked={order.isNeedShipped}
            onCheckedChange={() => orderActions.toggleIsNeedShipped()}
          />
        </div>
        <p className="text-sm text-muted-foreground">
          If you want this order to be shipped, enable this option.
        </p>
      </div>
    </section>
  );
}
