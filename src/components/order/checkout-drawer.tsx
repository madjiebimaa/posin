"use client";

import { ArrowDown } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import AddressInput from "@/components/order/address-input";
import CustomerCombobox from "@/components/order/customer-combobox";
import PaymentMethodOptionList from "@/components/order/payment-method-option-list";
import ShippingSwitch from "@/components/order/shipping-switch";
import TransportationOptionList from "@/components/order/transportation-option-list";
import { Button } from "@/components/ui/button";
import {
  DrawerContent,
  DrawerHeader,
  DrawerNested,
  DrawerTitle,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";

import { rupiah } from "@/lib/utils";
import { useCart, useCartActions } from "@/store/cart";
import { useCustomerActions, useSelectedCustomer } from "@/store/customer";
import { useOrder, useOrderActions } from "@/store/order";

export default function CheckoutDrawer() {
  const [open, setOpen] = useState(false);
  const order = useOrder();
  const orderActions = useOrderActions();
  const selectedCustomer = useSelectedCustomer();
  const customerActions = useCustomerActions();
  const cart = useCart();
  const cartActions = useCartActions();

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
    orderActions.addOrder({
      customer: selectedCustomer,
      cart,
    });

    cartActions.reset();
    customerActions.reset();
    toast.success(
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
      <DrawerContent className="mx-auto h-[93dvh] max-w-xl">
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
        <ScrollArea className="flex-1 px-4">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col rounded-xl bg-slate-100 p-4">
              <CustomerCombobox />
            </div>
            <div className="flex flex-col gap-4 rounded-xl bg-slate-100 p-4">
              <ShippingSwitch />
              {order.isNeedShipped && <AddressInput />}
              {order.isNeedShipped && <TransportationOptionList />}
            </div>
            <div className="mb-2 flex flex-col gap-4 rounded-xl bg-slate-100 p-4">
              <PaymentMethodOptionList />
            </div>
          </div>
        </ScrollArea>
        <section className="z-10 mt-auto flex flex-col gap-6 bg-slate-100 p-4 shadow-top-only">
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
              disabled={
                cart.length === 0 ||
                Boolean(
                  order.isNeedShipped &&
                    order.shipping &&
                    !order.shipping.address,
                )
              }
              onClick={handlePlaceOrderClick}
            >
              Create Order
            </Button>
          </div>
        </section>
      </DrawerContent>
    </DrawerNested>
  );
}
