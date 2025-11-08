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
import { UpdateIssueStatus } from '@/app/actions/issueAction';

const UpdateStatus = ({ issue }) => {
    const [status, setStatus] = useState();
    const debounceUpdate = useMemo(
        () => debouceFunction(UpdateIssueStatus, 2000),
        [issue.id]
    );

    useEffect(() => {
        if (!status) return;
        debounceUpdate(issue.id, status)
    }, [status, debounceUpdate]);

    return (
        <section className='flex-1 flex md:justify-center items-center justify-start'>
            <Select
                defaultValue={issue.status || 'Unrecognised'}
                onValueChange={setStatus}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="update status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        <SelectItem value={'open'}>Open</SelectItem>
                        <SelectItem value={'closed'}>Closed</SelectItem>
                        <SelectItem value={'in progress'}>
                            In Progress
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </section>
    );
};

export default UpdateStatus;
