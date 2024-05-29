"use client";

import { Button } from "@/components/ui/button";

import { PaymentMethodOption as Option } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useCart } from "@/store/cart";
import { useOrder, useOrderActions } from "@/store/order";

interface PaymentMethodOptionProps {
  option: Option;
}

export default function PaymentMethodOption({
  option,
}: PaymentMethodOptionProps) {
  const cart = useCart();
  const order = useOrder();
  const orderActions = useOrderActions();

  const isSelectedPaymentMethod = order.paymentMethod === option.id;

  const Icon = option.icon;

  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <Button
        variant={isSelectedPaymentMethod ? "default" : "outline"}
        size="sm"
        className="w-full shrink-0 transition-colors"
        disabled={cart.length === 0}
        onClick={() => orderActions.selectPaymentMethod(option.id)}
      >
        <Icon
          className={cn(
            "size-6 shrink-0",
            !isSelectedPaymentMethod && "text-muted-foreground",
          )}
        />
      </Button>
      <span
        className={cn(
          "text-center text-sm font-normal",
          !isSelectedPaymentMethod && "text-muted-foreground",
        )}
      >
        {option.label}
      </span>
    </div>
  );
}
