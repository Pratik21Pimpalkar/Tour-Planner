import React, { useEffect, useRef, useState } from 'react'
import { cities } from '../LandingPage/cities';
import { DatePicker, Select } from 'antd';
const { RangePicker } = DatePicker;
const { Option } = Select;
const Form = () => {
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);
    const [tripData, setTripData] = useState({
        places: [],
        startDate: "",
        endDate: "",
        budget: "",
        interest: [],
        accomodation: [],
        transport: [],
        activities: [],
        cuisines: [],
        languages: []
    })
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
    const accomodation = [
        { label: "Hotel", value: "Hotel" },
        { label: "Boutique Hotel", value: "Boutique Hotel" },
        { label: "Hostel", value: "Hostel" },
        { label: "Resort", value: "Resort" },
        { label: "Vacation Rental", value: "Vacation Rental" },
        { label: "Camping", value: "Camping" },
        { label: "Homestay", value: "Homestay" },
        { label: "Bed and Breakfast", value: "Bed and Breakfast" },
    ];
    const options = [
        { label: "History", value: "History" },
        { label: "Art", value: "Art" },
        { label: "Food", value: "Food" },
        { label: "Music", value: "Music" },
        { label: "Nature", value: "Nature" },
        { label: "Sports", value: "Sports" },
        { label: "Photography", value: "Photography" },
        { label: "Architecture", value: "Architecture" },
        { label: "Literature", value: "Literature" }
    ];
    const transport = [
        { label: "Airplane", value: "Airplane" },
        { label: "Train", value: "Train" },
        { label: "Bus", value: "Bus" },
        { label: "Car", value: "Car" },
        { label: "Bicycle", value: "Bicycle" },
        { label: "Motorcycle", value: "Motorcycle" },
        { label: "Boat", value: "Boat" },
        { label: "Walking", value: "Walking" },
    ];
    const cuisines = [
        { label: "Italian", value: "Italian" },
        { label: "Mexican", value: "Mexican" },
        { label: "Chinese", value: "Chinese" },
        { label: "Indian", value: "Indian" },
        { label: "Japanese", value: "Japanese" },
        { label: "Thai", value: "Thai" },
        { label: "French", value: "French" },
        { label: "Mediterranean", value: "Mediterranean" },
    ];
    const activities = [
        { label: "Shopping", value: "Shopping" },
        { label: "Museums", value: "Museums" },
        { label: "Art Galleries", value: "Art Galleries" },
        { label: "Historical Sites", value: "Historical Sites" },
        { label: "Theme Parks", value: "Theme Parks" },
        { label: "Zoos and Aquariums", value: "Zoos and Aquariums" },
        { label: "Nightlife", value: "Nightlife" },
        { label: "Concerts and Shows", value: "Concerts and Shows" },
        { label: "Sports Events", value: "Sports Events" },
        { label: "Outdoor Adventures", value: "Outdoor Adventures" },
    ];
    const languages = [
        { label: "English", value: "English" },
        { label: "Spanish", value: "Spanish" },
        { label: "French", value: "French" },
        { label: "German", value: "German" },
        { label: "Mandarin", value: "Mandarin" },
        { label: "Arabic", value: "Arabic" },
        { label: "Russian", value: "Russian" },
        { label: "Portuguese", value: "Portuguese" },
        { label: "Japanese", value: "Japanese" },
        { label: "Korean", value: "Korean" },
        { label: "Hindi", value: "Hindi" },
        { label: "Bengali", value: "Bengali" },
        { label: "Tamil", value: "Tamil" },
        { label: "Telugu", value: "Telugu" },
        { label: "Marathi", value: "Marathi" },
        { label: "Gujarati", value: "Gujarati" },
    ];
    return (
        <div className='mt-36 px-7 sm:px-2'>
            <h1 className='capitalize text-center text-[2.25rem] font-bold text-blue-900 my-10 bg-[aliceblue] p-2'  > Plan your Vacations</h1>
            <div className="md:w-[1024px] mx-auto ">
                <div className='grid sm:grid-cols-3 grid-cols-1 gap-5 mb-5'>
                    {/* <div className=' md:w-4/6 w-full bg-white p-2 rounded-md flex justify-center items-start flex-col '>
                        <input
                            type="search"
                            value={search}
                            onClick={toggleDropdown}
                            onChange={handleSearch}
                            placeholder="Search Here..."
                            className="py-4 px-4 w-full rounded shadow bg-slate-100 border-[#4096ff] focus:border-[1px] font-thin focus:outline-none focus:shadow-lg focus:shadow-slate-300 duration-100 shadow-gray-300 placeholder:text-gray-500"
                        />
                        <ul
                            ref={dropdownRef}
                            className={`${open ? 'block -translate-y-[-8rem]' : 'hidden translate-y-0'
                                } h-48 md:w-2/6 w-full absolute overflow-y-auto bg-white rounded shadow-md z-50 transition-opacity transition-transform`}
                        >
                            {
                                cities.filter((c) => c.toLowerCase().startsWith(search.toLowerCase())).map(city => <li key={city} className="w-full text-gray-700 p-4 mt-2 cursor-pointer hover:bg-gray-100" onClick={() => setSearch(city)}>
                                    {city}
                                </li>)
                            }
                        </ul>
                    </div> */}
                    <Select mode="tags" className="py-4 px-4 w-full col-span-2  rounded shadow bg-slate-100 border-[#4096ff] focus:border-[1px] font-thin focus:outline-none focus:shadow-lg focus:shadow-slate-300 duration-100 shadow-gray-300 placeholder:text-gray-500" style={{ width: '100%' }} placeholder="Enter destination" onChange={(value) => setTripData({ ...tripData, places: value })}>
                        {cities.map((city) => {
                            return (
                                <Option key={city}>{city}</Option>
                            )
                        })}
                    </Select>
                    <RangePicker disabledDate={(current) => current && current < new Date().setHours(0, 0, 0, 0)} className='py-4 px-4 w-full   min-w-[10rem] rounded shadow bg-slate-100 border-[#4096ff] focus:border-[1px] font-thin focus:outline-none focus:shadow-lg focus:shadow-slate-300 duration-100 shadow-gray-300 placeholder:text-gray-500'
                        onChange={(v, d) => {
                            setTripData({ ...tripData, startDate: d[0], endDate: d[1] })
                        }} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

                    <input type="number" className='py-4 px-4 w-full   min-w-[10rem] rounded shadow bg-slate-100 border-[#4096ff] focus:border-[1px] font-thin focus:outline-none focus:shadow-lg focus:shadow-slate-300 duration-100 shadow-gray-300 placeholder:text-gray-500' placeholder='Budget (in INR)'
                        onChange={(e) => setTripData({ ...tripData, budget: e.target.value })}
                    />

                    <Select
                        mode="multiple"
                        allowClear
                        className='py-4 px-4 w-full   min-w-[10rem] rounded shadow bg-slate-100 border-[#4096ff] focus:border-[1px] font-thin focus:outline-none focus:shadow-lg focus:shadow-slate-300 duration-100 shadow-gray-300 placeholder:text-gray-500'
                        placeholder="Interest"
                        defaultValue={[]}
                        onChange={(value) => setTripData({ ...tripData, interest: value })}
                        options={options}
                    />
                    <Select
                        mode="multiple"
                        allowClear
                        className='py-4 px-4 w-full  min-w-[10rem]  rounded shadow bg-slate-100 border-[#4096ff] focus:border-[1px] font-thin focus:outline-none focus:shadow-lg focus:shadow-slate-300 duration-100 shadow-gray-300 placeholder:text-gray-500'
                        placeholder="Accomodation"
                        defaultValue={[]}
                        onChange={(value) => setTripData({ ...tripData, accomodation: value })}
                        options={accomodation}
                    />
                    <Select
                        mode="multiple"
                        allowClear
                        className='py-4 px-4 w-full  min-w-[10rem]  rounded shadow bg-slate-100 border-[#4096ff] focus:border-[1px] font-thin focus:outline-none focus:shadow-lg focus:shadow-slate-300 duration-100 shadow-gray-300 placeholder:text-gray-500'
                        placeholder="Transport"
                        defaultValue={[]}
                        onChange={(value) => setTripData({ ...tripData, transport: value })}
                        options={transport}
                    />
                    <Select
                        mode="multiple"
                        allowClear
                        className='py-4 px-4 w-full   min-w-[10rem]  rounded shadow bg-slate-100 border-[#4096ff] focus:border-[1px] font-thin focus:outline-none focus:shadow-lg focus:shadow-slate-300 duration-100 shadow-gray-300 placeholder:text-gray-500'
                        placeholder="Activities you like to have"
                        defaultValue={[]}
                        onChange={(value) => setTripData({ ...tripData, activities: value })}
                        options={activities}
                    />
                    <Select
                        mode="multiple"
                        allowClear
                        className='py-4 px-4 w-full   min-w-[10rem]  rounded shadow bg-slate-100 border-[#4096ff] focus:border-[1px] font-thin focus:outline-none focus:shadow-lg focus:shadow-slate-300 duration-100 shadow-gray-300 placeholder:text-gray-500'
                        placeholder="Cuisine"
                        defaultValue={[]}
                        onChange={(value) => setTripData({ ...tripData, cuisines: value })}
                        options={cuisines}
                    />
                    <Select
                        mode="multiple"
                        allowClear
                        className='py-4 px-4 w-full   min-w-[10rem]  rounded shadow bg-slate-100 border-[#4096ff] focus:border-[1px] font-thin focus:outline-none focus:shadow-lg focus:shadow-slate-300 duration-100 shadow-gray-300 placeholder:text-gray-500'
                        placeholder="Language of Plan"
                        defaultValue={[]}
                        onChange={(value) => setTripData({ ...tripData, languages: value })}
                        options={languages}
                    />
                </div>
                <div className='w-full flex justify-center mt-10'>
                    <button type="button" className="text-white mx-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Build Your Trip</button>
                </div>
            </div>

        </div>
    )
}

export default Form