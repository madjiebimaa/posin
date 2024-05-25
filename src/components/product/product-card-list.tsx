"use client";

import ProductCard from "@/components/product/product-card";
import { ScrollArea } from "@/components/ui/scroll-area";

import { cn } from "@/lib/utils";

import { useProducts } from "@/store/product";

interface ProductCardListProps
  extends React.ComponentPropsWithoutRef<typeof ScrollArea> {}

export default function ProductCardList({
  className,
  ...props
}: ProductCardListProps) {
  const products = useProducts();

  return (
    <ScrollArea className={cn("flex-1", className)} {...props}>
      <div className="grid grid-cols-2 gap-2">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </ScrollArea>
  );
}
