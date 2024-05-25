"use client";

import { Minus, Plus, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";

import { CartItem } from "@/lib/types";
import { rupiah } from "@/lib/utils";
import { useCartActions } from "@/store/cart";

interface CartItemCardProps {
  item: CartItem;
}

export default function CartItemCard({ item }: CartItemCardProps) {
  const cartActions = useCartActions();

  return (
    <div className="flex h-28 flex-col justify-between rounded-md bg-white p-4 shadow-sm sm:h-24">
      <p className="text-pretty font-normal">{item.product.name}</p>
      <div className="flex items-center justify-between">
        <p className="font-bold">{rupiah(item.product.price)}</p>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="size-6 shrink-0"
            onClick={() => cartActions.deleteItem(item.product.id)}
          >
            <Trash className="size-4 shrink-0" />
          </Button>
          <div className="flex items-center rounded-md border">
            <Button
              variant="ghost"
              size="icon"
              className="size-6 shrink-0"
              onClick={() => cartActions.decreaseItemQuantity(item.product.id)}
            >
              <Minus className="size-4 shrink-0" />
            </Button>
            <span className="flex h-6 w-12 shrink-0 items-center justify-center border-x">
              {item.quantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="size-6 shrink-0"
              onClick={() => cartActions.increaseItemQuantity(item.product.id)}
            >
              <Plus className="size-4 shrink-0" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
