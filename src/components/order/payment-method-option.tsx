"use client";

import { Button } from "@/components/ui/button";

import { PaymentMethodOption as Option } from "@/lib/types";
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
        className="w-full shrink-0"
        disabled={cart.length === 0}
        onClick={() => orderActions.selectPaymentMethod(option.id)}
      >
        <Icon className="size-6 shrink-0" />
      </Button>
      <span className="text-center text-sm font-normal">{option.label}</span>
    </div>
  );
}
