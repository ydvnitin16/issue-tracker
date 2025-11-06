import React from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '../ui/card';
import { Badge } from '../ui/badge';

const LatestIssues = () => {
    const latestIssues = [
        { id: 1, name: `issue 1`, status: 'Open', created: Date.now() },
        { id: 2, name: `issue 2`, status: 'Closed', created: Date.now() },
        { id: 3, name: `issue 3`, status: 'Open', created: Date.now() },
        { id: 4, name: `issue 4`, status: 'In Progress', created: Date.now() },
    ];
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
                        <div key={issue.id} className="border-b py-3 flex flex-col gap-2">
                            <CardTitle>{issue.name}</CardTitle>
                            <Badge
                                className={`${
                                    issue.status === 'Open'
                                        ? 'bg-red-500/20 rounded text-red-800/90'
                                        : issue.status === 'In Progress'
                                        ? 'bg-green-300/20 rounded text-green-800/90'
                                        : issue.status === 'Closed'
                                        ? 'bg-purple-400/20 text-purple-800/90 rounded'
                                        : ''
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
