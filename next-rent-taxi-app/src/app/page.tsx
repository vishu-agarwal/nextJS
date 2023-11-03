'use client'
import Booking from '@/components/Booking/Booking'
import Map from '@/components/Map/Map'
import { UserLocationContext } from '@/context/UserLocationContext';
import { useEffect, useState } from 'react';


export default function Home() {

  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState();
  const [duration, setDuration] = useState();

  async function onHandleDirection(location: any) {
    console.log("handle direction calls")

    const directionsService = new window.google.maps.DirectionsService();

    const fromLat = location.from.lat;
    const fromLng = location.from.lng;
    const toLat = location.to.lat;
    const toLng = location.to.lng;

    const results: any = await directionsService.route({
      origin: { lat: fromLat, lng: fromLng },
      destination: { lat: toLat, lng: toLng },
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING
    });

    console.log("results=", results)

    setDirectionsResponse(results);
    setDistance(results?.routes[0].legs[0].distance.text);
    setDuration(results?.routes[0].legs[0].duration.text);

  }


  return (
    <div>
      <UserLocationContext.Provider value={{ directionsResponse, setDirectionsResponse }} >
        <div className='grid md:grid-cols-3 grid-cols-1' >
          <div className='' ><Booking onHandleDirection={onHandleDirection} /></div>
          <div className='col-span-2' ><Map directionsResponse={directionsResponse} distance={distance} duration={duration} /></div>
        </div>
      </UserLocationContext.Provider>
    </div>
  )
}
