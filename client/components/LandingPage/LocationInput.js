import React, { useEffect, useRef, useState } from 'react';
import { cities } from './cities';
function SearchBar() {

    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);
    const items = ['Bitcoin', 'Ethereum', 'Siacoin'];

    function handleSearch(event) {
        setSearch(event.target.value);
    }

    function toggleDropdown() {
        setOpen(!open);
    }

    function handleItemClick(item) {
        setSearch(item);
        setOpen(false);
    }
    const dropdownRef = useRef(null);
    function handleClickOutside(event) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setOpen(false);
        }
    }


    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>

            <div className='w-full bg-white p-2 rounded-md'>
                <input
                    type="search"
                    value={search}
                    onClick={toggleDropdown}
                    onChange={handleSearch}
                    placeholder="Search Here..."
                    className="py-3 px-4 w-full rounded shadow font-thin focus:outline-none focus:shadow-lg focus:shadow-slate-200 duration-100 shadow-gray-100"
                />
                <ul
                    ref={dropdownRef}
                    className={`${open ? 'block -translate-y-[-1rem]' : 'hidden translate-y-0'
                        } h-48 w-full absolute overflow-y-auto bg-white rounded shadow-md z-50 transition-opacity transition-transform`}
                >
                    {
                        cities.filter((c) => c.toLowerCase().startsWith(search.toLowerCase())).map(city => <li key={city} className="w-full text-gray-700 p-4 mt-2 cursor-pointer hover:bg-gray-100" >
                            {city}
                        </li>)
                    }

                    {/* <div className='flex items-center justify-center w-full'>
                        <Spinner />
                    </div> */}
                </ul>
            </div>
        </>
    )
}

export default SearchBar


