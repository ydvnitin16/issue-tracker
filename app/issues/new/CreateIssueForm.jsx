'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import MDEditor from '@uiw/react-md-editor';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const CreateIssueForm = () => {
    const router = useRouter();
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState('');

    const schema = yup.object({
        title: yup.string().trim().required('Please enter issue title'),
        description: yup.string(),
    });

    const {
        register,
        reset,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: { title: '', description: '' },
    });

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const res = await fetch('http://localhost:3000/api/issues', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const resData = await res.json();
            if (!res.ok) {
                throw new Error(resData.error || 'Something went wrong!');
            }
            toast.success(resData.message)
            reset();
            router.push('/issues');
        } catch (err) {
            console.log(err.message);
            toast.error(err.message)
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-20 flex justify-center items-center mx-4">
            <Card className={'w-full max-w-lg'}>
                <CardHeader>
                    <CardTitle className={'text-2xl'}>
                        Create a New Issue
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className={'grid gap-4'}
                    >
                        <div className="grid gap-2">
                            <Label>Title</Label>
                            <Controller
                                name="title"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        placeholder="Enter issue title here"
                                    />
                                )}
                            />
                            {errors?.title && (
                                <span className="text-red-600">
                                    {errors.title.message}
                                </span>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label>Description</Label>
                            <Controller
                                name="description"
                                control={control}
                                render={({ field }) => (
                                    <MDEditor
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            <Input
                                value={value}
                                {...register('description')}
                                type={'hidden'}
                            />
                        </div>
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Creating...' : 'Create Issue'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default CreateIssueForm;
