"use client";

import { useState } from "react";

import { Category } from "@/lib/types";
import { cn, lightenColor } from "@/lib/utils";
import { useCart } from "@/store/cart";

interface CategoryCardProps extends React.ComponentPropsWithoutRef<"div"> {
  category: Category;
}

export default function CategoryCard({
  category,
  className,
  ...props
}: CategoryCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cart = useCart();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const Icon = category.icon;

  const total = cart.reduce((value, item) => {
    return item.product.categoryId === category.id ? value + 1 : value;
  }, 0);

  return (
    <div
      style={{
        backgroundColor: isHovered
          ? lightenColor(category.color, 30)
          : category.color,
      }}
      className={cn(
        "flex size-44 cursor-pointer flex-col justify-between rounded-md p-4 shadow-sm transition-colors sm:size-40",
        className,
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <Icon className="size-6 shrink-0" />
      <div className="flex flex-col gap-1">
        <p className="text-lg font-semibold">{category.name}</p>
        <p className="font-medium text-muted-foreground">{total} items</p>
      </div>
    </div>
  );
}
