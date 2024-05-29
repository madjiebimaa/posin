"use client";

import { Button } from "@/components/ui/button";

import { TransportationOption as Option } from "@/lib/types";
import { cn } from "@/lib/utils";
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
        className={cn(
          "w-full shrink-0 transition-colors",
          !isSelectedTransportation &&
            "text-slate-500 hover:bg-white hover:text-slate-900",
        )}
        disabled={cart.length === 0 || !order.isNeedShipped}
        onClick={() => orderActions.selectTransportation(option.id)}
      >
        <Icon className={cn("size-6 shrink-0")} />
      </Button>
      <span
        className={cn(
          "text-center text-sm text-slate-500",
          isSelectedTransportation && "text-slate-900",
        )}
      >
        {option.label}
      </span>
    </div>
  );
}
