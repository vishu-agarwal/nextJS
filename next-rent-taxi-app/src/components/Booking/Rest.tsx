'use client'

import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  useLoadScript,
  GoogleMap,
  Marker,
  DirectionsRenderer
} from "@react-google-maps/api";
const placesLibrary: any = ["places"];

function Rest() {
  const [searchResult, setSearchResult] = useState<any>(null);

  const [map, setMap] = useState<any>(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

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
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyABX4LTqTLQGg_b3jFOH8Z6_H5CDqn8tbc",
    libraries: placesLibrary
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  // const temp = async () => {
  //   const directionsService = new window.google.maps.DirectionsService();

  //   const fromLat: any = 21.1872618; //location.from.lat;
  //   const fromLng: any = 72.8576319; //location.from.lng;
  //   const toLat: any = 21.187264; //location.to.lat;
  //   const toLng: any = 72.857633; //location.to.lng;

  //   const results: any = await directionsService.route({
  //     origin: { lat:fromLat, lng:fromLng },
  //     destination: { lat:toLat, lng:toLng },
  //     // eslint-disable-next-line no-undef
  //     travelMode: google.maps.TravelMode.DRIVING
  //   });

  //   setDirectionsResponse(results);
  // };
  // useEffect(() => {
  //   temp();
  // }, []);



  // /** @type React.MutableRefObject<HTMLInputElement> */
  // const originRef = useRef();
  // /** @type React.MutableRefObject<HTMLInputElement> */
  // const destiantionRef = useRef();

  // async function calculateRoute() {
  //   if (originRef.current.value === "" || destiantionRef.current.value === "") {
  //     return;
  //   }
  //   // eslint-disable-next-line no-undef
  //   const directionsService = new google.maps.DirectionsService();
  //   const results = await directionsService.route({
  //     origin: originRef.current.value,
  //     destination: destiantionRef.current.value,
  //     // eslint-disable-next-line no-undef
  //     travelMode: google.maps.TravelMode.DRIVING
  //   });
  //   setDirectionsResponse(results);
  //   setDistance(results.routes[0].legs[0].distance.text);
  //   setDuration(results.routes[0].legs[0].duration.text);
  // }

  // function onLoad(autocomplete) {
  //   setSearchResult(autocomplete);
  // }

  function onLoad(autocomplete: any) {
    setSearchResult(autocomplete);
  }

  // async function onSourceChanged(where) {
  //   console.log("=====", searchResult);
  //   if (searchResult != null) {
  //     //variable to store the result
  //     const place = searchResult.getPlace();
  //     console.log("destination---", place);
  //     setLocation((prev) => {
  //       return {
  //         ...prev,
  //         [where]: {
  //           name: place.name,
  //           address: place.formatted_address,
  //           lat: place.geometry.location.lat(),
  //           lng: place.geometry.location.lng()
  //         }
  //       };
  //     });
  //     // variable to store the name from place details result
  //     const name = place.name;
  //     //variable to store the status from place details result
  //     // const status = place.business_status;
  //     //variable to store the formatted address from place details result
  //     const formattedAddress = place.formatted_address;
  //     console.log(place);
  //     //console log all results
  //     console.log(`Name: ${name}`);
  //     console.log(`Formatted Address: ${formattedAddress}`);
  //     console.log("Lat", place.geometry.location.lat());
  //     console.log("Lng", place.geometry.location.lng());
  //     setSearchResult(null);

  //     if (location.from.name.length && location.to.name.length) {
  //       const directionsService = new window.google.maps.DirectionsService();

  //       const fromLat: number = 21.1872618; //location.from.lat;
  //       const fromLng: number = 72.8576319; //location.from.lng;
  //       const toLat: number = 21.187264; //location.to.lat;
  //       const toLng: number = 72.857633; //location.to.lng;

  //       const results = await directionsService.route({
  //         origin: { fromLat, fromLng },
  //         destination: { toLat, toLng },
  //         // eslint-disable-next-line no-undef
  //         travelMode: google.maps.TravelMode.DRIVING
  //       });

  //       setDirectionsResponse(results);
  //       setDistance(results.routes[0].legs[0].distance.text);
  //       setDuration(results.routes[0].legs[0].duration.text);
  //     }
  //   } else {
  //     alert(`Please enter ${where} address!`);
  //   }
  // }
  async function onDestinationChanged(where: string) {
    console.log("wehre--", where)
    if (searchResult) {
      //variable to store the result
      const place = searchResult?.getPlace();
      console.log("destination---", place);
      setLocation((prev) => {
        return {
          ...prev,
          [where]: {
            name: place.name,
            address: place.formatted_address,
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          }
        };
      });
      // variable to store the name from place details result
      const name = place.name;
      //variable to store the status from place details result
      // const status = place.business_status;
      //variable to store the formatted address from place details result
      const formattedAddress = place.formatted_address;
      console.log(place);
      //console log all results
      console.log(`Name: ${name}`);
      console.log(`Formatted Address: ${formattedAddress}`);
      console.log("Lat", place.geometry.location.lat());
      console.log("Lng", place.geometry.location.lng());
      setSearchResult(null);

      if (location.from.name.length && location.to.name.length) {
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

        setDirectionsResponse(results);
        setDistance(results?.routes[0].legs[0].distance.text);
        setDuration(results?.routes[0].legs[0].duration.text);
      }
    } else {
      alert(`Please enter ${where} address!`);
    }
  }

  async function onPlaceChanged(where: string = "from") {
    console.log("wehre--", where)
    if (searchResult !== null) {
      //variable to store the result
      const place = searchResult?.getPlace();
      console.log("destination---", place);
      setLocation((prev) => {
        return {
          ...prev,
          [where]: {
            name: place.name,
            address: place.formatted_address,
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          }
        };
      });
      // variable to store the name from place details result
      const name = place.name;
      //variable to store the status from place details result
      // const status = place.business_status;
      //variable to store the formatted address from place details result
      const formattedAddress = place.formatted_address;
      console.log(place);
      //console log all results
      console.log(`Name: ${name}`);
      console.log(`Formatted Address: ${formattedAddress}`);
      console.log("Lat", place.geometry.location.lat());
      console.log("Lng", place.geometry.location.lng());
      setSearchResult(null);

      if (location.from.name.length && location.to.name.length) {
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

        setDirectionsResponse(results);
        setDistance(results?.routes[0].legs[0].distance.text);
        setDuration(results?.routes[0].legs[0].duration.text);
      }
    }
    //  else {
    //   alert(`Please enter ${where} address!`);
    // }
  }

  const center = { lat: 21.1872618, lng: 72.8576319 };

  console.log("location--", location);
  console.log("duration---", duration);
  console.log("distance---", distance);
  console.log("directionsResponse---", directionsResponse);
  console.log("searchResult---", searchResult);


  return (
    <div className="App">
      <div id="searchColumn">
        <h2>Tide Forecast Options</h2>
        from
        <Autocomplete
          onPlaceChanged={() => onPlaceChanged("from")}
          onLoad={onLoad}
        >
          <input
            name="from"
            type="text"
            placeholder="Search for destination"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`
            }}
          />
        </Autocomplete>
        to
        <Autocomplete
          onPlaceChanged={() => onPlaceChanged("to")}
          onLoad={onLoad}
        >
          <input
            name="destination"
            type="text"
            placeholder="Search for destination"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`
            }}
          />
        </Autocomplete>
      </div>
      <div>
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: "900px", height: "400px" }}
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
            // defaultOptions={{
            //   suppressMarkers: true
            // }}
            />
          )}
        </GoogleMap>
      </div>
      {/* <div>
          <GoogleMap
            center={center}
            zoom={10}
            onLoad={map => setMap(map)}
            mapContainerStyle={{ height: "400px", width: "800px" }}
          >
        {this.state.markers.map((mark, index) => ( 
              <Marker position={center} />
             ))} 
          </GoogleMap>
        </div> */}
    </div>
  );
}

export default Rest;
