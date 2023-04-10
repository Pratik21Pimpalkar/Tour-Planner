import React, { useState } from 'react';
import { SearchIcon } from '@heroicons/react/outline'
import Link from 'next/link';

function SearchBar() {
    const [location, setLocation] = useState('');
    const [arrivalDate, setArrivalDate] = useState('');
    const [departureDate, setDepartureDate] = useState('');

    function handleLocationChange(event) {
        setLocation(event.target.value);
    }

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

    return (
        <div className='bg-white p-5 sm:px-10  rounded-lg lg:rounded-full '>
            <form onSubmit={handleSearch} className="flex justify-center items-start lg:items-center flex-col lg:flex-row gap-3 sm:gap-0">
                <div className="sm:mr-4">
                    <label htmlFor="location" className="block text-gray-700 font-bold mb-2">Location</label>
                    <input type="text" id="location" value={location} onChange={handleLocationChange} className="border rounded-lg px-4 pl-0 py-2  outline-none border-none w-64" placeholder="Enter a city or destination" required />
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
                        <div className='flex gap-2 items-center w-full justify-center  '>
                            <SearchIcon className='h-5' />Search</div>
                    </Link>
                </button>
            </form>
        </div >
    );
}

export default SearchBar