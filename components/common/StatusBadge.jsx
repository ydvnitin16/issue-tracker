import React from 'react';
import { Badge } from '../ui/badge';

const StatusBadge = ({ status }) => {
    const bagdeStyle = {
        open: 'bg-red-500/20 text-red-700 border border-red-500/30 dark:bg-red-500/30 dark:text-red-300 dark:border-red-500/50',
        'in progress':
            'bg-green-500/20 text-green-700 border border-green-500/30 dark:bg-green-500/30 dark:text-green-300 dark:border-green-500/50',
        closed: 'bg-purple-500/20 text-purple-700 border border-purple-500/30 dark:bg-purple-500/30 dark:text-purple-200 dark:border-purple-500/50',
        default:
            'bg-zinc-500/20 text-zinc-700 border border-zinc-500/30 dark:bg-zinc-700/30 dark:text-zinc-300 dark:border-zinc-600/50',
    };
    return (
        <Badge
            className={`px-2 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${bagdeStyle[status]}`}
        >
            {status || 'Unknown'}
        </Badge>
    );
};

export default StatusBadge;
