'use client';
import React, { useEffect, useState, useTransition } from 'react';
import {
    Select,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectContent,
    SelectValue,
} from '@/components/ui/select';
import { assignIssueToUser } from '@/actions/issueAction';
import { toast } from 'sonner';
const AssignUser = ({ issue }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isPending, startTransition] = useTransition();
    const [assignedUser, setAssignedUser] = useState(
        issue?.assignedUserId || 'unassigned'
    );

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/users');
                const data = await res.json();
                setUsers(data.users);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    return (
        <Select
            disabled={isPending || loading}
            value={loading ? 'loading' : isPending ? 'assigning' : assignedUser}
            onValueChange={(userId) =>
                startTransition(async () => {
                    const data = await assignIssueToUser(issue.id, userId);
                    if (!data.success) {
                        toast.error(data.error);
                        return;
                    }
                    setAssignedUser(() => {
                        const user = users.find((user) => user.id === userId);
                        return user.id;
                    });
                    toast.success(data.message);
                })
            }
            className="w-full disabled:cursor-no-drop"
        >
            <SelectTrigger className="w-full cursor-pointer">
                <SelectValue placeholder="Assign User" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Users</SelectLabel>
                    {users?.map((user, idx) => (
                        <SelectItem
                            key={idx}
                            className={'cursor-pointer'}
                            value={user.id}
                        >
                            {user.name}
                        </SelectItem>
                    ))}
                    <SelectItem className={'hidden'} value={'assigning'}>
                        Assigning...
                    </SelectItem>
                    <SelectItem className={'hidden'} value={'unassigned'}>
                        Assign to user
                    </SelectItem>
                    <SelectItem className={'hidden'} value={'loading'}>
                        Loading...
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default AssignUser;
