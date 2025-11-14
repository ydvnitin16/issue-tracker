'use client';
import { GitFork } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../ui/card';
import { Separator } from '../ui/separator';
import AlertDialogBox from '../common/AlertDialogBox';

const Navbar = () => {
    const { data: session } = useSession();
    const pathName = usePathname();
    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues' },
    ];

    return (
        <>
            <nav className="flex w-full overflow-hidden flex-wrap gap-10 md:px-20 items-center justify-between border-b dark:bg-black">
                <div className="flex flex-wrap items-center gap-10 py-5">
                    <Link href={'/'}>
                        <GitFork className="dark:text-white" />
                    </Link>
                    <div className="flex space-x-6">
                        {links.map((l, idx) => (
                            <Link
                                key={idx}
                                className={`${
                                    pathName === l.href
                                        ? 'text-zinc-800 dark:text-zinc-500'
                                        : 'text-zinc-500 dark:text-zinc-300'
                                } text-xl font-medium hover:text-zinc-800 hover:dark:text-zinc-500 transition-all`}
                                href={l.href}
                            >
                                {l.label}
                            </Link>
                        ))}
                    </div>
                </div>
                <div>
                    {session ? (
                        <Popover>
                            <PopoverTrigger>
                                <Avatar className={'cursor-pointer h-12 w-12'}>
                                    <AvatarImage
                                        src={`${session?.user?.image}`}
                                        alt="@shadcn"
                                    />
                                    <AvatarFallback>
                                        {session?.user?.name?.slice(0, 1)}
                                    </AvatarFallback>
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className={'border-none bg-inset'}>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>
                                            {session?.user?.name}
                                        </CardTitle>
                                        <Separator />
                                        <CardDescription>
                                            {session?.user?.email}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardFooter>
                                        <AlertDialogBox
                                        title='Sign Out'
                                        description='Are you sure you want to log out? Your current session will end. and will be returned to the login page.'
                                            triggerText="Sign Out"
                                            action={() => signOut()}
                                        />
                                    </CardFooter>
                                </Card>
                            </PopoverContent>
                        </Popover>
                    ) : (
                        <Link href={'/auth/signin'}>
                            <Button>Sign In</Button>
                        </Link>
                    )}
                </div>
            </nav>
        </>
    );
};

export default Navbar;
