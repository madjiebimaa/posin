"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { useCart } from "@/store/cart";
import { useOrder, useOrderActions } from "@/store/order";

export default function AddressInput() {
  const cart = useCart();
  const order = useOrder();
  const orderActions = useOrderActions();

  return (
    <section className="flex flex-col gap-2">
      <Label
        htmlFor="shipping-address"
        className="text-base font-normal text-slate-500"
      >
        Address
      </Label>
      <Textarea
        id="shipping-address"
        autoComplete="off"
        disabled={cart.length === 0 || !order.isNeedShipped}
        placeholder="Street Name, Building, House Number"
        className="resize-none"
        defaultValue={
          order.isNeedShipped && order.shipping
            ? (order.shipping.address as string)
            : ""
        }
        onChange={(event) => orderActions.addAddress(event.target.value)}
      />
    </section>
  );
}
