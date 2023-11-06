import React, { useState } from 'react';
import {
    Autocomplete
} from "@react-google-maps/api";

interface props {
    onHandleLocation(location: object, where: string): void,
    where: string
}

const AutoCompleteAddress = ({ onHandleLocation, where }: props) => {

    const [searchResult, setSearchResult] = useState<any>(null);

    function onLoad(autocomplete: any) {
        setSearchResult(autocomplete);
    }

    async function onPlaceChanged() {
        if (searchResult !== null) {
            const place = searchResult?.getPlace();
            const location = {
                name: place.name,
                address: place.formatted_address,
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            }
            onHandleLocation(location, where);
            setSearchResult(null);
        }
    }

    return (
        <div className="mt-1">
            <div>
                <label className='text-gray-400 capitalize'>{where}</label>
                <Autocomplete
                    onPlaceChanged={onPlaceChanged}
                    onLoad={onLoad}
                >
                    <input
                        type="text"
                        className={'bg-white p-1 border-[1px] w-full outline-none rounded-md focus:border-[#fff900]'}
                        placeholder={`Enter ${where} location`}
                    />
                </Autocomplete>
            </div>
        </div>
    )
}

export default AutoCompleteAddress
