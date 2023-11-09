import React, { useEffect, useState } from 'react'
import { cities } from '../LandingPage/cities';
// import { DatePicker, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { generateTrip } from '@/services/tripPlanReducer';
import { useRouter } from 'next/router';
import { hotelslist } from './hotels';
import { fetchAutoCompleteData } from '@/services/autoCompleteReducer';
import { Alert, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Snackbar } from '@mui/material';

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
        isStay: false,
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
    const { isSuccess,isLoading } = useSelector(state => state.tripPlan)

    // console.log(suggestionData);
    const handleLocationChange = (data) => {
        console.log(data);
        if (data.trim() !== "") {
            dispatch(fetchAutoCompleteData({ query: data }))
            const newTimeoutId = setTimeout(() => {
                suggestionData ? setSuggestions(suggestionData.map((result) => (
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
                ) : setSuggestions([])
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
        if (!isSuccess && !isLoading)
            setOpen(true)
        if (isSuccess === true)
            router.push('/plantrip/trip')
    }
    const [isEnabled, setIsEnabled] = useState(false);


    useEffect(() => {
        // Function to fetch the user's geolocation
        const fetchUserGeolocation = () => {
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const latitude = position.coords.latitude;
                        const longitude = position.coords.longitude;
                        setTripData({ ...tripData, longitude, latitude })
                    },
                    (error) => {
                        console.error('Error getting user geolocation:', error.message);
                    }
                );
            } else {
                console.error('Geolocation is not available in this browser.');
            }
        };

        // Call the function to fetch user's geolocation when the checkbox is checked
        if (isEnabled) {
            fetchUserGeolocation();
        }
    }, [isEnabled])
    const [open, setOpen] = React.useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    return (
        <div className='mt-36 px-7 sm:px-2 min-h-[100vh]'>
            <h1 className='capitalize text-center text-[2.25rem] font-bold text-blue-900 my-10 bg-[aliceblue] p-2'  > Plan your Vacations</h1>
            <div className="md:w-[1024px] mx-auto ">
                <div className='grid sm:grid-cols-3 grid-cols-1 gap-5 mb-5'>
                    <div>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            disabled={isEnabled}
                            filterOptions={(x) => x}
                            isOptionEqualToValue={(option, value) => {
                                return option.place_id === value.place_id
                            }}
                            options={suggestions}
                            getOptionLabel={(option) => option.formatted}
                            onInputChange={(e, value) => setLocation({ query: value })}
                            onChange={(e, value) => setTripData({ ...tripData, longitude: value?.longitude, latitude: value?.latitude })
                            }
                            renderInput={(params) => <TextField {...params} label="Enter  Current Location Manually" />}
                        />
                        <FormControlLabel
                            control={<Checkbox checked={isEnabled} onChange={(e) => setIsEnabled(e.target.checked)} />}
                            label="Detect Your Location"

                        />
                    </div>
                    <TextField
                        type="number"
                        label='Trip Duration (in hrs)'
                        onChange={(e) => setTripData({ ...tripData, duration: parseInt(e.target.value) })}
                        inputProps={{ min: 10000 }}
                    />

                    <FormControl variant="outlined">
                        <InputLabel>Interest</InputLabel>
                        <Select
                            multiple
                            value={tripData.interest}
                            onChange={(e) => setTripData({ ...tripData, interest: e.target.value })}
                            label="Interest"
                        >
                            {options.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" >
                        <InputLabel>Want To Stay in Hotel?</InputLabel>
                        <Select
                            value={tripData.isStay}
                            onChange={(e) => setTripData({ ...tripData, isStay: e.target.value })}
                            label="Want To Stay in Hotel?"
                        >
                            <MenuItem value={true}>Yes</MenuItem>
                            <MenuItem value={false}>No</MenuItem>
                        </Select>
                    </FormControl>


                    {tripData.isStay && (
                        <FormControl variant="outlined" >
                            <InputLabel>Accommodation</InputLabel>
                            <Select
                                value={tripData.selected_sr_no}
                                onChange={(e) => setTripData({ ...tripData, selected_sr_no: e.target.value })}
                                label="Accommodation"
                            >
                                {hotelListOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}


                    {tripData.isStay && (
                        <>

                            <TextField
                                type="number"
                                label='Time (in hrs) to stay in hotel'

                                onChange={(e) => setTripData({ ...tripData, time_in_hotel: parseInt(e.target.value) })}
                            />

                        </>
                    )}
                </div>
                <div className='w-full flex justify-center mt-10'>
                    {tripData.interest.length > 0
                        ? <><button type="button" className="text-white mx-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={submitTripForm}>Build Your Trip</button> </> :
                        <>
                            <button type="button" className="text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center" disabled>Build Your Trip</button>

                        </>
                    }
                </div>
                <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}>
                    <Alert severity="error" sx={{ width: '100%' }}>
                        Please try to add more interest field or increase trip duration.
                    </Alert>
                </Snackbar>
            </div>

        </div >
    )
}

export default Form