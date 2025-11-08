import { Skeleton } from '@/components/ui/skeleton';

const loading = () => {
    return (
        <section className="flex flex-col h-screen md:mt-20 flex-3 gap-2 w-full px-4 sm:px-6 md:px-10 py-6">
            <div className="space-y-2">
                <Skeleton className="h-10 w-[70%] md:w-[60%] rounded-md dark:bg-zinc-800" />{' '}
            </div>

            <div className="flex flex-wrap items-center gap-6">
                <Skeleton className="h-8 w-24 rounded-md dark:bg-zinc-800" />
                <Skeleton className="h-6 w-32 rounded-md dark:bg-zinc-800" />
            </div>
            <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-3 w-full border rounded-xl py-6 px-4 space-y-4 dark:border-zinc-700">
                    <Skeleton className="h-[40vh] w-full rounded-xl dark:bg-zinc-800" />
                </div>
                <div className="flex-1 flex md:flex-col flex-wrap px-10 gap-y-5 justify-start md:justify-center items-center">
                    <Skeleton className="sm:h-15 h-10 w-full rounded-md dark:bg-zinc-800" />
                    <Skeleton className="sm:h-15 h-10 w-full rounded-md dark:bg-zinc-800" />
                    <Skeleton className="sm:h-15 h-10 w-full rounded-md dark:bg-zinc-800" />
                </div>
            </div>
        </section>
    );
};

export default loading;
