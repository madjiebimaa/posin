"use client";

import { useState } from "react";

import { Product } from "@/lib/types";
import { cn, lightenColor, rupiah } from "@/lib/utils";
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
  const [isHovered, setIsHovered] = useState(false);
  const categories = useCategories();
  const cart = useCart();
  const cartActions = useCartActions();

  const isProductSelected = Boolean(
    cart.find((item) => item.product.id === product.id),
  );

  const productCategory = categories.find(
    (category) => category.id === product.categoryId,
  )!;

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      style={{
        backgroundColor:
          isProductSelected && isHovered
            ? lightenColor(productCategory.color, 30)
            : isProductSelected
              ? productCategory.color
              : "white",
        borderLeftColor: isHovered
          ? lightenColor(productCategory.color, 30)
          : productCategory.color,
      }}
      className={cn(
        "flex h-36 cursor-pointer flex-col justify-between rounded-md border-l-8 p-4 shadow-sm transition-colors ease-out sm:h-24",
        className,
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => cartActions.toggleItem(product)}
      {...props}
    >
      <p className="text-pretty text-sm font-normal">{product.name}</p>
      <p className="text-sm font-bold">{rupiah(product.price)}</p>
    </div>
  );
}
