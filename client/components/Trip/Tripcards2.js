import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

const Tripcards2 = () => {
    const { data, isLoading, isError, isSuccess } = useSelector(state => state.tripPlan);
    const [selectedPlaces, setSelectedPlaces] = useState([]);
    const [edit, setEdit] = useState(true);

    const addToSelected = (place) => {
        setSelectedPlaces(prevSelected => [...prevSelected, place]);
    };
    const removeFromSelected = (placeId) => {
        setSelectedPlaces(prevSelected => prevSelected.filter(place => place.id !== placeId));
    };
    return (
        <>
            <div className="text-center p-4 my-8 bg-blue-50 space-x-10">
                <button
                    className="px-6 py-3 bg-yellow-500 uppercase  text-white rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring focus:ring-yellow-200"
                    onClick={() => selectedPlaces.length > 0 && setEdit(true)}

                >
                    Edit
                </button>
                <button
                    className="px-6 py-3 bg-blue-500 uppercase text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
                    onClick={() => selectedPlaces.length > 0 && setEdit(false)}
                >
                    Done
                </button>

            </div>
            {edit && <h2 className='font-[Poppins] text-center mx-auto max-w-[900px]  my-10 text-[25px] text-[#1e2f67]'>Choose Your Favorite Spots</h2>}
            <div className="my-20 max-w-[1000px] mx-auto">
                {(edit || selectedPlaces.length == 0) &&
                    <div className='grid grid-cols-3 justify-center gap-5'>
                        {
                            data.map((place, i) => (
                                <div className='bg-[#c9e2ff] rounded p-5 text-[#22355D]' key={place?.id} >
                                    <h1 className='text-2xl'>Place {i + 1}</h1>
                                    <h1 className=' text-[#223544] font-[Montserrat] uppercase font-bold my-1 text-lg'>{place?.Name} </h1>
                                    <h1 className='font-[Poppins] text-[13px] text-[#f3f3f3] bg-[#4b71ec] inline-block px-3 py-1 rounded-full'> {place?.PlaceType} </h1>
                                    <h1 className=''>Rating: {place?.Ratings} / 5 </h1>
                                    <h1 className=''>Time to reach in minutes: {Math.round(place?.time_to_reach * 60 * 100) / 100}</h1>
                                    <h1 className=''>Spending time in hrs: {Math.round(place?.total_time * 100) / 100}</h1>
                                    {selectedPlaces.some(selectedPlace => selectedPlace.id === place.id) ? (
                                        <button className="mt-4 px-2 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-200" onClick={() => removeFromSelected(place.id)}>Remove</button>
                                    ) : (
                                        <button className="mt-4 px-2 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-200" onClick={() => addToSelected(place)}>Add</button>
                                    )}
                                </div>
                            ))
                        }
                    </div>
                }
                {!edit && <h2 className='font-[Poppins] text-center mx-auto max-w-[900px]  my-10 text-[25px] text-[#1e2f67]'>Selected Places</h2>}
                {!edit && <div className='grid grid-cols-3 justify-center gap-5'>
                    {
                        selectedPlaces.map((place, i) => (
                            <div className='bg-[#c9e2ff] rounded p-5 text-[#22355D]' key={place?.id} >
                                <h1 className='text-2xl'>Place {i + 1}</h1>
                                <h1 className=' text-[#223544] font-[Montserrat] uppercase font-bold my-1 text-lg'>{place?.Name} </h1>
                                <h1 className='font-[Poppins] text-[13px] text-[#f3f3f3] bg-[#4b71ec] inline-block px-3 py-1 rounded-full'> {place?.PlaceType} </h1>
                                <h1 className=''>Rating: {place?.Ratings} / 5 </h1>
                                <h1 className=''>Time to reach in minutes: {Math.round(place?.time_to_reach * 60 * 100) / 100}</h1>
                                <h1 className=''>Spending time in hrs: {Math.round(place?.total_time * 100) / 100}</h1>
                                {selectedPlaces.some(selectedPlace => selectedPlace.id === place.id) ? (
                                    <button className="mt-4 px-2 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-200" onClick={() => removeFromSelected(place.id)}>Remove</button>
                                ) : (
                                    <button className="mt-4 px-2 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-200" onClick={() => addToSelected(place)}>Add</button>
                                )}
                            </div>
                        ))
                    }
                </div>
                }
                {/* <div>
                    <h2 className='font-[Poppins]  max-w-[900px]  mt-10 text-[25px] text-[#1e2f67]'>Selected Places:</h2>
                    <ul>
                        {selectedPlaces.map(selectedPlace => (
                            <li key={selectedPlace.id}>{selectedPlace.Name}</li>
                        ))}
                    </ul>
                </div> */}
            </div>
        </>
    )
}

export default Tripcards2