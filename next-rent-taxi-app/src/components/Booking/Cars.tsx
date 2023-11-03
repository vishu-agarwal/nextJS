'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { carList } from '../../../data/Data'

const Cars = () => {

    const [selectedCar, setSelectedCar] = useState<any>()

    return (
        <div className='mt-1' >
            <h2 className='font-semibold' >Select Car</h2>
            <div className={`grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3`}  >
                {carList.map((item) => {
                    return <div
                        key={item.id}
                        className={`m-1 p-2 border-[1.5px] rounded-md cursor-pointer hover:border-[#fff900] 
                                    ${item.id === selectedCar && 'border-[2px] border-[#fff901]'}`}
                        onClick={() => setSelectedCar(item.id)} >
                        <Image src={item.image} alt={item.name} width={40} height={50} className='w-full' />
                        <h2 className='text-[13px]  text-gray-500' >{item.name}
                            <span className='float-right font-medium text-black' >{item.charges * 12}$</span>
                        </h2>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Cars
