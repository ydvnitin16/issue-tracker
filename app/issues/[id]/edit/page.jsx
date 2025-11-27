import React from 'react';
import IssueForm from '../../_components/IssueForm';
import { prisma } from '@/lib/prisma';

export async function generateMetadata({ params }) {
    const { id } = await params;
    const issue = await prisma.issue.findUnique({ where: { id } });
    return {
        title: `Edit: ${issue.title}`,
        description: `Editing the issue: ${issue.title} with the id: ${issue.id}`,
    };
}


const page = async ({ params }) => {
    const { id } = await params;
    const issue = await prisma.issue.findUnique({ where: { id } });
    if (!issue) {
        throw new Error('Issue not found');
    }
    return <IssueForm issue={issue} />;
};

export default page;
