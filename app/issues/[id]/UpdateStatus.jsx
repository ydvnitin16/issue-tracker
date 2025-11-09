'use client';
import React, { useTransition } from 'react';
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

const UpdateStatus = ({ issue }) => {
    const [isPending, startTransition] = useTransition();

    return (
        <section className="flex-1 flex md:flex-col flex-wrap px-10 gap-y-5 justify-start md:justify-center items-center">
            <Select
                className="w-full disabled:cursor-no-drop"
                disabled={isPending}
                defaultValue={issue?.status || 'Unrecognised'}
                onValueChange={(status) => {
                    startTransition(async () => {
                        const data = await UpdateIssueStatus(issue.id, status);
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
                            value={'closed'}
                        >
                            Closed
                        </SelectItem>
                        <SelectItem
                            className={'cursor-pointer'}
                            value={'in progress'}
                        >
                            In Progress
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <AlertDialogBox
                className="w-full"
                triggerText="Delete Issue"
                action={() => deleteIssueStatus(issue?.id)}
                buttonVariant="default"
            />
        </section>
    );
};

export default UpdateStatus;
