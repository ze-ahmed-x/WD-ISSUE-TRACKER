'use client'
import classNames from 'classnames';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { IoBug } from "react-icons/io5";
import { Separator } from '@radix-ui/themes';


const Navbar = () => {
    const currentPath = usePathname();
    const links = [
        { name: 'Dashboard', href: '/' },
        { name: 'Issues', href: '/issues' },
    ];
  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
        <Link href='/'><IoBug /></Link>
        <ul className='flex space-x-6 '>
            {links.map(link => (
                <>
                <li key ={link.href} className={
                    // `${link.href === currentPath? 'text-zinc-800' : 'text-zinc-500' } hover:text-zinc-800 transition-colors`
                    classNames(
                        {
                            'text-zinc-900': link.href === currentPath,
                            'text-zinc-500': link.href!== currentPath,
                            'hover:text-zinc-800 transition-colors': true
                        }

                    )
                }
                >
                    <Link href={link.href}>{link.name}</Link>
                </li>
                <Separator className='self-center' orientation="vertical" />
                </>
            ))}
            {/* <li><Link href=`/'>Dashboard</Link></li>
            <li><Link href='/issues'>Issues</Link></li> */}
        </ul>
    </nav>
  )
}

export default Navbar