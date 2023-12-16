import { useEffect, useRef, useState } from "react";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import { useDispatch } from "react-redux";
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { generateTrip } from "@/services/tripPlanReducer";
import { useRouter } from "next/router";

const Map = () => {
    const router = useRouter()
    let markedLocation = { lat: "", lng: "" }
    const [userLocationMarker, setUserLocationMarker] = useState({ lat: null, lng: null });
    const dispatch = useDispatch()
    const mapElement = useRef();
    const [tripData, setTripData] = useState({
        lng: userLocationMarker.lat,
        lat: markedLocation.lat,
        maxDistance: "",
        interest: [],
    })
    const options = [
        { label: "Religious", value: "religion" },
        { label: "Wildlife", value: "natural,national_park" },
        { label: "Park", value: "national_park,beach" },
        { label: "Historical", value: "building.tourism,building.historic" },
        { label: "Fun", value: "entertainment" },
        { label: "Sport", value: "sport" },
        { label: "Shopping", value: "commercial.shopping_mall,commercial.supermarket" },
        { label: "Restaurant", value: "catering.restaurant" }
    ];
    const [map, setMap] = useState(null);
    const [mapInitialized, setMapInitialized] = useState(false);
    const [additionalMarker, setAdditionalMarker] = useState(null);

    useEffect(() => {
        const initTT = async () => {
            try {
                const tt = await import('@tomtom-international/web-sdk-maps');

                let map = tt.map({
                    key: 'mYu59YkyE6SjkvR1ABG179pVhTRvVBc6',
                    container: mapElement.current,
                    center: [79.0882, 21.1458], // Set the initial center to India
                    zoom: 10, // Set the initial zoom level
                });

                setMap(map);
                setMapInitialized(true);
                map.on('load', () => {
                    map.addControl(new tt.GeolocateControl());
                    map.addControl(new tt.FullscreenControl());
                    map.addControl(new tt.NavigationControl());
                    map.addControl(new tt.ScaleControl());
                })
                navigator.geolocation.getCurrentPosition((position) => {
                    const { latitude, longitude } = position.coords
                    setTripData({ ...tripData, lng: longitude, lat: latitude })
                    // let currentLocationMarker = new tt.Marker({ draggable: true, color: "#FF5733" })
                    //     .setLngLat([position.coords.longitude, position.coords.latitude])
                    //     .addTo(map);
                    // let userLocationPopup = new tt.Popup({ className: "user-location-popup" }).setHTML("<p >You are here</p>")
                    // currentLocationMarker.setPopup(userLocationPopup).togglePopup()
                    // currentLocationMarker.on("dragend", (event) => {
                    //     let position = event.target.getLngLat();
                    //     let latitude = position.lat;
                    //     let longitude = position.lng;
                    //     userLocationPopup.setHTML("<p>You are here: " + latitude + ", " + longitude + "</p>");
                    // });

                })

                map.on("click", (event) => {
                    const { lng, lat } = event.lngLat;
                    setUserLocationMarker({
                        lat, lng
                    })
                    setTripData({ ...tripData, lng: lng, lat: lat })
                    const newMarker = new tt.Marker({ draggable: true })
                        .setLngLat([lng, lat])
                        .addTo(map);
                    setAdditionalMarker(newMarker);
                });

                return () => map.remove()
            } catch (error) {
                console.error("Error initializing TomTom map:", error);
            }
        };

        if (!mapInitialized) {
            initTT();
        }

        return () => {
            if (mapInitialized) {
                setMapInitialized(false);
            }
        };
    }, [mapInitialized, map]);

    const submitTripForm = () => {
        dispatch(generateTrip(tripData))
        router.push('/tour')

    }
    return (
        <div className="p-4 grid grid-cols-3  gap-10">
            <div className="h-[30rem] w-full flex justify-center col-span-2">
                <div ref={mapElement} className="mapDiv w-full h-full" />
            </div>
            <div className="grid grid-cols-2 gap-2 h-fit">
                {/* <TextField
                    type="number"
                    label='Max Distance '
                    onChange={(e) => setTripData({ ...tripData, maxDistance: parseInt(e.target.value) })}
                /> */}
                <FormControl variant="outlined" className="col-span-2">
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
                <div className='w-full flex justify-center mt-10 col-span-2'>
                    {tripData.interest.length > 0
                        ? <><button type="button" className="w-full text-white mx-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={submitTripForm}>Build Your Trip</button> </> :
                        <>
                            <button type="button" className="w-full text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center" disabled>Build Your Trip</button>

                        </>
                    }
                </div>
            </div>
        </div>
    );
};

export default Map;
