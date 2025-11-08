import { Skeleton } from '@/components/ui/skeleton';

const IssuesTableSkeleton = () => {
    return (
        <div className="flex flex-col w-full min-h-screen px-3 sm:px-10 py-6 space-y-6">
            <div className="flex flex-wrap gap-3 justify-between items-center">
                <Skeleton className="h-10 w-[180px] rounded-md dark:bg-zinc-800" />
                <Skeleton className="h-10 w-[140px] rounded-md dark:bg-zinc-800" />
            </div>

            <div className="w-full overflow-hidden border rounded-lg">
                <div className="grid grid-cols-3 bg-zinc-100 dark:bg-zinc-700 p-3 sm:p-4">
                    <Skeleton className="h-4 w-20 dark:bg-zinc-800" />
                    <Skeleton className="h-4 w-20 dark:bg-zinc-800" />
                    <Skeleton className="h-4 w-20 dark:bg-zinc-800" />
                </div>

                <div className="divide-y divide-zinc-200 dark:divide-zinc-700">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div
                            key={i}
                            className="grid grid-cols-3 p-3 sm:p-4 items-center hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                        >
                            <Skeleton className="h-4 w-[80%] dark:bg-zinc-800" />
                            <Skeleton className="h-6 w-[60%] rounded-md dark:bg-zinc-800" />
                            <Skeleton className="h-4 w-[50%] dark:bg-zinc-800" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-wrap gap-4 items-center justify-center sm:justify-start">
                <Skeleton className="h-10 w-[100px] rounded-md dark:bg-zinc-800" />
                <Skeleton className="h-10 w-[60px] rounded-md dark:bg-zinc-800" />
                <Skeleton className="h-10 w-[100px] rounded-md dark:bg-zinc-800" />
            </div>
        </div>
    );
};

export default IssuesTableSkeleton;
