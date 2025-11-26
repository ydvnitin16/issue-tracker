import React from 'react';
import IssueDetails from './IssueDetails.jsx';
import UpdateStatus from './UpdateStatus.jsx';
import { prisma } from '@/lib/prisma';

const page = async ({ params }) => {
    const { id } = await params;
    const issue = await prisma.issue.findUnique({ where: { id } });
    const data = { issue };
    if (!data.issue) {
        throw new Error('Issue not found');
    }

    return (
        <div className="flex flex-col md:flex-row gap-y-5 mt-20 md:px-20 sm:px-10 px-5">
            <IssueDetails issue={data.issue} /> {/* Server Component */}
            <UpdateStatus issue={data.issue} /> {/* Client Component */}
        </div>
    );
};

export default page;
