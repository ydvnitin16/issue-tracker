import IssuesTable from './IssuesTable';
import React from 'react';
import { prisma } from '@/lib/prisma';
import PaginationComponent from '@/components/common/Pagination';
import { redirect } from 'next/navigation';

const page = async ({ searchParams }) => {
    const issuePerPage = 5;
    let currentPage = Number((await searchParams).page) || 1;
    const statusFilter = (await searchParams)?.status;
    const issues = await prisma.issue.findMany({
        where: { status: statusFilter === 'all' ? {} : statusFilter },
        take: issuePerPage,
        skip: issuePerPage * (currentPage - 1),
    });

    const pageCount = Math.ceil(
        (await prisma.issue.count({
            where: { status: statusFilter === 'all' ? {} : statusFilter },
        })) / issuePerPage
    );

    if (currentPage > pageCount) {
        const params = new URLSearchParams(await searchParams);
        params.set('page', pageCount);
        redirect('?' + params);
    }

    return (
        <>
            <IssuesTable issues={issues} />
            <PaginationComponent
                currentPage={currentPage}
                pageCount={pageCount}
            />
        </>
    );
};

export default page;
