import React, { useState } from 'react'
import { cards } from '../../../data/Cards'
import Image from 'next/image'

const Cards = () => {
    const [selectedCard, setSelectedCard] = useState<any>()

    return (
        <div className='' >
            <h2 className='text-[14px] font-medium' >Payment Methods</h2>
            <div className='grid grid-cols-5 mt-2 pl-2' >
                {cards.map((item) => {
                    return <div
                        className={`hover:border-[#fff900] w-[50px] border-[1.5px] flex items-center justify-center rounded-md cursor-pointer hover:scale-110 transition-all 
                        ${item.id === selectedCard && 'border-[2px] border-[#fff901]'}`}
                        onClick={() => setSelectedCard(item.id)}
                        key={item.id} >
                        <Image src={item.image} alt={item.name} width={30} height={30} />
                    </div>
                })}
            </div>
        </div>
    )
}

export default Cards
