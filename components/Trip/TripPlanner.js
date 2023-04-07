import Image from 'next/image'
import React from 'react'

const TripPlanner = () => {
    return (
        <section className='mt-24'>
            <h1 className='text-xl p-3 font-semibold bg-orange-400 text-yellow-50  shadow-sm border-b-2'> 7 Days Trip From Mumbai to Goa</h1>

            <div className='max-w-screen-xl m-auto mt-2'>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mx-2'>
                    <div className='w-full bg-orange-300 p-3 rounded-md '>
                        <div>
                            <h1 className='font-bold text-red-600'>Day 1</h1>
                            <h2 className='font-bold text-gray-800 text-sm'>April 3 2023</h2>
                        </div>
                        <div className='flex flex-col  mt-5 space-y-2'>
                            <div className=' bg-white p-2 rounded-md min-h-[140px]    '>
                                <div className='flex space-x-2 w-full'>
                                    <div className='relative w-[100px] h-[140px] rounded-3xl '>
                                        <Image src={'/hero.jpg'} className='rounded-3xl' alt="name" fill style={{ objectFit: "cover" }} />
                                    </div>
                                    <div className='space-x-1'>
                                        <h1 className='mb-2 p-2 py-1 text-sm font-medium rounded-xl border-2 bg-green-300 text-green-950 border-green-500'>Atrraction</h1>
                                        <h1 className='text-md font-bold'>Taj Mahal</h1>
                                        <h1 className='text-sm  italic'> 2 hr</h1>
                                        <h1></h1>
                                    </div>
                                </div>
                            </div>
                            <div className=' bg-white p-2 rounded-md min-h-[140px]    '>
                                <div className='flex space-x-2 w-full'>
                                    <div className='relative w-[100px] h-[140px] rounded-3xl '>
                                        <Image src={'/hero.jpg'} className='rounded-3xl' alt="name" fill style={{ objectFit: "cover" }} />
                                    </div>
                                    <div className='space-x-1'>
                                        <h1 className='mb-2 p-2 py-1 text-sm font-medium rounded-xl border-2 bg-green-300 text-green-950 border-green-500'>Atrraction</h1>
                                        <h1 className='text-md font-bold'>Taj Mahal</h1>
                                        <h1 className='text-sm  italic'> 2 hr</h1>
                                        <h1></h1>
                                    </div>
                                </div>
                            </div>
                            <div className=' bg-white p-2 rounded-md min-h-[140px]    '>
                                <div className='flex space-x-2 w-full'>
                                    <div className='relative w-[100px] h-[140px] rounded-3xl '>
                                        <Image src={'/hero.jpg'} className='rounded-3xl' alt="name" fill style={{ objectFit: "cover" }} />
                                    </div>
                                    <div className='space-x-1'>
                                        <h1 className='mb-2 p-2 py-1 text-sm font-medium rounded-xl border-2 bg-green-300 text-green-950 border-green-500'>Atrraction</h1>
                                        <h1 className='text-md font-bold'>Taj Mahal</h1>
                                        <h1 className='text-sm  italic'> 2 hr</h1>
                                        <h1></h1>
                                    </div>
                                </div>
                            </div>
                            <div className=' bg-white p-2 rounded-md min-h-[140px]    '>
                                <div className='flex space-x-2 w-full'>
                                    <div className='relative w-[100px] h-[140px] rounded-3xl '>
                                        <Image src={'/hero.jpg'} className='rounded-3xl' alt="name" fill style={{ objectFit: "cover" }} />
                                    </div>
                                    <div className='space-x-1'>
                                        <h1 className='mb-2 p-2 py-1 text-sm font-medium rounded-xl border-2 bg-green-300 text-green-950 border-green-500'>Atrraction</h1>
                                        <h1 className='text-md font-bold'>Taj Mahal</h1>
                                        <h1 className='text-sm  italic'> 2 hr</h1>
                                        <h1></h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full bg-orange-300 p-3 rounded-md'>
                        <div>
                            <h1 className='font-bold text-red-600'>Day 2</h1>
                            <h2 className='font-bold text-gray-800 text-sm'>April 4 2023</h2></div>
                    </div>
                    <div className='w-full bg-orange-300 p-3 rounded-md'>
                        <div>
                            <h1 className='font-bold text-red-600'>Day 3</h1>
                            <h2 className='font-bold text-gray-800 text-sm'>April 5 2023</h2>
                        </div>
                    </div>
                    <div className='w-full bg-orange-300 p-3 rounded-md'>
                        <div>
                            <h1 className='font-bold text-red-600'>Day 4</h1>
                            <h2 className='font-bold text-gray-800 text-sm'>April 6 2023</h2>
                        </div>
                    </div>
                </div>
            </div >

        </section>
    )
}

export default TripPlanner