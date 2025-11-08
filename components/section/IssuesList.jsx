'use client';

import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../ui/table';
import { Badge } from '../ui/badge';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '../ui/select';
import { Button } from '../ui/button';
import Link from 'next/link';
import IssuePagination from './IssuePagination';
import { Input } from '../ui/input';
import { useRouter } from 'next/navigation';

const IssuesList = ({ issues }) => {
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
    const formatDate = (dateString) => {
        if (!dateString) return 'Not provided';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'Not provided';
        return new Intl.DateTimeFormat('en-us', {
            weekday: 'long',
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        }).format(date);
    };

    useEffect(() => {
        if (paginated.length === 0 && page > 0) {
            const pageNumber = Math.ceil(filtered.length / issuesPerPage);
            setPage(pageNumber);
        }
        if (page < 0) {
            setPage(1);
        }
    }, [page]);

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
                                              <Badge
                                                  className={`px-2 py-1 text-sm font-medium rounded-md transition-colors duration-200
                                                    ${
                                                        data.status === 'open'
                                                            ? 'bg-red-500/20 text-red-700 border border-red-500/30 dark:bg-red-500/30 dark:text-red-300 dark:border-red-500/50'
                                                            : data.status ===
                                                              'in progress'
                                                            ? 'bg-green-500/20 text-green-700 border border-green-500/30 dark:bg-green-500/30 dark:text-green-300 dark:border-green-500/50'
                                                            : data.status ===
                                                              'closed'
                                                            ? 'bg-purple-500/20 text-purple-700 border border-purple-500/30 dark:bg-purple-500/30 dark:text-purple-200 dark:border-purple-500/50'
                                                            : 'bg-zinc-500/20 text-zinc-700 border border-zinc-500/30 dark:bg-zinc-700/30 dark:text-zinc-300 dark:border-zinc-600/50'
                                                    }`}
                                              >
                                                  {data?.status || 'Unknown'}
                                              </Badge>
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

export default IssuesList;
