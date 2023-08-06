import Link from "next/link"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Navbar = () => {
    const [navbar, setNavbar] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const router = useRouter()
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset;
            if (scrollTop > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        // <nav className="w-full  shadow-xl fixed top-0 z-50 bg-transparent">
        <nav className={` ${scrolled ? 'shadow-2xl' : ''} w-full  fixed p-2  top-0 z-50 ${router.pathname === '/' ? (scrolled ? 'bg-[#051036]' : 'bg-transparent') : 'bg-[#051036]'} text-white`}>
            <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                <div>
                    <div className="flex items-center justify-between py-3 md:py-5 md:block">
                        <Link href="/">
                            <h2 className="text-3xl font-semibold text-white">SAFARLY</h2>
                        </Link>
                        <div className="md:hidden">
                            <button
                                className="p-2 text-gray-700 rounded-md outline-none"
                                onClick={() => {
                                    setNavbar(!navbar);
                                    setScrolled(true)
                                }}
                            >
                                {navbar ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-[#6388ff] "
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-[#6388ff]"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        className={`flex-1 text-lg justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbar ? "block" : "hidden"
                            }`}
                    >
                        {/* <ul className="font-normal text-[1rem] items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                            <li className="hover:text-[#6388ff] cursor-pointer" >
                                <Link href={'/'}>Home</Link>
                            </li>
                            <li className="hover:text-[#6388ff] cursor-pointer" >
                                <Link href={'/trip'}>TripPlanner</Link></li>
                            <li className="hover:text-[#6388ff] cursor-pointer" >
                                <Link href={'/locationDetails'}>Category</Link></li>
                            <li className="hover:text-[#6388ff] cursor-pointer" >
                                <Link href={'/'}>Contact Us</Link></li>
                        </ul> */}

                        {/* <div className="mt-3 space-y-2 md:hidden sm:inline-block  text-[1rem]">
                            <button
                                className="px-4 py-3  text-white bg-transparent border-white border-[1px] max-w-full rounded-md shadow hover:bg-white hover:text-gray-900 "
                            >
                                Sign in / Register
                            </button>
                        </div> */}
                    </div>
                </div>
                {/* <div className="hidden space-x-2 md:inline-block text-[1rem]">
                    <button
                        className="px-4 py-3  text-white bg-transparent border-white border-[1px] max-w-full rounded-md shadow hover:bg-white hover:text-gray-900 "
                    >
                        Sign in / Register
                    </button>
                </div> */}
            </div>

        </nav>
    )
}

export default Navbar