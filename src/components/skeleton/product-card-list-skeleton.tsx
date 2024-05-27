import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductCardListSkeleton() {
  const size = 20;

  return (
    <ScrollArea className="mb-2 mt-6 flex-1 px-4">
      <div className="grid grid-cols-2 gap-2">
        {Array.from({ length: size }, (_, index) => index + 1).map((id) => (
          <Skeleton key={id} className="h-40 bg-white shadow-sm sm:h-32" />
        ))}
      </div>
    </ScrollArea>
  );
}
