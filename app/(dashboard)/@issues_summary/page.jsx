import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from '@/components/ui/card';
import { prisma } from '@/lib/prisma';

const issuesCountByStatus = async (status) => {
    return await prisma.issue.count({
        where: { status: String(status) },
    });
};

const IssuesSummary = async () => {
    const [openIssuesCount, inProgressIssuesCount, closedIssuesCount] =
        await Promise.all([
            issuesCountByStatus('open'),
            issuesCountByStatus('in-progress'),
            issuesCountByStatus('closed'),
        ]);
    const cardContent = [
        { label: 'Open Issues', content: openIssuesCount },
        { label: 'In-Progress Issues', content: inProgressIssuesCount },
        { label: 'Closed Issues', content: closedIssuesCount },
    ];
    return (
        <div className="flex w-full space-x-3">
            {cardContent.map((card, idx) => (
                <Card key={idx} className={'p-3'}>
                    <CardContent className={'px-3'}>
                        <CardDescription>{card.label}</CardDescription>
                        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            {card.content}
                        </CardTitle>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default IssuesSummary;
