import Link from 'next/link'
import React from 'react'
import { IoBug } from "react-icons/io5";

const Navbar = () => {
    const links = [
        { name: 'Dashboard', href: '/' },
        { name: 'Issues', href: '/issues' },
    ];
  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
        <Link href='/'><IoBug /></Link>
        <ul className='flex space-x-6 '>
            {links.map(link => (
                <li className='text-zinc-500 hover:text-zinc-800 transition-colors' key={link.name}>
                    <Link href={link.href}>{link.name}</Link>
                </li>
            ))}
            {/* <li><Link href='/'>Dashboard</Link></li>
            <li><Link href='/issues'>Issues</Link></li> */}
        </ul>
    </nav>
  )
}

export default Navbar