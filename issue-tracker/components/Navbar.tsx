'use client'
import Link from 'next/link'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'
import { LinksData } from '@/data/Linksdata'
import { usePathname } from 'next/navigation'
import classNames from 'classnames'
const Navbar = () => {

    const currentPath = usePathname()

    return (
        <nav className='flex space-x-12 border-b mb-5 px-5 h-14 items-center'>
            <Link href={"/"}><AiFillBug /></Link>
            <ul className='flex space-x-8 transition-colors'>
                {
                    LinksData.map(link => {
                        return <Link
                            key={link.href}
                            // className={`${link.href === currentPath ? 'text-zinc-1000' : 'text-zinc-500'} hover:text-zinc-700`}
                            className={classNames({
                                'text-zinc-1000': link.href === currentPath,
                                'text-zinc-500': link.href !== currentPath,
                                'hover:text-zinc-700': true
                            })}
                            href={link.href}>{link.label}
                        </Link>
                    })
                }
            </ul>
        </nav>
    )
}

export default Navbar
