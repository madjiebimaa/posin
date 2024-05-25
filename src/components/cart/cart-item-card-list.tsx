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
    <ScrollArea className={cn("h-[360px] sm:h-[410px]", className)} {...props}>
      <section className="flex flex-col gap-2">
        {cart.map((item) => (
          <CartItemCard key={item.product.id} item={item} />
        ))}
      </section>
    </ScrollArea>
  ) : (
    <div className="flex h-[360px] items-center justify-center sm:h-[410px]">
      <PackageOpen className="size-10 shrink-0 text-muted-foreground" />
    </div>
  );
}
