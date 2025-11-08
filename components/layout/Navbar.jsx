'use client';
import { GitFork } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Navbar = () => {
    const pathName = usePathname();
    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues' },
    ];
    return (
        <>
            <nav className="flex w-full overflow-hidden gap-10 p-5 items-center border-b dark:bg-black">
                <Link href={'/'}><GitFork className='dark:text-white'/></Link>
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
            </nav>
        </>
    );
};

export default Navbar;
