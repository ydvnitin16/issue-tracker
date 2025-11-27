import { Skeleton } from "@/components/ui/skeleton";

const IssueListSkeleton = () => {
    return (
        <div className="flex-1 w-full overflow-hidden border rounded-2xl p-10">
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
    );
};

export default IssueListSkeleton;
