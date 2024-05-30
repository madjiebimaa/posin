"use client";

import ItemQuantityInput from "@/components/cart/item-quantity-input";

import { CartItem } from "@/lib/types";
import { cn, rupiah } from "@/lib/utils";

interface CartItemCardProps extends React.ComponentPropsWithoutRef<"div"> {
  item: CartItem;
}

export default function CartItemCard({
  item,
  className,
  ...props
}: CartItemCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-xl bg-slate-100 p-4",
        className,
      )}
      {...props}
    >
      <p className="text-pretty text-sm">{item.product.name}</p>
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold">{rupiah(item.product.price)}</p>
        <ItemQuantityInput item={item} />
      </div>
    </div>
  );
}
