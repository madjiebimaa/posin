"use client";

import { ArrowDown, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import CartItemCardList from "@/components/cart/cart-item-card-list";
import CheckoutDrawer from "@/components/order/checkout-drawer";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { rupiah } from "@/lib/utils";
import { useCart } from "@/store/cart";

export default function CartDrawer() {
  const [open, setOpen] = useState(false);
  const cart = useCart();

  const isCartEmpty = cart.length === 0;
  const total = cart.reduce(
    (value, item) => value + item.quantity * item.product.price,
    0,
  );

  useEffect(() => {
    if (isCartEmpty) {
      setOpen(false);
    }
  }, [isCartEmpty]);

  const handleTriggerClick = () => {
    if (cart.length === 0) {
      toast.info("Your cart is empty! Add some items to get started.");
    } else {
      setOpen(true);
    }
  };

  const handleCloseClick = () => setOpen(false);

  return (
    <Drawer open={open} onOpenChange={setOpen} dismissible={false}>
      <Button variant="ghost" onClick={handleTriggerClick} className="shrink-0">
        <ShoppingCart className="size-4 shrink-0" />
      </Button>
      <DrawerContent
        className="mx-auto flex h-[95dvh] max-w-xl flex-col bg-[#F5F6F7]"
        handleClassName="bg-white"
      >
        <DrawerHeader className="sm:text-center">
          <DrawerTitle>
            <span>Your Shopping Cart</span>
            {!isCartEmpty && (
              <span className="ml-1 text-base font-normal">
                ({cart.length})
              </span>
            )}
          </DrawerTitle>
        </DrawerHeader>
        <CartItemCardList className="px-4" />
        <section className="shadow-top-only z-10 flex mt-auto flex-col gap-6 bg-white p-4">
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
            <CheckoutDrawer />
          </div>
        </section>
      </DrawerContent>
    </Drawer>
  );
}
