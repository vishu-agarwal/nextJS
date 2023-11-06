import { DistanceDataContext, DurationLocationContext } from '@/context/LocationContext'
import React, { useContext } from 'react'

const DistanceTime = () => {

    const { distance } = useContext(DistanceDataContext)
    const { duration } = useContext(DurationLocationContext)

    return (
        <div className='p-3 bg-[#fff900]' >
            <h2 className=' text-black font-semibold opacity-80 text-[15px]' >
                Distance:{"     "}
                <span className='font-bold mr-3' >
                    {(distance * 0.000621371192).toFixed(2)} Miles
                </span>
                Duration: {" "}
                <span className='font-bold mr-3 text-black' >
                    {(distance / 60).toFixed(2)} Min
                </span>
            </h2>
        </div >
    )
}

export default DistanceTime
