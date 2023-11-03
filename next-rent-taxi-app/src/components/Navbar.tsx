import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

const Navbar = () => {
    return (
        <div className="flex justify-between p-3 px-4 border-b-[1px] shadow-lg " >
            <div className='flex items-center gap-10' >
                <Image src='/logo1.png' alt="Rent Travel Logo" width={130} height={78} />
                <div className="gap-6 hidden md:flex" >
                    <h2 className='bg-[#fff901] hover:bg-black text-black hover:text-[#fff901] cursor-pointer transition-all p-2 rounded-md font-semibold ' >Home</h2>
                    <h2 className='bg-[#fff901] hover:bg-black text-black hover:text-[#fff901] cursor-pointer transition-all p-2 rounded-md font-semibold ' >History</h2>
                    <h2 className='bg-[#fff901] hover:bg-black text-black hover:text-[#fff901] cursor-pointer transition-all p-2 rounded-md font-semibold ' >help</h2>
                </div>
            </div>

            <UserButton afterSignOutUrl="/" />

        </div>
    )
}

export default Navbar
