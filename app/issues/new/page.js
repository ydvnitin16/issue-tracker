import { Button } from '@/components/ui/button';
import {
    Card,
    CardAction,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Divide } from 'lucide-react';
import React from 'react';

const page = () => {
    return (
        <div className="mt-20 flex justify-center items-center">
            <Card className={'w-full max-w-lg'}>
                <CardHeader>
                    <CardTitle className={'text-2xl'}>
                        Create a New Issue
                    </CardTitle>
                    <CardAction>
                        <Button>Create</Button>
                    </CardAction>
                </CardHeader>
                <CardContent className={'grid gap-4'}>
                    <div className="grid gap-2">
                        <Label className={'text-xl'}>Title</Label>
                        <Input
                            type="texr"
                            id="title"
                            placeholder="Enter issue title here"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label className={'text-xl'}>Information</Label>
                        <Textarea placeholder={'Give breif about your issue'} />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default page;
