"use client";

import { PackageOpen } from "lucide-react";
import { useSearchParams } from "next/navigation";

import ProductCard from "@/components/product/product-card";
import { ScrollArea } from "@/components/ui/scroll-area";

import { applyProductsFilter, cn } from "@/lib/utils";
import { useCategories } from "@/store/category";
import { useProducts } from "@/store/product";

interface ProductCardListProps
  extends React.ComponentPropsWithoutRef<typeof ScrollArea> {}

export default function ProductCardList({
  className,
  ...props
}: ProductCardListProps) {
  const searchParams = useSearchParams();
  const products = useProducts();
  const categories = useCategories();

  const query = searchParams.get("query") || "";
  const category = searchParams.get("category") || "";

  const selectedCategory = categories.find(
    (comparedCategory) => comparedCategory.name === category,
  );

  const filteredProducts = applyProductsFilter(
    products.sort((a, b) =>
      a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1,
    ),
    {
      query,
      categoryId: selectedCategory ? selectedCategory.id : "",
    },
  );

  return filteredProducts.length !== 0 ? (
    <ScrollArea className={cn("flex-1", className)} {...props}>
      <div className="flex flex-col gap-2">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </ScrollArea>
  ) : (
    <div className="flex flex-1 items-center justify-center">
      <PackageOpen className="size-10 shrink-0 text-slate-500" />
    </div>
  );
}
