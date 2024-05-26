"use client";

import { useState } from "react";

import useQuery from "@/hooks/use-query";
import { Category } from "@/lib/types";
import { cn, darkenColor, lightenColor } from "@/lib/utils";
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
  const [query, setQuery] = useQuery("category", "");
  const cart = useCart();

  const Icon = category.icon;

  const total = cart.reduce((value, item) => {
    return item.product.categoryId === category.id ? value + 1 : value;
  }, 0);

  const isSelectedCategory = query === category.name;

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    isSelectedCategory ? setQuery("") : setQuery(category.name);
  };

  return (
    <div
      style={{
        backgroundColor: isSelectedCategory
          ? "white"
          : isHovered
            ? lightenColor(category.color, 30)
            : category.color,
      }}
      className={cn(
        "flex size-44 cursor-pointer flex-col justify-between rounded-md p-4 shadow-sm transition-colors ease-out sm:size-40",
        className,
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      {...props}
    >
      <Icon
        style={{
          color:
            isSelectedCategory && isHovered
              ? darkenColor(category.color, 10)
              : undefined,
        }}
        className="size-6 shrink-0"
      />
      <div className="flex flex-col gap-1">
        <p
          style={{
            color:
              isSelectedCategory && isHovered
                ? darkenColor(category.color, 10)
                : undefined,
          }}
          className="text-lg font-semibold"
        >
          {category.name}
        </p>
        <p className="font-medium text-muted-foreground">{total} items</p>
      </div>
    </div>
  );
}
