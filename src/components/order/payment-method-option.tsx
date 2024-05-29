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
        className={cn(
          "w-full shrink-0 transition-colors",
          !isSelectedPaymentMethod &&
            "text-slate-500 hover:bg-white hover:text-slate-900",
        )}
        onClick={() => orderActions.selectPaymentMethod(option.id)}
      >
        <Icon className={cn("size-6 shrink-0")} />
      </Button>
      <span
        className={cn(
          "text-center text-sm text-slate-500",
          isSelectedPaymentMethod && "text-slate-900",
        )}
      >
        {option.label}
      </span>
    </div>
  );
}
