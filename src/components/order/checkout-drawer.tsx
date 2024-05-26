"use client";

import { ArrowDown } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import PaymentMethodOptionList from "@/components/order/payment-method-option-list";
import { Button } from "@/components/ui/button";
import {
  DrawerContent,
  DrawerHeader,
  DrawerNested,
  DrawerTitle,
} from "@/components/ui/drawer";

import { rupiah } from "@/lib/utils";
import { useCart, useCartActions } from "@/store/cart";
import { useOrderActions, usePaymentMethod } from "@/store/order";

export default function CheckoutDrawer() {
  const [open, setOpen] = useState(false);
  const paymentMethod = usePaymentMethod();
  const cart = useCart();
  const cartActions = useCartActions();
  const orderActions = useOrderActions();

  const isCartEmpty = cart.length === 0;

  const total = cart.reduce(
    (value, item) => value + item.quantity * item.product.price,
    0,
  );

  const handleTriggerClick = () => {
    setOpen(true);
  };

  const handleCloseClick = () => setOpen(false);

  const handlePlaceOrderClick = () => {
    orderActions.addOrder({ customer: null, cart, paymentMethod });
    cartActions.reset();
    toast.info(
      "Your order has been placed successfully! Thank you for shopping with us.",
    );

    setOpen(false);
  };

  return (
    <DrawerNested open={open} onOpenChange={setOpen} dismissible={false}>
      <Button
        size="lg"
        className="flex-1 rounded-full"
        disabled={cart.length === 0}
        onClick={handleTriggerClick}
      >
        Checkout
      </Button>
      <DrawerContent className="mx-auto h-[95dvh] max-w-xl bg-[#F5F6F7]">
        <DrawerHeader className="sm:text-center">
          <DrawerTitle>
            <span>Checkout</span>
            {!isCartEmpty && (
              <span className="ml-1 text-base font-normal">
                ({cart.length})
              </span>
            )}
          </DrawerTitle>
        </DrawerHeader>
        <section className="mt-auto p-4">
          <div className="flex flex-col gap-6 rounded-md bg-white p-4 shadow-sm">
            <PaymentMethodOptionList />
            <div className="flex items-center justify-between">
              <p className="text-lg font-medium">Total</p>
              <p className="text-lg font-black">{rupiah(total)}</p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="size-11 rounded-full"
                onClick={handleCloseClick}
              >
                <ArrowDown className="size-4 shrink-0" />
              </Button>
              <Button
                size="lg"
                className="flex-1 rounded-full"
                disabled={cart.length === 0}
                onClick={handlePlaceOrderClick}
              >
                Create Order
              </Button>
            </div>
          </div>
        </section>
      </DrawerContent>
    </DrawerNested>
  );
}
