import Link from "next/link"
import { useState } from "react";

const Navbar = () => {
    const [navbar, setNavbar] = useState(false);
    return (
        // <nav className="grid grid-cols-3 h-15 items-center " >
        //     {/* Left */}
        //     <div className="relative p-5  ">
        //         <h2 className="font-semibold text-lg text-amber-500 uppercase ">YatriPravasi.com</h2>
        //     </div>
        //     {/* Middle */}
        //     <div className="relative p-5 ">
        //         <ul className="flex space-x-5 text-gray-700 font-medium ">
        //             <li className="hover:text-amber-900 cursor-pointer" >
        //                 <Link href={'/'}>Home</Link>
        //             </li>
        //             <li className="hover:text-amber-900 cursor-pointer" >
        //                 <Link href={'/book'}>Booking Form</Link></li>
        //             <li className="hover:text-amber-900 cursor-pointer" >
        //                 <Link href={'/'}>Category</Link></li>
        //             <li className="hover:text-amber-900 cursor-pointer" >
        //                 <Link href={'/'}>Contact Us</Link></li>
        //         </ul>
        //     </div>
        //     {/* Right */}
        //     <div className="relative p-5 ml-auto space-x-5 font-bold">
        //         <button className="outline-none">Login</button>
        //         <button className="px-5 py-2 bg-amber-500 rounded-lg outline-none text-white hover:bg-amber-600 hover:scale-105">SignUp</button>
        //     </div>
        // </nav>
        <nav className="w-full  shadow">
            <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                <div>
                    <div className="flex items-center justify-between py-3 md:py-5 md:block">
                        <a href="javascript:void(0)">
                            <h2 className="text-2xl font-bold text-orange-600">LOGO</h2>
                        </a>
                        <div className="md:hidden">
                            <button
                                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                onClick={() => setNavbar(!navbar)}
                            >
                                {navbar ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-white"
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
                                        className="w-6 h-6 text-white"
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
                        className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbar ? "block" : "hidden"
                            }`}
                    >
                        <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                            <li className="hover:text-amber-900 cursor-pointer" >
                                <Link href={'/'}>Home</Link>
                            </li>
                            <li className="hover:text-amber-900 cursor-pointer" >
                                <Link href={'/book'}>Booking Form</Link></li>
                            <li className="hover:text-amber-900 cursor-pointer" >
                                <Link href={'/'}>Category</Link></li>
                            <li className="hover:text-amber-900 cursor-pointer" >
                                <Link href={'/'}>Contact Us</Link></li>
                        </ul>

                        <div className="mt-3 space-y-2 lg:hidden md:inline-block">
                            <a
                                href="javascript:void(0)"
                                className="inline-block w-full px-4 py-2 text-center text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
                            >
                                Sign in
                            </a>
                            <a
                                href="javascript:void(0)"
                                className="inline-block w-full px-4 py-2 text-center text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
                            >
                                Sign up
                            </a>
                        </div>
                    </div>
                </div>
                <div className="hidden space-x-2 md:inline-block">
                    <button 
                        className="px-4 py-2 text-white bg-orange-600 rounded-md shadow hover:bg-gray-800"
                    >
                        Sign in
                    </button>
                    <button
                        className="px-4 py-2 text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
                    >
                        Sign up
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar