import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/lib/utils";

export default function CategoryCardListSkeleton() {
  const size = 6;

  return (
    <ScrollArea className="mb-2 ml-4 py-4">
      <div className="flex items-center gap-2">
        {Array.from({ length: size }, (_, index) => index + 1).map(
          (id, index) => (
            <Skeleton
              key={id}
              className={cn(
                "size-44 bg-white shadow-sm sm:size-40",
                size - 1 === index && "mr-4",
              )}
            />
          ),
        )}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
