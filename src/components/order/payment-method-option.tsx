"use client";

import { Button } from "@/components/ui/button";

import { PaymentMethodOption as Option } from "@/lib/types";
import { useCart } from "@/store/cart";
import { useOrderActions, usePaymentMethod } from "@/store/order";

interface PaymentMethodOptionProps {
  option: Option;
}

export default function PaymentMethodOption({
  option,
}: PaymentMethodOptionProps) {
  const cart = useCart();
  const paymentMethod = usePaymentMethod();
  const orderActions = useOrderActions();

  const isSelectedPaymentMethod = paymentMethod === option.id;

  const Icon = option.icon;

  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <Button
        variant={isSelectedPaymentMethod ? "default" : "outline"}
        size="lg"
        className="w-full"
        disabled={cart.length === 0}
        onClick={() => orderActions.selectPaymentMethod(option.id)}
      >
        <Icon className="size-6 shrink-0" />
      </Button>
      <span className="font-normal">{option.label}</span>
    </div>
  );
}
