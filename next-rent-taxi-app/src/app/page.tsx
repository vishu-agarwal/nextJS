'use client'
import Booking from '@/components/Booking/Booking'
import Map from '@/components/Map/Map'
import { CarAmountDataContext } from '@/context/CarAmountContext';
import { DistanceDataContext, DurationLocationContext } from '@/context/LocationContext';
import { useEffect, useState } from 'react';


export default function Home() {

  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [origin, setOrigin] = useState({
    lat: 0,
    lng: 0
  });
  const [amount, setAmount] = useState(0)

  async function onHandleDirection(location: any) {

    const directionsService = window.google && new window.google.maps.DirectionsService();

    const fromLat = location.from.lat;
    const fromLng = location.from.lng;
    const toLat = location.to.lat;
    const toLng = location.to.lng;

    setOrigin({ lat: location.from.lat, lng: location.from.lng })

    const results: any = await directionsService?.route({
      origin: { lat: fromLat, lng: fromLng },
      destination: { lat: toLat, lng: toLng },
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING
    });

    setDirectionsResponse(results);
    setDistance(results?.routes[0].legs[0].distance.value);//distance.text
    setDuration(results?.routes[0].legs[0].distance.value);//duration.text

  }


  return (
    <div>
      <DistanceDataContext.Provider value={{ distance, setDistance }} >
        <DurationLocationContext.Provider value={{ duration }} >
          <CarAmountDataContext.Provider value={{amount, setAmount}} >
            <div className='grid md:grid-cols-3 grid-cols-1' >
              <div className='' ><Booking onHandleDirection={onHandleDirection} /></div>
              <div className='col-span-2' >
                <Map directionsResponse={directionsResponse} distance={distance} duration={duration} origin={origin} /></div>
            </div>
          </CarAmountDataContext.Provider>
        </DurationLocationContext.Provider>
      </DistanceDataContext.Provider>
    </div>
  )
}
