import IssuesTable from './IssuesTable';
import React from 'react';
import { prisma } from '@/lib/prisma';
import PaginationComponent from '@/components/common/Pagination';

const page = async ({ searchParams }) => {
    const issuePerPage = 5;
    const pageNumber = (await searchParams).page || 1;
    const statusFilter = (await searchParams)?.status;
    const queries = (await searchParams)
    const issues = await prisma.issue.findMany({
        where: { status: statusFilter === 'all' ? {} : statusFilter },
        take: issuePerPage,
        skip: issuePerPage * (pageNumber - 1),
    });

    return (
        <>
            <IssuesTable issues={issues} />
            <PaginationComponent  />
        </>
    );
};

export default page;
