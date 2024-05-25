"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import CartItemCardList from "@/components/cart/cart-item-card-list";
import CartTotal from "@/components/cart/cart-total";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import useDevices from "@/hooks/use-devices";
import { useCart } from "@/store/cart";

export default function CartDrawer() {
  const [open, setOpen] = useState(false);
  const cart = useCart();
  const { isSmallDevice } = useDevices();

  const handleTriggerClick = () => {
    if (cart.length === 0) {
      toast.info("Your cart is empty! Add some items to get started.", {
        position: isSmallDevice ? "top-center" : "bottom-right",
      });
    } else {
      setOpen(true);
    }
  };

  const handleCloseClick = () => setOpen(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <Button variant="ghost" onClick={handleTriggerClick}>
        <span>Order {cart.length !== 0 ? cart.length : 0}</span>
        <ChevronDown className="ml-2 size-4 shrink-0" />
      </Button>
      <DrawerContent className="mx-auto h-[92dvh] max-w-xl bg-[#F5F6F7]">
        <DrawerHeader className="sm:text-center">
          <DrawerTitle>Order {cart.length !== 0 ? cart.length : 0}</DrawerTitle>
        </DrawerHeader>
        <CartItemCardList className="my-4 px-4" />
        <section className="mt-auto p-4">
          <div className="flex flex-col gap-10 rounded-md bg-white p-4 shadow-sm">
            <CartTotal cart={cart} />
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                className="rounded-full"
                onClick={handleCloseClick}
              >
                Cancel
              </Button>
              <Button className="rounded-full" disabled={cart.length === 0}>
                To Pay
              </Button>
            </div>
          </div>
        </section>
      </DrawerContent>
    </Drawer>
  );
}