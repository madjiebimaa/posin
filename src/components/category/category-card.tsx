"use client";

import useQuery from "@/hooks/use-query";
import { Category } from "@/lib/types";
import { cn, getCategoryAttributes } from "@/lib/utils";

interface CategoryCardProps extends React.ComponentPropsWithoutRef<"div"> {
  category: Category;
}

export default function CategoryCard({
  category,
  className,
  ...props
}: CategoryCardProps) {
  const [query, setQuery] = useQuery("category", "");

  const { icon: Icon, color: categoryColor } = getCategoryAttributes(
    category.name,
  );
  const isSelectedCategory = query === category.name;

  const handleClick = () => {
    isSelectedCategory ? setQuery("") : setQuery(category.name);
  };

  return (
    <div
      className={cn(
        "flex h-[130px] w-[200px] cursor-pointer flex-col justify-between rounded-xl p-4 transition-all hover:opacity-80",
        categoryColor.background,
        isSelectedCategory && "bg-slate-100",
        className,
      )}
      onClick={handleClick}
      {...props}
    >
      <Icon className="size-8 shrink-0 fill-slate-900" />
      <p className="text-lg font-bold">{category.name}</p>
    </div>
  );
}
