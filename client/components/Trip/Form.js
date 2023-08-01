import React, { useEffect, useState } from 'react'
import { cities } from '../LandingPage/cities';
import { DatePicker, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { generateTrip } from '@/services/tripPlanReducer';
import { useRouter } from 'next/router';
import { hotelslist } from './hotels';
import { fetchAutoCompleteData } from '@/services/autoCompleteReducer';
const { RangePicker } = DatePicker;
const { Option } = Select;
const Form = () => {
    const [timeoutId, setTimeoutId] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [location, setLocation] = useState({ query: '' });
    const hotelListOptions = hotelslist.map(hotel => ({
        label: hotel.Name + " Rs: " + hotel.Price,
        value: hotel.index,
    }))

    const dispatch = useDispatch();
    const router = useRouter();
    const [tripData, setTripData] = useState({
        places: [],
        // startDate: "",
        longitude: "",
        latitude: "",
        // endDate: "",
        duration: "",
        isStay: [],
        // budget: "",
        interest: [],
        selected_sr_no: [],
        time_in_hotel: [],
        // transport: [],
        // activities: [],
        // cuisines: [],
        // languages: []
    })

    const options = [
        // { label: "Historical", value: "Historical" },
        // { label: "Culture", value: "Culture" },
        // { label: "Art", value: "Art" },
        // { label: "Food", value: "Food" },
        // { label: "Music", value: "Music" },
        // { label: "Nature", value: "Nature" },
        // { label: "Sports", value: "Sports" },
        // { label: "Photography", value: "Photography" },
        // { label: "Architecture", value: "Architecture" },
        // { label: "Literature", value: "Literature" }
        { label: "Religious", value: "Religious" },
        { label: "Wildlife", value: "Wildlife" },
        { label: "Park", value: "Park" },
        { label: "Historical", value: "Historical" },
        { label: "Literature", value: "Literature" },
        { label: "Fun", value: "Fun" },
        { label: "Sport", value: "Sport" },
        { label: "Shopping", value: "Shopping" },
        { label: "Restaurant", value: "Restaurant" }
    ];


    const suggestionData = useSelector(state => state.autoComplete.data)


    const handleSelectSuggestion = (place) => {
        setTripData({ ...tripData, longitude: place.long, latitude: place.lat })
        // setLocation({ query: place.formatted });
        // // setPlace_id(place.place_id)
        // setSuggestions([])

    }


    const onSelect = (data) => {
        // console.log('onSelect', data);
    };
    // console.log(suggestionData);
    const handleLocationChange = (data) => {
        console.log(data);
        if (data.trim() !== "") {
            dispatch(fetchAutoCompleteData({ query: data }))
            const newTimeoutId = setTimeout(() => {
                setSuggestions(suggestionData.map((result) => (
                    {
                        longitude: result?.geometry?.coordinates[0],
                        latitude: result?.geometry?.coordinates[1],
                        formatted: result?.properties?.formatted,
                        option: result?.properties?.formatted,
                        state: result?.properties?.state,
                        country: result?.properties?.country,
                        county: result?.properties?.county,
                        place_id: result?.properties?.place_id

                        // fsq_id: result?.place?.fsq_id,
                        // place: result?.place?.name,
                        // primary: result?.text?.primary,
                        // secondary: result?.text?.secondary

                        // address: result?.place?.location.address,
                        // locality: result?.place?.location.locality,
                        // region: result?.place?.location.region,
                        // formattedAddress: result?.place?.location.formatted_address,


                    }
                ))
                )
            }, 500)
            setTimeoutId(newTimeoutId)
        }

    };

    useEffect(() => {
        handleLocationChange(location.query);
    }, [location.query])


    const submitTripForm = () => {
        clearTimeout(timeoutId)
        dispatch(generateTrip(tripData))
        router.push('/plantrip/trip')
    }
    return (
        <div className='mt-36 px-7 sm:px-2 min-h-[100vh]'>
            <h1 className='capitalize text-center text-[2.25rem] font-bold text-blue-900 my-10 bg-[aliceblue] p-2'  > Plan your Vacations</h1>
            <div className="md:w-[1024px] mx-auto ">
                <div className='grid sm:grid-cols-3 grid-cols-1 gap-5 mb-5'>
                    {/* <Select mode="tags" className="py-4 px-4 w-full col-span-2  rounded shadow bg-slate-100 border-[#4096ff] focus:border-[1px] font-thin focus:outline-none focus:shadow-lg focus:shadow-slate-300 duration-100 shadow-gray-300 placeholder:text-gray-500" style={{ width: '100%' }} placeholder="Enter destination"  onChange={handleLocationChange} >
                        {suggestions.map((suggestion, index) => {
                            return (
                                <Option key={index} onClick={() => handleSelectSuggestion(suggestion)}>{suggestion?.formatted}</Option>
                            )
                        })}
                    </Select> */}
                    {/* <AutoComplete
                        options={suggestions}
                        style={{
                            width: 200,
                        }}
                        onSelect={onSelect}
                        // filterOption={(inputValue, option) =>
                        //     option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                        // }
                        onSearch={(text) => onChange(text)}
                        placeholder="input here"
                    /> */}
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        filterOptions={(x) => x}
                        isOptionEqualToValue={(option, value) => {
                            console.log(option);
                            console.log(value);
                            // setTripData({ ...tripData, longitude: value.longitude, latitude: value.latitude })
                            return option.place_id === value.place_id
                        }}
                        options={suggestions}
                        getOptionLabel={(option) => option.formatted}
                        sx={{ width: 300 }}
                        onInputChange={(e, value) => setLocation({ query: value })}
                        onChange={(e, value) => setTripData({ ...tripData, longitude: value.longitude, latitude: value.latitude })
                        }
                        renderInput={(params) => <TextField {...params} label="Current Location" />}
                    />
                    {/* <RangePicker disabledDate={(current) => current && current < new Date().setHours(0, 0, 0, 0)} className='py-4 px-4 w-full   min-w-[10rem] rounded shadow bg-slate-100 border-[#4096ff] focus:border-[1px] font-thin focus:outline-none focus:shadow-lg focus:shadow-slate-300 duration-100 shadow-gray-300 placeholder:text-gray-500'
                        onChange={(v, d) => {
                            setTripData({ ...tripData, startDate: d[0], endDate: d[1] })
                        }} /> */}
                    <input type="number" className='py-4 px-4 w-full  min-w-[10rem] rounded shadow bg-slate-100 border-[#4096ff] focus:border-[1px] font-[200] text-[14px] focus:outline-none focus:shadow-lg focus:shadow-slate-300 duration-100 shadow-gray-300 placeholder:text-gray-500' placeholder='Duration of Trip in Hrs   '
                        onChange={(e) => setTripData({ ...tripData, duration: parseInt(e.target.value) })}
                        min={10000}

                    />

                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

                    {/* <input type="number" className='py-4 px-4 w-full  min-w-[10rem] rounded shadow bg-slate-100 border-[#4096ff] focus:border-[1px] font-[200] text-[14px] focus:outline-none focus:shadow-lg focus:shadow-slate-300 duration-100 shadow-gray-300 placeholder:text-gray-500' placeholder='Budget (in ₹)'
                        onChange={(e) => setTripData({ ...tripData, budget: e.target.value })}
                        min={10000}

                    /> */}

                    <Select
                        mode="multiple"
                        allowClear
                        className='py-4 px-4 w-full   min-w-[10rem] rounded shadow bg-slate-100 border-[#4096ff] focus:border-[1px] font-thin focus:outline-none focus:shadow-lg focus:shadow-slate-300 duration-100 shadow-gray-300 placeholder:text-gray-500'
                        placeholder="Interest"
                        defaultValue={[]}
                        value={tripData.interest}
                        onChange={(value) => setTripData({ ...tripData, interest: value })}
                        options={options}
                    />

                    <Select
                        mode="single"
                        allowClear
                        className='py-4 px-4 w-full  min-w-[10rem]  rounded shadow bg-slate-100 border-[#4096ff] focus:border-[1px] font-thin focus:outline-none focus:shadow-lg focus:shadow-slate-300 duration-100 shadow-gray-300 placeholder:text-gray-500'
                        placeholder="Want To Stay in Hotel?"
                        defaultValue={[]}

                        value={tripData.isStay}
                        onChange={(value) => setTripData({ ...tripData, isStay: value })}
                        options={
                            [
                                { label: "Yes", value: true },
                                { label: "No", value: false },
                            ]
                        }
                    />

                    <Select
                        mode="single"
                        allowClear
                        className={` ${(tripData.isStay) ? "" : "hidden"} py-4 px-4 w-full  min-w-[10rem]  rounded shadow bg-slate-100 border-[#4096ff] focus:border-[1px] font-thin focus:outline-none focus:shadow-lg focus:shadow-slate-300 duration-100 shadow-gray-300 placeholder:text-gray-500`}
                        placeholder="Accomodation"
                        defaultValue={[]}
                        // disabled
                        disabled={!(tripData.isStay)}
                        value={tripData.accomodation}
                        onChange={(value) => setTripData({ ...tripData, selected_sr_no: value })}
                        options={hotelListOptions}
                    />


                    <input type="number" className={`${(tripData.isStay) ? "" : "hidden"} py-4 px-4 w-full  min-w-[10rem] rounded shadow bg-slate-100 border-[#4096ff] focus:border-[1px] font-[200] text-[14px] focus:outline-none focus:shadow-lg focus:shadow-slate-300 duration-100 shadow-gray-300 placeholder:text-gray-500`} placeholder='Time (in hrs) to stay in hotel'
                        onChange={(e) => setTripData({ ...tripData, time_in_hotel: parseInt(e.target.value) })}

                    />

                    {/* <Select
                        mode="single"
                        allowClear
                        className='py-4 px-4 w-full  min-w-[10rem]  rounded shadow bg-slate-100 border-[#4096ff] focus:border-[1px] font-thin focus:outline-none focus:shadow-lg focus:shadow-slate-300 duration-100 shadow-gray-300 placeholder:text-gray-500'
                        placeholder="Transport"
                        defaultValue={[]}
                        value={tripData.transport}
                        onChange={(value) => setTripData({ ...tripData, transport: value })}
                        options={transport}
                    /> */}
                    {/* <Select
                        mode="multiple"
                        allowClear
                        className='py-4 px-4 w-full   min-w-[10rem]  rounded shadow bg-slate-100 border-[#4096ff] focus:border-[1px] font-thin focus:outline-none focus:shadow-lg focus:shadow-slate-300 duration-100 shadow-gray-300 placeholder:text-gray-500'
                        placeholder="Activities you like to have"
                        defaultValue={[]}
                        onChange={(value) => setTripData({ ...tripData, activities: value })}
                        options={activities}
                    /> */}
                    {/* <Select
                        mode="multiple"
                        allowClear
                        className='py-4 px-4 w-full   min-w-[10rem]  rounded shadow bg-slate-100 border-[#4096ff] focus:border-[1px] font-thin focus:outline-none focus:shadow-lg focus:shadow-slate-300 duration-100 shadow-gray-300 placeholder:text-gray-500'
                        placeholder="Cuisine"
                        defaultValue={[]} value={tripData.cuisines}
                        onChange={(value) => setTripData({ ...tripData, cuisines: value.slice(-2) })}
                        options={cuisines}
                    />
                    <Select
                        mode="single"
                        allowClear
                        className='py-4 px-4 w-full   min-w-[10rem]  rounded shadow bg-slate-100 border-[#4096ff] focus:border-[1px] font-thin focus:outline-none focus:shadow-lg focus:shadow-slate-300 duration-100 shadow-gray-300 placeholder:text-gray-500'
                        placeholder="Language of Plan"
                        defaultValue={[]}
                        value={tripData.languages}
                        onChange={(value) => setTripData({ ...tripData, languages: value })}
                        options={languages}
                    /> */}
                </div>
                <div className='w-full flex justify-center mt-10'>
                    {tripData.interest.length > 0
                        ? <><button type="button" className="text-white mx-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={submitTripForm}>Build Your Trip</button> </> :
                        <>
                            <button type="button" className="text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center" disabled>Build Your Trip</button>

                        </>
                    }
                </div>
            </div>

        </div >
    )
}

export default Form