'use client';
import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { formatDate } from '@/lib/utils/formatUtils';
import StatusBadge from '@/components/common/StatusBadge';

const IssuesTable = ({ issues }) => {
    const issuesPerPage = 5;
    const tableHeaders = ['Issue', 'Status', 'Created'];
    const sortStatus = [
        { label: 'All', value: 'all' },
        { label: 'Open', value: 'open' },
        { label: 'In Progress', value: 'in progress' },
        { label: 'Closed', value: 'closed' },
    ];
    const [page, setPage] = useState(1);
    const router = useRouter();

    const [currentSortStatus, setCurrentSortStatus] = useState('all'); // track the selected sort status

    // Filter the issues by status
    const filtered =
        currentSortStatus === 'all'
            ? issues
            : issues.filter(
                  (issue) =>
                      issue.status.toString().toLowerCase() ===
                      currentSortStatus
              );

    const paginated = filtered.slice(
        issuesPerPage * (page - 1),
        issuesPerPage * page
    );

    useEffect(() => {
        if (paginated.length === 0 && page > 0) {
            const pageNumber = Math.ceil(filtered.length / issuesPerPage);
            setPage(pageNumber);
        }
        if (page < 0) {
            setPage(1);
        }
    }, [page, currentSortStatus]);

    return (
        <>
            <div className="w-full flex flex-wrap gap-2 justify-between overflow-hidden px-10 pt-5 relative z-1000">
                <Select defaultValue='all' onValueChange={setCurrentSortStatus}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Status</SelectLabel>
                            {sortStatus.map((s, idx) => (
                                <SelectItem
                                    key={idx}
                                    value={s.value}
                                >
                                    {s.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Link href={'/issues/new'}>
                    <Button>Add New Issue</Button>
                </Link>
            </div>
            <div className="w-full px-3 sm:px-10 py-4">
                <div className="overflow-hidden">
                    <Table className={'border'}>
                        <TableHeader className={'bg-zinc-100 dark:bg-zinc-700'}>
                            <TableRow>
                                {tableHeaders.map((th, idx) => (
                                    <TableHead key={idx}>{th}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginated.length > 0
                                ? paginated.map((data) => (
                                      <TableRow
                                      className={'cursor-pointer'}
                                          key={data.id}
                                          onClick={() =>
                                              router.push(`/issues/${data?.id}`)
                                          }
                                      >
                                          <TableCell className={'font-medium'}>
                                              {data?.title || 'Untitled'}
                                          </TableCell>
                                          <TableCell>
                                            <StatusBadge status={data.status} />
                                          </TableCell>
                                          <TableCell className={'font-medium'}>
                                              {formatDate(data?.createdAt)}
                                          </TableCell>
                                      </TableRow>
                                  ))
                                : Array.from({ length: 5 }).map((el, idx) => (
                                      <TableRow key={idx}>
                                          <TableCell className={'font-medium'}>
                                              -
                                          </TableCell>
                                          <TableCell className={'font-medium'}>
                                              -
                                          </TableCell>
                                          <TableCell className={'font-medium'}>
                                              -
                                          </TableCell>
                                      </TableRow>
                                  ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
            <div className="flex gap-5 items-center px-10">
                <Button
                    disabled={page === 1}
                    onClick={() => {
                        setPage((prev) => (prev > 1 ? prev - 1 : 1));
                    }}
                >
                    Previous
                </Button>
                <Input
                    type={'number'}
                    className={'w-15'}
                    value={page}
                    onChange={(e) => setPage(e.target.value)}
                />
                <Button
                    disabled={
                        page >= Math.ceil(filtered.length / issuesPerPage)
                    }
                    onClick={() =>
                        setPage((prev) =>
                            page < Math.ceil(filtered.length / issuesPerPage)
                                ? prev + 1
                                : prev
                        )
                    }
                >
                    Next
                </Button>
            </div>
        </>
    );
};

export default IssuesTable;
