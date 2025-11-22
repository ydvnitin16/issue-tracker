'use client';
import React, { useState, useTransition } from 'react';
import {
    Select,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectContent,
    SelectValue,
} from '@/components/ui/select';
import { deleteIssueStatus, UpdateIssueStatus } from '@/actions/issueAction';
import AlertDialogBox from '@/components/common/AlertDialogBox';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import AssignUser from './AssignUser';

const UpdateStatus = ({ issue }) => {
    const router = useRouter();
    const [status, setStatus] = useState(issue?.status);
    const [isPending, startTransition] = useTransition();

    return (
        <section className="flex-1 flex md:flex-col flex-wrap px-10 gap-y-5 justify-start md:justify-center items-center">
            <Select
                className="w-full disabled:cursor-no-drop"
                disabled={isPending}
                value={isPending ? 'loading' : status}
                onValueChange={(status) => {
                    startTransition(async () => {
                        const data = await UpdateIssueStatus(issue.id, status);
                        if (!data.success) {
                            toast.error(data.error);
                            return;
                        }
                        setStatus(status);
                        toast.success(data.message);
                    });
                }}
            >
                <SelectTrigger className="w-full cursor-pointer">
                    <SelectValue placeholder="update status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        <SelectItem className={'cursor-pointer'} value={'open'}>
                            Open
                        </SelectItem>
                        <SelectItem
                            className={'cursor-pointer'}
                            value={'in-progress'}
                        >
                            In Progress
                        </SelectItem>
                        <SelectItem
                            className={'cursor-pointer'}
                            value={'closed'}
                        >
                            Closed
                        </SelectItem>
                        <SelectItem className={'hidden'} value={'loading'}>
                            Updating...
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <AssignUser issue={issue} />
            <Link className={'w-full'} href={`/issues/${issue.id}/edit`}>
                <Button className={'w-full'}>Edit Issue</Button>
            </Link>
            <AlertDialogBox
                className="w-full"
                triggerText="Delete Issue"
                action={async () => {
                    const data = await deleteIssueStatus(issue?.id);
                    if (data.success) {
                        toast.success(data.message);
                        router.back();
                    } else {
                        toast.error(data.error);
                    }
                }}
                buttonVariant="destructive"
            />
        </section>
    );
};

export default UpdateStatus;
