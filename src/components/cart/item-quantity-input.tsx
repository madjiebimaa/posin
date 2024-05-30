"use client";

import { Minus, Plus, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { CartItem } from "@/lib/types";
import { useCartActions } from "@/store/cart";

interface ItemQuantityInputProps {
  item: CartItem;
}

export default function ItemQuantityInput({ item }: ItemQuantityInputProps) {
  const cartActions = useCartActions();

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="ghost"
        size="icon"
        className="size-6 shrink-0 text-slate-500"
        onClick={() => cartActions.deleteItem(item.product.id)}
      >
        <Trash className="size-4 shrink-0" />
      </Button>
      <div className="flex items-center rounded-md border">
        <Button
          variant="ghost"
          size="icon"
          className="z-10 size-6 shrink-0 rounded-r-none text-slate-500"
          onClick={() => cartActions.decreaseItemQuantity(item.product.id)}
        >
          <Minus className="size-4 shrink-0" />
        </Button>
        <Input
          type="number"
          autoComplete="off"
          className="h-6 w-12 shrink-0 rounded-none border-x border-y-0 p-0 text-center"
          value={item.quantity}
          onChange={(event) =>
            cartActions.changeItemQuantity(
              item.product.id,
              parseInt(event.target.value),
            )
          }
        />
        <Button
          variant="ghost"
          size="icon"
          className="z-10 size-6 shrink-0 rounded-l-none text-slate-500"
          onClick={() => cartActions.increaseItemQuantity(item.product.id)}
        >
          <Plus className="size-4 shrink-0" />
        </Button>
      </div>
    </div>
  );
}
