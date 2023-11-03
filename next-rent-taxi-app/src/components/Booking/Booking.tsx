"use client"
import React, { useEffect, useState } from 'react'
import AutoCompleteAddress from './AutoCompleteAddress'
import {
    useLoadScript
} from "@react-google-maps/api";
import Cars from './Cars';
import Cards from './Cards';

const placesLibrary: any = ["places"];

interface location {
    name: string,
    address: string,
    lat: number,
    lng: number
}



interface props {
    onHandleDirection(location: any): void
}

const Booking = ({ onHandleDirection }: props) => {

    const [location, setLocation] = useState({
        from: {
            name: "",
            address: "",
            lat: 0,
            lng: 0
        },
        to: {
            name: "",
            address: "",
            lat: 0,
            lng: 0
        }
    });

    useEffect(() => {
        if (location.from.name.length && location.to.name.length)
            onHandleDirection(location)
    }, [location])

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyDwIVgIMPOY0UMpmXrqO0hOBNSTM7dH2pA",
        libraries: placesLibrary
    });

    if (!isLoaded) {
        return <div>Loading...</div>;
    }
    let screenHeight
    if (typeof window !== 'undefined') {
        screenHeight = window.innerHeight * 0.75;
    }

    const onHandleLocation = (place: location, where: string) => {
        setLocation({ ...location, [where]: place })
    }
    console.log("place location---", location)

    return (
        <div className='p-5'>
            <h2 className="text-[20px] font-semibold">Booking</h2>
            <div className='border-[1px] px-2 rounded-md' style={{ height: screenHeight }}>
                <AutoCompleteAddress onHandleLocation={onHandleLocation} where={"from"} />
                <AutoCompleteAddress onHandleLocation={onHandleLocation} where={"to"} />
                <Cars />
                <Cards />
                <button className='w-full bg-[#fff901] p-1 rounded-md mt-4' >Book</button>
            </div>
        </div>
    )
}

export default Booking
