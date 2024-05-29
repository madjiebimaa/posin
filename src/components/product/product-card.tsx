"use client";

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
        "flex h-36 cursor-pointer flex-col justify-between rounded-xl border-l-8 bg-slate-100 p-4 transition-colors hover:opacity-80 sm:h-24",
        categoryColor.border,
        isProductSelected && categoryColor.background,
        className,
      )}
      onClick={() => cartActions.toggleItem(product)}
      {...props}
    >
      <p className="text-pretty text-sm font-normal">{product.name}</p>
      <p className="text-sm font-bold">{rupiah(product.price)}</p>
    </div>
  );
}
