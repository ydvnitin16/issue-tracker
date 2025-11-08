import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StatusBadge from '@/components/common/StatusBadge';

const LatestIssues = ({ latestIssues }) => {
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
                            <StatusBadge status={issue.status} />
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
};

export default LatestIssues;
