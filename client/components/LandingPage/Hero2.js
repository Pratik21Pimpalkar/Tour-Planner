import Image from "next/image"
import { useState, useEffect } from 'react';
import SearchBar from "./LocationInput";
import Link from "next/link";
const Hero2 = () => {
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        function handleScroll() {
            setScrollPosition(window.pageYOffset);
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <section className="min-h-[100vh]">
                <div className="relative">
                    <div className="bg-black opacity-70 min-h-[120vh] lg:min-h-[100vh] w-full z-10 absolute "></div>
                    <div className="bg-gradient-to-r from-blue-950 via-transparent to-slate-950 bg-no-repeat bg-center bg-cover min-h-[120vh] lg:min-h-[100vh] w-full z-10 absolute "></div>
                    <div className="relative min-h-[120vh] lg:min-h-[100vh]">
                        <Image src={'/goa.jpg'} alt="s" fill style={{ objectPosition: `center ${scrollPosition / 2}px`, top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }} />
                    </div>
                    <div className="absolute top-[250px] sm:top-[180px] left-1/2 transform -translate-x-1/2 -translate-y-1 z-10 ">
                        <div className="text-center mb-10 sm:mb-20">
                            <h2 className="font-bold text-white text-[43px] lg:text-[80px] md:text-[50px]  ">Find Your Tour</h2>
                            <h2 className="font-thin text-white text-[15px] lg:text-[20px] md:text-[20px]">Discover Amazing Places</h2>
                        </div>
                        {/* <SearchBar /> */}
                        <div className="flex w-full justify-center">
                            <Link href={'plantrip'} className="flex w-full justify-center">
                                <button type="button" className="text-blue-50 bg-[#3b79c9]  hover:bg-blue-900 font-bold rounded-lg md-text-lg text-sm px-4 sm:px-5 py-4  sm:py-5 text-center mx-auto w-full lg:w-2/4 uppercase">Plan Your Holidays !</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Hero2