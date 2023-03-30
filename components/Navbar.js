import Link from "next/link"

const Navbar = () => {
    return (
        <nav className="grid grid-cols-3 h-15 items-center " >
            {/* Left */}
            <div className="relative p-5  ">
                <h2 className="font-semibold text-lg text-amber-500 uppercase ">YatriPravasi.com</h2>
            </div>
            {/* Middle */}
            <div className="relative p-5 ">
                <ul className="flex space-x-5 text-gray-700 font-medium ">
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
            </div>
            {/* Right */}
            <div className="relative p-5 ml-auto space-x-5">
                <button className="outline-none">Login</button>
                <button className="px-5 py-2 bg-amber-500 rounded-lg outline-none text-white ">SignUp</button>
            </div>
        </nav>
    )
}

export default Navbar