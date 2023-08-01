import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'

const Tripcards2 = () => {
    const { data, isLoading, isError, isSuccess } = useSelector(state => state.tripPlan);
    return (
        <div className="my-20 max-w-[1000px] mx-auto">

            <div className='grid grid-cols-3 justify-center gap-5'>
                {
                    data.optimal_tour_plan.map((place, i) => (
                        <div className='bg-[#c9e2ff] rounded p-5 text-[#22355D]'>
                            <h1 className='text-2xl'>Place {i + 1}</h1>
                            <h1 className=' text-[#223544] font-[Montserrat] uppercase font-bold my-1 text-lg'>{place.Name} </h1>
                            <h1 className='font-[Poppins] text-[17px] text-[#f3f3f3] bg-[#4b71ec] inline-block px-2 rounded-full'> {place.PlaceType} </h1>
                            <h1 className=''>Rating: {place.Ratings} / 5 </h1>
                            <h1 className=''>Time to reach in minutes: {place.time_to_reach}</h1>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Tripcards2