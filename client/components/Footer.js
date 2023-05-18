import React from 'react'

const Footer = () => {
    return (
        <div className='bg-[#223544] mt-2 p-10'>
            <div className='grid grid-cols-2 justify-center  w-4/5  sm:grid-cols-2  mx-auto mt-11'>
                <div>
                    <h1 className='text-white text-2xl underline underline-offset-8'>SAFARLY</h1>
                    <h1 className='text-white mt-2 font-light max-w-[300px]'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae quibusdam, qui, corrupti adipisci similique laboriosam neque, minima quas magni minus quam accusamus.</h1>
                </div>
                <div className='text-white'>
                    <h1 className='text-lg underline underline-offset-8'>Contact Us</h1>
                    <p className='mt-2'>Feel free to contact and reach us !!</p>
                    <p className='mt-2'>777777777</p>
                    <p className='mt-2'>safarly@gmail.com</p>
                </div>
            </div>
        </div>
    )
}

export default Footer