import React from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

const AlertDialogBox = ({
    title = 'Are you absolutely sure?',
    description = 'This action cannot be undone. This will permanently delete your Issue and remove it from our servers.',
    action,
    triggerText = 'Delete',
    buttonVariant = 'default',
}) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger className="w-full">
                <Button className="w-full" variant={buttonVariant}>
                    {triggerText}
                </Button>{' '}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={action}>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default AlertDialogBox;
