import { Menu } from "lucide-react";
import { Suspense } from "react";

import CartDrawer from "@/components/cart/cart-drawer";
import CategoryCardList from "@/components/category/category-card-list";
import ProductCardList from "@/components/product/product-card-list";
import ProductSearch from "@/components/product/product-search";
import CategoryCardListSkeleton from "@/components/skeleton/category-card-list-skeleton";
import ProductCardListSkeleton from "@/components/skeleton/product-card-list-skeleton";
import ProductSearchSkeleton from "@/components/skeleton/product-search-skeleton";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <main className="mx-auto flex h-dvh max-w-xl flex-col">
      <section className="flex items-center justify-between px-4 py-2">
        <Button variant="ghost" size="icon" className="shrink-0">
          <Menu className="size-4 shrink-0" />
        </Button>
        <CartDrawer />
      </section>
      <section className="px-4 py-2">
        <Suspense fallback={<ProductSearchSkeleton />}>
          <ProductSearch />
        </Suspense>
      </section>
      <Suspense fallback={<CategoryCardListSkeleton />}>
        <CategoryCardList className="mb-2 ml-4 py-4" />
      </Suspense>
      <div className="px-4 py-2">
        <Separator />
      </div>
      <Suspense fallback={<ProductCardListSkeleton />}>
        <ProductCardList className="mb-2 mt-6 px-4" />
      </Suspense>
    </main>
  );
}
