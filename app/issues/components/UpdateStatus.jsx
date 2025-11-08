'use client';
import React, { useEffect, useMemo, useState } from 'react';
import {
    Select,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectContent,
    SelectValue,
} from '@/components/ui/select';
import { debouceFunction } from '@/lib/utils/debounce';
import {
    deleteIssueStatus,
    UpdateIssueStatus,
} from '@/app/actions/issueAction';
import { Button } from '@/components/ui/button';
import AlertDialogBox from '@/components/section/AlertDialogBox';

const UpdateStatus = ({ issue }) => {
    const [status, setStatus] = useState();
    const debounceUpdate = useMemo(
        () => debouceFunction(UpdateIssueStatus, 2000),
        [issue.id]
    );

    useEffect(() => {
        if (!status) return;
        debounceUpdate(issue.id, status);
    }, [status, debounceUpdate]);

    return (
        <section className="flex-1 flex md:flex-col flex-wrap px-10 gap-y-5 justify-start md:justify-center items-center">
            <Select
                className="w-full"
                defaultValue={issue.status || 'Unrecognised'}
                onValueChange={setStatus}
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
                action={() => deleteIssueStatus(issue.id)}
                buttonVariant="default"
            />
        </section>
    );
};

export default UpdateStatus;
