"use client";

import { Button } from "@/components/ui/button";

import { TransportationOption as Option } from "@/lib/types";
import { useCart } from "@/store/cart";
import { useOrder, useOrderActions } from "@/store/order";

interface TransportationOptionProps {
  option: Option;
}

export default function TransportationOption({
  option,
}: TransportationOptionProps) {
  const cart = useCart();
  const order = useOrder();
  const orderActions = useOrderActions();

  const isSelectedTransportation =
    order.isNeedShipped &&
    order.shipping &&
    order.shipping.transportation === option.id;

  const Icon = option.icon;

  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <Button
        variant={isSelectedTransportation ? "default" : "outline"}
        size="sm"
        className="w-full shrink-0"
        disabled={cart.length === 0 || !order.isNeedShipped}
        onClick={() => orderActions.selectTransportation(option.id)}
      >
        <Icon className="size-6 shrink-0" />
      </Button>
      <span className="text-center text-sm font-normal">{option.label}</span>
    </div>
  );
}
