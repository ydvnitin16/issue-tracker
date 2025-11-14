'use client';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { signIn } from 'next-auth/react';
import { useActionState } from 'react';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default function AuthForm({ type }) {
    const onsubmit = async (initialState, formData) => {
        const email = formData.get('email');
        const password = formData.get('password');
        const name = formData.get('name');
        
        // Sign Up action
        if (type === 'signup') {
            const res = await fetch('http://localhost:3000/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, name }),
            });
            const data = await res.json()
            if(!res.ok){
                toast.error(data.error)
                return
            }
            toast.success(data.message)
            redirect('/auth/signin')
        }
        // Sign In Action
        const res = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });
        if (res?.error) {
            toast.error(res?.error || 'Something went wrong!');
            return;
        }

        toast.success('Signed in successfully')
        redirect('/');
    };

    const [state, action, isPending] = useActionState(onsubmit, null);

    return (
        <div className={cn('flex flex-col gap-6')}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">
                        {type === 'signup'
                            ? 'Create your account'
                            : 'Welcome back'}
                    </CardTitle>
                    <CardDescription>
                        {type === 'signup'
                            ? 'Sign up with your Google or Github account'
                            : 'Sign in with your Google or Github account'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={action}>
                        <FieldGroup>
                            <Field>
                                <Button
                                    onClick={() => signIn('github')}
                                    variant="outline"
                                    type="button"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-github"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                                    </svg>
                                    {type === 'signup'
                                        ? 'Sign up with Github'
                                        : 'Sign in with Github'}
                                </Button>
                                <Button
                                    onClick={() => signIn('google')}
                                    variant="outline"
                                    type="button"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-google"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
                                    </svg>
                                    {type === 'signup'
                                        ? 'Sign up with Google'
                                        : 'Sign in with Google'}
                                </Button>
                            </Field>

                            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                                Or continue with
                            </FieldSeparator>

                            {type === 'signup' && (
                                <Field>
                                    <FieldLabel htmlFor="name">Name</FieldLabel>
                                    <Input
                                        name="name"
                                        id="name"
                                        type="text"
                                        placeholder="John Doe"
                                        required
                                    />
                                </Field>
                            )}

                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    name="email"
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </Field>

                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">
                                        Password
                                    </FieldLabel>
                                    {type !== 'signup' && (
                                        <a
                                            href="#"
                                            className="ml-auto text-sm underline-offset-4 hover:underline"
                                        >
                                            Forgot your password?
                                        </a>
                                    )}
                                </div>
                                <Input
                                    name="password"
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                />
                            </Field>

                            <Field>
                                <Button type="submit" disabled={isPending}>
                                    {isPending
                                        ? type === 'signup'
                                            ? 'Signing up...'
                                            : 'Signing in...'
                                        : type === 'signup'
                                        ? 'Sign Up'
                                        : 'Sign In'}
                                </Button>

                                <FieldDescription className="text-center">
                                    {type === 'signup' ? (
                                        <>
                                            Already have an account?{' '}
                                            <Link href="/auth/signin">
                                                Sign in
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            Don&apos;t have an account?{' '}
                                            <Link href="/auth/signup">
                                                Sign up
                                            </Link>
                                        </>
                                    )}
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>

            <FieldDescription className="px-6 text-center">
                By clicking continue, you agree to our{' '}
                <a href="#">Terms of Service</a> and{' '}
                <a href="#">Privacy Policy</a>.
            </FieldDescription>
        </div>
    );
}
