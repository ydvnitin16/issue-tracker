import { Skeleton } from "@/components/ui/skeleton";

const ChartSkeleton = () => {
    return (
        <section>
            <Skeleton className="h-[60vh] w-full rounded-xl dark:bg-zinc-800" />
        </section>
    );
};

export default ChartSkeleton;
