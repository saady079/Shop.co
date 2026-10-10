import { Skeleton } from "@heroui/react";
const bone =
  "animate-shine rounded-lg bg-neutral-200/90 dark:bg-neutral-800/90";

export default function NewArrivalsSkeleton() {
  return (
    <div className="flex items-center justify-center gap-x-5 h-100 my-10">
      {[1, 2, 3, 4, 5].map((item) => (
        <div key={item} className="w-55.5 h-3/4 space-y-5 relative rounded-xl border border-border/80 bg-surface p-4 shadow-sm ring-1 ring-black/5 dark:ring-white/10">
          <Skeleton className={`h-32 ${bone}`} />
          <div className="space-y-3">
            <Skeleton className={`h-3 w-3/5 ${bone}`} />
            <Skeleton className={`h-3 w-4/5 ${bone}`} />
            <Skeleton className={`h-3 w-2/5 ${bone}`} />
          </div>
        </div>
      ))}
    </div>
  );
}
