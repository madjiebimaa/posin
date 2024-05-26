"use client";

import { PackageOpen } from "lucide-react";

import CartItemCard from "@/components/cart/cart-item-card";
import { ScrollArea } from "@/components/ui/scroll-area";

import { cn } from "@/lib/utils";
import { useCart } from "@/store/cart";

interface CartItemCardListProps
  extends React.ComponentPropsWithoutRef<typeof ScrollArea> {}

export default function CartItemCardList({
  className,
  ...props
}: CartItemCardListProps) {
  const cart = useCart();

  return cart.length !== 0 ? (
    <ScrollArea className={cn("flex-1", className)} {...props}>
      <section className="flex flex-col gap-2">
        {cart.map((item) => (
          <CartItemCard key={item.product.id} item={item} />
        ))}
      </section>
    </ScrollArea>
  ) : (
    <div className="flex flex-1 items-center justify-center">
      <PackageOpen className="size-10 shrink-0 text-muted-foreground" />
    </div>
  );
}
