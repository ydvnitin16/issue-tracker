import React from 'react';
import IssueForm from '../../_components/IssueForm';
import { prisma } from '@/lib/prisma';

const page = async ({ params }) => {
    const { id } = await params;
    const issue = await prisma.issue.findUnique({ where: { id } });
    const data = { issue };
    if (!data.issue) {
        throw new Error('Issue not found');
    }
    return <IssueForm issue={data.issue} />;
};

export default page;
