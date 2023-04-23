import Image from "next/image"
import { SearchIcon } from '@heroicons/react/outline'
import { LocationMarkerIcon, CalendarIcon, UserGroupIcon } from '@heroicons/react/solid'
import { DatePicker, Form } from "antd";
import moment from "moment";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
const Hero = () => {
    const api = '5ae2e3f221c38a28845f05b68ce6ae95583a6fad9ee3891cebf55e1f'
    const [minDate, setMinDate] = useState(new Date().toISOString().slice(0, 10));
    const router = useRouter();
    return (
        <section>
            <div className=" ml-auto mr-auto flex flex-col items-center rounded-2xl mt-7 ">

                {/* Hero Images */}

                <div className="relative h-[80vh] w-[95%] md:h-[550px] lg:w-[1160px] rounded-2xl shadow-lg ml-9 mr-9">
                    <Image className="rounded-2xl" src={'/hero.jpg'} alt="hero" fill style={{ objectFit: "cover" }} />
                    <div className="absolute top-5 z-3 h-[100%] w-[100%] block sm:hidden ">
                        <h2 className="  text-[30px] p-3 text-center font-bold text-black-50 bg-slate-100 bg-opacity-90 w-[100%] px-8 uppercase ">Taj Mahal</h2>
                    </div>
                    <div className="absolute left-20  top-0 z-3 h-[100%] w-[100%] hidden md:block ">
                        <h2 style={{ textOrientation: "upright", writingMode: "vertical-lr" }} className="  text-[30px] p-3 text-center font-bold text-black-50 bg-slate-100 bg-opacity-90  h-[100%] px-8 uppercase ">Taj Mahal</h2>
                    </div>
                </div>



                {/* Perference Form */}

                < div className="relative grid grid-cols-1 gap-5 sm:grid-cols-1  h-25 sm:w-[700px] md:w-[900px] p-7 z-10 -top-10 bg-slate-50 shadow-md rounded-2xl" >
                    {/* Left */}
                    < div >
                        <div className="flex  items-center">
                            <LocationMarkerIcon className="h-5 text-amber-500" />
                            <h2 className="font-semibold  text-xl ml-2">Location</h2>
                        </div>
                        <input type="text" placeholder="Where do you want to go?" className="p-3 outline-none placeholder:text-gray-400 border-b bg-transparent placeholder:text-md w-full" />
                    </div>
                    {/* Middle */}
                    {/* <div>
                        <div className="flex  items-center">
                            <CalendarIcon className="h-5 text-amber-500" />
                            <h2 className="font-semibold  text-xl ml-2">Date</h2>
                        </div>
                        <input type="date" min={minDate} placeholder="Where do you want to go?"  className="p-3 outline-none placeholder:text-gray-400 border-b bg-transparent placeholder:text-sm w-full" />
                    </div> */}
                    {/* Right */}
                    {/* <div>
                        <div className="flex  items-center">
                            <UserGroupIcon className="h-5 text-amber-500" />
                            <h2 className="font-semibold  text-xl ml-2">Guests</h2>
                        </div>
                        <input type="text" placeholder="Where do you want to go?" className="p-3 outline-none placeholder:text-gray-400 border-b bg-transparent placeholder:text-sm w-full" />
                    </div> */}
                    <Link href='/locationDetails'>
                        <SearchIcon className="h-11 cursor-pointer text-center w-full sm:col-span-3 bg-orange-600 text-white rounded-full py-2 hover:bg-slate-700 " />
                    </Link>
                </div>
            </div >

        </section >
    )
}


export default Hero