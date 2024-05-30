"use client";

import { Circle } from "lucide-react";

import { Product } from "@/lib/types";
import { cn, getCategoryAttributes, rupiah } from "@/lib/utils";
import { useCart, useCartActions } from "@/store/cart";
import { useCategories } from "@/store/category";

interface ProductCardProps extends React.ComponentPropsWithoutRef<"div"> {
  product: Product;
}

export default function ProductCard({
  product,
  className,
  ...props
}: ProductCardProps) {
  const categories = useCategories();
  const cart = useCart();
  const cartActions = useCartActions();

  const isProductSelected = Boolean(
    cart.find((item) => item.product.id === product.id),
  );

  const productCategory = categories.find(
    (category) => category.id === product.categoryId,
  )!;

  const { color: categoryColor } = getCategoryAttributes(productCategory.name);

  return (
    <div
      className={cn(
        "flex cursor-pointer items-center justify-between gap-3 rounded-xl bg-slate-100 p-4 transition-colors hover:opacity-80",
        isProductSelected && categoryColor.background,
        className,
      )}
      onClick={() => cartActions.toggleItem(product)}
      {...props}
    >
      <div className="flex flex-1 items-center gap-2">
        <Circle
          className={cn(
            "size-4 shrink-0",
            categoryColor.text,
            categoryColor.fill,
            isProductSelected && "fill-slate-100 text-slate-100",
          )}
        />
        <p className="text-pretty text-sm font-normal">{product.name}</p>
      </div>
      <p className="text-sm font-bold">{rupiah(product.price)}</p>
    </div>
  );
}
