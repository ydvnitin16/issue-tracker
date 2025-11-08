import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const LatestIssues = ({ latestIssues }) => {
    // const latestIssues = [
    //     { id: 1, name: `issue 1`, status: 'Open', created: Date.now() },
    //     { id: 2, name: `issue 2`, status: 'Closed', created: Date.now() },
    //     { id: 3, name: `issue 3`, status: 'Open', created: Date.now() },
    //     { id: 4, name: `issue 4`, status: 'In Progress', created: Date.now() },
    // ];
    latestIssues.length = 10;
    return (
        <div>
            <Card className={'gap-0 py-2'}>
                <CardHeader className={'px-2'}>
                    <CardTitle className={'text-lg font-bold'}>
                        Latest Issues
                    </CardTitle>
                </CardHeader>
                <CardContent className={''}>
                    {latestIssues.map((issue) => (
                        <div
                            key={issue.id}
                            className="border-b py-3 flex flex-col gap-2"
                        >
                            <CardTitle>{issue.title}</CardTitle>
                            <Badge
                                className={`px-2 py-1 text-sm font-medium rounded-md transition-colors duration-200
                                                    ${
                                                        issue.status === 'open'
                                                            ? 'bg-red-500/20 text-red-700 border border-red-500/30 dark:bg-red-500/30 dark:text-red-300 dark:border-red-500/50'
                                                            : issue.status ===
                                                              'in progress'
                                                            ? 'bg-green-500/20 text-green-700 border border-green-500/30 dark:bg-green-500/30 dark:text-green-300 dark:border-green-500/50'
                                                            : issue.status ===
                                                              'closed'
                                                            ? 'bg-purple-500/20 text-purple-700 border border-purple-500/30 dark:bg-purple-500/30 dark:text-purple-200 dark:border-purple-500/50'
                                                            : 'bg-zinc-500/20 text-zinc-700 border border-zinc-500/30 dark:bg-zinc-700/30 dark:text-zinc-300 dark:border-zinc-600/50'
                                                    }`}
                            >
                                {issue.status}
                            </Badge>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
};

export default LatestIssues;
