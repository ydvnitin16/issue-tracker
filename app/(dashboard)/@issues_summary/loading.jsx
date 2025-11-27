import { Skeleton } from "@/components/ui/skeleton";

const SummarySkeleton = () => {
    return (
        <section className="flex w-full space-x-3">
            <Skeleton className="h-24 w-full rounded-xl dark:bg-zinc-800" />
            <Skeleton className="h-24 w-full rounded-xl dark:bg-zinc-800" />
            <Skeleton className="h-24 w-full rounded-xl dark:bg-zinc-800" />
        </section>
    );
};

export default SummarySkeleton;
