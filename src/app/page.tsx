import { Suspense } from "react";

import CartDrawer from "@/components/cart/cart-drawer";
import CategoryCardList from "@/components/category/category-card-list";
import ProductCardList from "@/components/product/product-card-list";
import ProductSearch from "@/components/product/product-search";
import CategoryCardListSkeleton from "@/components/skeleton/category-card-list-skeleton";
import ProductCardListSkeleton from "@/components/skeleton/product-card-list-skeleton";
import ProductSearchSkeleton from "@/components/skeleton/product-search-skeleton";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <main className="bg- mx-auto flex h-dvh max-w-xl flex-col">
      <section className="bg- flex items-center justify-between gap-2 p-4">
        <Suspense fallback={<ProductSearchSkeleton />}>
          <ProductSearch />
        </Suspense>
        <CartDrawer />
      </section>
      <Suspense fallback={<CategoryCardListSkeleton />}>
        <CategoryCardList className="mb-2 ml-4 py-4" />
      </Suspense>
      <div className="px-4 py-2">
        <Separator />
      </div>
      <Suspense fallback={<ProductCardListSkeleton />}>
        <ProductCardList className="mt-6 px-4 pb-4" />
      </Suspense>
    </main>
  );
}
