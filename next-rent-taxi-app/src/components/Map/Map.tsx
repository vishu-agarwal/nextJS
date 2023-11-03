"use client"

import React, { useEffect, useState } from 'react'
import {
  GoogleMap,
  Marker,
  useLoadScript,
  DirectionsRenderer
} from "@react-google-maps/api";

const placesLibrary: any = ["places"];
const Map = ({ directionsResponse, distance, duration }: any) => {
  const [map, setMap] = useState<any>(null);
  const [center, setCenter] = useState<any>({
    lat:0,
    lng:0
  })

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition)
    }
  }, [])

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDwIVgIMPOY0UMpmXrqO0hOBNSTM7dH2pA",
    libraries: placesLibrary
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  function showPosition(position: any) {
    let lat = position.coords.latitude
    let lng = position.coords.longitude
    setCenter({ lat, lng })
    console.log("center position ----", position)
  }

  return (
    <div className='p-3' >
      <h2 className="text-[20px] font-semibold" >Map</h2>
      <div className='rounded-xl overflow-hidden ' >
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "500px" }}
          // options={{
          //   zoomControl: false,
          //   streetViewControl: false,
          //   mapTypeControl: false,
          //   fullscreenControl: false
          // }}
          onLoad={(map) => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer
              directions={directionsResponse}
            />
          )}
        </GoogleMap>
      </div>
    </div>
  )
}

export default Map
