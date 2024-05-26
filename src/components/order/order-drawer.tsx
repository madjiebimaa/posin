"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import CartItemCardList from "@/components/cart/cart-item-card-list";
import OrderTotal from "@/components/order/order-total";
import PaymentMethodOptionList from "@/components/order/payment-method-option-list";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { useCart, useCartActions } from "@/store/cart";
import { useOrderActions, usePaymentMethod } from "@/store/order";

export default function OrderDrawer() {
  const [open, setOpen] = useState(false);
  const paymentMethod = usePaymentMethod();
  const cart = useCart();
  const cartActions = useCartActions();
  const orderActions = useOrderActions();

  const handleTriggerClick = () => {
    if (cart.length === 0) {
      toast.info("Your cart is empty! Add some items to get started.");
    } else {
      setOpen(true);
    }
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
    <Drawer open={open} onOpenChange={setOpen} dismissible={false}>
      <Button variant="ghost" onClick={handleTriggerClick}>
        <span>Order {cart.length !== 0 ? cart.length : 0}</span>
        <ChevronDown className="ml-2 size-4 shrink-0" />
      </Button>
      <DrawerContent className="mx-auto h-dvh max-w-xl bg-[#F5F6F7]">
        <DrawerHeader className="sm:text-center">
          <DrawerTitle>Order {cart.length !== 0 ? cart.length : 0}</DrawerTitle>
        </DrawerHeader>
        <CartItemCardList className="my-4 px-4" />
        <section className="mt-auto p-4">
          <div className="flex flex-col gap-6 rounded-md bg-white p-4 shadow-sm">
            <OrderTotal cart={cart} />
            <PaymentMethodOptionList />
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full"
                onClick={handleCloseClick}
              >
                Cancel
              </Button>
              <Button
                size="lg"
                className="rounded-full"
                disabled={cart.length === 0}
                onClick={handlePlaceOrderClick}
              >
                Place Order
              </Button>
            </div>
          </div>
        </section>
      </DrawerContent>
    </Drawer>
  );
}
