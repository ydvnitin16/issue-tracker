import React from 'react';
import { Badge } from '../ui/badge';

const StatusBadge = ({ status }) => {
    const badgeStyle = {
        'open': `
            bg-red-100 text-red-800 border border-red-300
            dark:bg-red-950 dark:text-red-300 dark:border-red-800
        `,
        'in-progress': `
            bg-emerald-100 text-emerald-800 border border-emerald-300
            dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800
        `,
        'closed': `
            bg-indigo-100 text-indigo-800 border border-indigo-300
            dark:bg-indigo-950 dark:text-indigo-300 dark:border-indigo-800
        `,
        'default': `
            bg-zinc-100 text-zinc-800 border border-zinc-300
            dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-700
        `,
    };
    const statusLabel = {
        'open': 'Open',
        'closed': 'Closed',
        'in-progress': 'In Progress',
    }

    return (
        <Badge
            className={`px-2 py-1 text-sm font-medium rounded-md transition-all duration-200 shadow-sm ${badgeStyle[status] || badgeStyle.default}`}
        >
            {statusLabel[status] || 'Unknown'}
        </Badge>
    );
};

export default StatusBadge;
