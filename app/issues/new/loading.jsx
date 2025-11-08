import { Skeleton } from '@/components/ui/skeleton';

const loading = () => {
    return (
        <div className="flex flex-col max-w-lg w-full mx-auto border rounded-lg p-6 mt-20 space-y-6">
            <div className="space-y-2">
                <Skeleton className="h-6 w-40 dark:bg-zinc-800" />
                <Skeleton className="h-4 w-60 dark:bg-zinc-800" />
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <Skeleton className="h-4 w-24 dark:bg-zinc-800" />
                    <Skeleton className="h-10 w-full rounded-md dark:bg-zinc-800" />
                </div>

                <div className="space-y-2">
                    <Skeleton className="h-4 w-24 dark:bg-zinc-800" />
                    <Skeleton className="h-32 w-full rounded-md dark:bg-zinc-800" />{' '}
                </div>
            </div>
            <div className="pt-4">
                <Skeleton className="h-10 w-32 rounded-md dark:bg-zinc-800" />
            </div>
        </div>
    );
};

export default loading;
