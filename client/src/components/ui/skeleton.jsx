import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-white/10 [animation-duration:1.6s]", className)}
      {...props}
    />
  );
}

export { Skeleton }
