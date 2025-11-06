import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (
    <div
      data-slot="skeleton"
      className={cn(" animate-pulse bg-zinc-300 rounded-md", className)}
      {...props} />
  );
}

export { Skeleton }
