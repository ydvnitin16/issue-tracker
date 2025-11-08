import { Skeleton } from '@/components/ui/skeleton';

const loading = () => {
    return (
        <div className="flex flex-col md:flex-row gap-4 sm:px-20 py-10">
            <div className="flex w-full overflow-hidden flex-col flex-1 gap-6">
                {/* Summary Skeleton */}
                <section className="flex w-full space-x-3">
                    <Skeleton className="h-24 w-full rounded-xl dark:bg-zinc-800" />
                    <Skeleton className="h-24 w-full rounded-xl dark:bg-zinc-800" />
                    <Skeleton className="h-24 w-full rounded-xl dark:bg-zinc-800" />
                </section>

                {/* Chart Skeleton */}
                <section className="">
                    <Skeleton className="h-[60vh] w-full rounded-xl dark:bg-zinc-800" />
                </section>
            </div>
            {/* Issue list skeleton */}
            <div className="flex-1 w-full overflow-hidden border p-10">
                <div className="flex flex-col space-y-3">
                    <Skeleton className="h-10 w-80 rounded-xl dark:bg-zinc-800" />
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div
                            key={i}
                            className="flex flex-col gap-3 justify-between items-start"
                        >
                            <Skeleton className="h-15 w-full dark:bg-zinc-800" />
                            <Skeleton className="h-8 w-30 dark:bg-zinc-800" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default loading;
