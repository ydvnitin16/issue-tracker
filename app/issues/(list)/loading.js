import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import React from 'react';

const Loading = () => {
    return (
        <div className="flex h-screen flex-col justify-center items-center gap-4">
            <Button disabled size="sm">
                <Spinner />
                Loading...
            </Button>
        </div>
    );
};

export default Loading;
