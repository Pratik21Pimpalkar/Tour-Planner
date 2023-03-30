import Image from "next/image"
import { SearchIcon } from '@heroicons/react/outline'
import { LocationMarkerIcon, CalendarIcon, UserGroupIcon } from '@heroicons/react/solid'
const Hero = () => {
    return (
        <section>
            <div className=" ml-auto mr-auto flex flex-col items-center rounded-2xl mt-3 ">

                {/* Hero Images */}
                <div className="relative h-[80vh] w-[100%] md:h-[550px] lg:w-[1100px] rounded-2xl shadow-lg ml-9 mr-9">
                    <Image className="rounded-2xl" src={"/hero.jpg"} alt="hero" fill style={{ objectFit: "cover" }} />
                    <div className="absolute top-5 z-3 h-[100%] w-[100%] block sm:hidden ">
                        <h2 className="  text-[30px] p-3 text-center font-bold text-black-50 bg-slate-100 bg-opacity-90 w-[100%] px-8 uppercase ">Taj Mahal</h2>
                    </div>
                    <div className="absolute left-20  top-0 z-3 h-[100%] w-[100%] hidden sm:block ">
                        <h2 style={{ textOrientation: "upright", writingMode: "vertical-lr" }} className="  text-[30px] p-3 text-center font-bold text-black-50 bg-slate-100 bg-opacity-90  h-[100%] px-8 uppercase ">Taj Mahal</h2>
                    </div>
                </div>

                {/* Perference Form */}

                <div className="relative grid grid-cols-1  sm:grid-cols-3  h-25 sm:w-[700px] md:w-[900px] p-7 z-10 -top-10 bg-slate-50 shadow-md rounded-2xl">
                    {/* Left */}
                    <div>
                        <div className="flex space-x-2 items-center">
                            <LocationMarkerIcon className="h-5 text-amber-500" />
                            <h2 className="font-semibold  text-xl ml-2">Location</h2>
                        </div>
                        <input type="text" placeholder="Where do you want to go?" className="p-3 outline-none placeholder:text-gray-400 border-b bg-transparent placeholder:text-sm" />
                    </div>
                    {/* Middle */}
                    <div>
                        <div className="flex space-x-2 items-center">
                            <CalendarIcon className="h-5 text-amber-500" />
                            <h2 className="font-semibold  text-xl ml-2">Date</h2>
                        </div>
                        <input type="text" placeholder="Where do you want to go?" className="p-3 outline-none placeholder:text-gray-400 border-b bg-transparent placeholder:text-sm" />
                    </div>
                    {/* Right */}
                    <div className="flex items-center space-x-5">
                        <div>
                            <div className="flex space-x-2 items-center">
                                <UserGroupIcon className="h-5 text-amber-500" />
                                <h2 className="font-semibold  text-xl ml-2">Guests</h2>
                            </div>
                            <input type="text" placeholder="Where do you want to go?" className="p-3 outline-none placeholder:text-gray-400 border-b bg-transparent placeholder:text-sm" />
                        </div>
                        <SearchIcon className="h-7 cursor-pointer" />
                    </div>
                    {/* Button */}
                </div>
            </div>
        </section>
    )
}


export default Hero