// import { useParams } from 'next/navigation'
import { Badge } from '@/components/ui/badge';
import React from 'react';
import Markdown from 'react-markdown';

const page = async ({ params }) => {
    const { id } = await params;
    const res = await fetch(`http://localhost:3000/api/issues/${id}`);
    const issue = await res.json();
    const formatDate = (dateString) => {
        if (!dateString) return 'Not provided';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'Not provided';
        return new Intl.DateTimeFormat('en-us', {
            weekday: 'long',
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        }).format(date);
    };
    return (
        <div className="flex flex-col md:flex-row mt-20 md:px-20 sm:px-10 px-5">
            <section className="flex flex-col flex-1 gap-8">
                <div>
                    <h3 className="text-4xl md:text-6xl font-semibold py-3">
                        The Joke Tax
                    </h3>
                    <div className="flex gap-10 items-center">
                        <Badge
                            className={`px-2 py-1 text-sm md:text-md font-medium rounded-md transition-colors duration-200
                                 ${
                                     issue.status === 'open'
                                         ? 'bg-red-500/20 text-red-700 border border-red-500/30 dark:bg-red-500/30 dark:text-red-300 dark:border-red-500/50'
                                         : issue.status === 'in progress'
                                         ? 'bg-green-500/20 text-green-700 border border-green-500/30 dark:bg-green-500/30 dark:text-green-300 dark:border-green-500/50'
                                         : issue.status === 'closed'
                                         ? 'bg-purple-500/20 text-purple-700 border border-purple-500/30 dark:bg-purple-500/30 dark:text-purple-200 dark:border-purple-500/50'
                                         : 'bg-zinc-500/20 text-zinc-700 border border-zinc-500/30 dark:bg-zinc-700/30 dark:text-zinc-300 dark:border-zinc-600/50'
                                 }`}
                        >
                            {issue?.status || 'Unknown'}
                        </Badge>
                        <p className=" relative rounded text-xl md:text-2xl font-semibold">
                            {formatDate(issue?.createdAt)}
                        </p>
                    </div>
                </div>
                <div className="w-full py-6 px-4 border rounded-xl text-xl md:text-2xl">
                    <Markdown>{issue.description}</Markdown>
                </div>
            </section>
            <section>
                Editing appear here.
            </section>
        </div>
    );
};

export default page;
