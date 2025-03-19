import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-gray-400/30 animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

function SkeletonTypography({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className="w-full space-y-6" {...props}>
      {/* Başlık için iskelet */}
      <Skeleton className="h-8 w-3/4 mb-8" />
      
      {/* Paragraflar için iskeletler */}
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
      </div>
      
      {/* Alt başlık */}
      <Skeleton className="h-6 w-1/3 mt-8 mb-4" />
      
      {/* Madde işaretli liste */}
      <div className="space-y-3 ml-4">
        <div className="flex items-start gap-2">
          <Skeleton className="h-3 w-3 mt-1 rounded-full" /> {/* Madde işareti */}
          <Skeleton className="h-4 w-9/12" /> {/* Liste öğesi */}
        </div>
        <div className="flex items-start gap-2">
          <Skeleton className="h-3 w-3 mt-1 rounded-full" />
          <Skeleton className="h-4 w-8/12" />
        </div>
      </div>
      
      {/* Ek paragraflar */}
      <div className="space-y-4 mt-6">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
}

function SkeletonCard({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}

Skeleton.displayName = "Skeleton";
SkeletonTypography.displayName = "SkeletonTypography";
SkeletonCard.displayName = "SkeletonCard";
export { Skeleton, SkeletonTypography, SkeletonCard };
