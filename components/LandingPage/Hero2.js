import Image from "next/image"
import { useState, useEffect } from 'react';
import SearchBar from "./LocationInput";
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
                    <div className="bg-black opacity-30 h-[100vh] w-full z-10 absolute "></div>
                    <div className="bg-gradient-to-r from-blue-950 via-transparent to-slate-950 bg-no-repeat bg-center bg-cover h-[100vh] w-full z-10 absolute "></div>
                    <div className="relative h-screen">
                        <Image src={'/goa.jpg'} alt="s" fill style={{ objectPosition: `center ${scrollPosition / 2}px`, top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }} />
                    </div>
                    <div className="absolute top-[140px] sm:top-[180px] left-1/2 transform -translate-x-1/2 -translate-y-1 z-10 ">
                        <div className="text-center mb-5 sm:mb-20">
                            <h2 className="font-bold text-white text-[60px] lg:text-[80px] md:text-[50px]  ">Find Your Tour</h2>
                            <h2 className="font-thin text-white text-[15px] lg:text-[20px] md:text-[20px]">Discover Amazing Places</h2>
                        </div>
                        <SearchBar />
                    </div>
                </div>
            </section>

        </>
    )
}

export default Hero2