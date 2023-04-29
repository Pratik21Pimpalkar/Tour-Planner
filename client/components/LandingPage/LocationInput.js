import React, { useState } from 'react';
import { SearchIcon } from '@heroicons/react/outline'
import { useAutoCompleteSearchMutation, useGetPlaceDetailsMutation, fetchApiData } from '@/services/api';
import { useDispatch } from 'react-redux';
import Link from 'next/link';

function SearchBar() {
    const [place_id, setPlace_id] = useState("");
    const [timeoutId, setTimeoutId] = useState(null);
    const [location, setLocation] = useState({ query: '' });
    const [suggestions, setSuggestions] = useState([]);
    const [arrivalDate, setArrivalDate] = useState('');
    const [departureDate, setDepartureDate] = useState('');

    const dispatch = useDispatch();
    function handleArrivalDateChange(event) {
        setArrivalDate(event.target.value);
    }

    function handleDepartureDateChange(event) {
        setDepartureDate(event.target.value);
    }

    function handleSearch(event) {
        event.preventDefault();
        // Add code here to handle search functionality
    }


    const handleSelectSuggestion = (place) => {
        setLocation({ query: place.formatted });
        setPlace_id(place.place_id)
        setSuggestions([])
    }

    const options = { pollingInterval: 1000, skip: location.query.trim() === '' };
    const [trigger, { isSuccess, data }] = useAutoCompleteSearchMutation(location, options);
    const handleLocationChange = (e) => {
        setLocation({ query: e.target.value });
        clearTimeout(timeoutId)
        if (location.query.trim() !== "") {
            const newTimeoutId = setTimeout(() => {
                trigger({ query: e.target.value });
                // console.log(result?.data?.results);
                if (isSuccess) {
                    setSuggestions(
                        data?.features.map((result) => {
                            return (
                                {
                                    long: result?.properties?.lon,
                                    name: result?.properties?.name,
                                    lat: result?.properties?.lat,
                                    formatted: result?.properties?.formatted,
                                    state: result?.properties?.state,
                                    country: result?.properties?.country,
                                    county: result?.properties?.county,
                                    place_id: result?.properties?.place_id

                                    // fsq_id: result?.place?.fsq_id,
                                    // place: result?.place?.name,
                                    // primary: result?.text?.primary,
                                    // secondary: result?.text?.secondary

                                    // address: result?.place?.location.address,
                                    // locality: result?.place?.location.locality,
                                    // region: result?.place?.location.region,
                                    // formattedAddress: result?.place?.location.formatted_address,


                                }
                            )
                        }
                        ))
                }
                console.log(typeof (suggestions));
            }, 500)
            console.log((suggestions));
            setTimeoutId(newTimeoutId)
        }
    }

    const [search, result] = useGetPlaceDetailsMutation(place_id, options);
    const placeSearch = () => {
        dispatch(fetchApiData({ place_id: place_id }))
    }

    return (
        <div className='bg-white p-5 sm:px-10  rounded-lg lg:rounded-full '>
            <form onSubmit={handleSearch} className="flex justify-center items-start lg:items-center flex-col lg:flex-row gap-3 sm:gap-0">
                <div className="sm:mr-4 relative">
                    <label htmlFor="location" className="block text-gray-700 font-bold mb-2">Location</label>
                    <input type="text" id="location" value={location.query} onChange={handleLocationChange} className="border rounded-lg px-4 pl-0 py-2  outline-none border-none w-64" placeholder="Enter a city or destination" required />
                    {suggestions.length > 0 && (
                        <ul className="absolute -left-2 z-10 w-full bg-white  rounded-xl mt-2 h-48 overflow-scroll">
                            {suggestions.length > 0 && suggestions.map((suggestion, index) => (
                                <li
                                    key={index}
                                    className="px-3 py-2 hover:bg-gray-200 cursor-pointer border-gray-50 border-2"
                                    onClick={() => handleSelectSuggestion(suggestion)}
                                >
                                    {/* <span className='font-medium'>{suggestion?.name}</span> {", "} { suggestion?.state} {","}{suggestion?.country} */}
                                    {suggestion?.formatted}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="sm:mr-4">
                    <label htmlFor="arrival-date" className="block text-gray-700 font-bold mb-2">Arrival Date</label>
                    <input type="date" id="arrival-date" value={arrivalDate} onChange={handleArrivalDateChange} className="border rounded-lg px-4 pl-0 py-2 outline-none border-none w-64" required />
                </div>
                <div className="sm:mr-4">
                    <label htmlFor="departure-date" className="block text-gray-700 font-bold mb-2">Departure Date</label>
                    <input type="date" id="departure-date" value={departureDate} onChange={handleDepartureDateChange} className="border rounded-lg px-4 pl-0 py-2  outline-none border-none w-64 " required />
                </div>
                <button type="submit" className="w-full  mt-1 sm:mt-0 bg-gray-950 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full">
                    <Link href={'/locationDetails'}>
                        <div className='flex gap-2 items-center w-full justify-center pointer ' onClick={placeSearch}>
                            <SearchIcon className='h-5' />Search</div>
                    </Link>
                </button>
            </form>
        </div >
    );
}

export default SearchBar