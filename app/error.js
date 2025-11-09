'use client';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardDescription,
    CardFooter,
    CardTitle,
} from '@/components/ui/card';
import { useEffect } from 'react';

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className='flex justify-center items-center h-[80vh]'>
            <Card className={'px-10 text-center'}>
                <CardTitle>Something went wrong!</CardTitle>
                <CardDescription>{error.message}</CardDescription>
                <CardFooter>
                    <Button className={'w-full'} onClick={() => reset()}>Try again</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
