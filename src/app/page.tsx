import { Menu, Search } from "lucide-react";

import CategoryCardList from "@/components/category/category-card-list";
import OrderDrawer from "@/components/order/order-drawer";
import ProductCardList from "@/components/product/product-card-list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <main className="mx-auto flex h-dvh max-w-xl flex-col">
      <section className="flex items-center justify-between px-4 py-2">
        <Button variant="ghost" size="icon" className="shrink-0">
          <Menu className="size-4 shrink-0" />
        </Button>
        <OrderDrawer />
      </section>
      <section className="px-4 py-2">
        <div className="relative">
          <Search className="absolute left-3 top-3 size-4 shrink-0 text-muted-foreground" />
          <Input placeholder="Search" className="border-none pl-10 shadow-sm" />
        </div>
      </section>
      <CategoryCardList className="mb-2 ml-4 pb-4 pt-4" />
      <div className="px-4 py-2">
        <Separator />
      </div>
      <ProductCardList className="mb-2 mt-6 px-4" />
    </main>
  );
}
