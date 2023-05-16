import HouseIcon from '@mui/icons-material/House';
import HotelIcon from '@mui/icons-material/Hotel';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import SnowshoeingIcon from '@mui/icons-material/Snowshoeing';
import { format } from 'date-fns';


const TripCards = ({ itinerary }) => {
    return (
        <div className='mt-20 max-w-[1000px] mx-auto '>
            <div className='bg-[#588cd0] flex justify-center items-center px-10 py-5 rounded-xl'>
                <div className='w-18 '>
                    <p className="font-[Montserrat] text-[16px] font-medium text-white "> {itinerary?.Day}</p>
                    <p className="font-[Montserrat] text-white text-[24px]">{format(new Date(itinerary?.date), 'MMMM, dd')}</p>
                </div>
            </div>
            <div className='px-5 py-3 '>
                <h1 className='font-[Montserrat] text-[22px] font-[700] text-[#223544] uppercase'>{itinerary.destination}</h1>
                <p className='font-[Poppins]  max-w-[900px]  mt-3 text-[#636774] font-[400] '>{itinerary.description}</p>
            </div>
            <div className="accomodation px-5 py-3">
                <h1 className='font-[Montserrat] text-[16.5px] font-[700] text-[#223544]  uppercase text-center bg-blue-50 py-2 mb-2 leading-loose'>Accomodation</h1>
                <HotelIcon sx={{ fontSize: "2rem", color: "#005985" }} />
                <h1 className='font-[Montserrat] text-[12px] font-[700] text-[#223544] uppercase'>{itinerary.accommodation?.type}</h1>
                <h1 className='font-[Montserrat] text-[16px] font-[700] text-[#223544] uppercase'>{itinerary.accommodation?.name}</h1>
                <p className='font-[Poppins]  max-w-[500px] text-[14px] mt-1 text-[#636774] font-[400] '>{itinerary.accommodation?.address}</p>
            </div>
            <div className="dinning px-5 py-3">
                <h1 className='font-[Montserrat] text-[16.5px] font-[700] text-[#223544]  uppercase text-center bg-blue-50 py-2 mb-2 leading-loose'>Food and Dinning</h1>
                <div className='grid grid-cols-3 justify-items-start'>
                    <div>
                        <div className='flex gap-2 items-center mb-2'>
                            <EmojiFoodBeverageIcon sx={{ fontSize: "2rem", color: "#ff6060" }} />
                            <h1 className='font-[Montserrat] text-[12px] font-[500] text-[#223544] uppercase'>Breakfast</h1>
                        </div>
                        <h1 className='font-[Montserrat] text-[15px] font-[500] text-[#223544] '>{itinerary.dining.breakfast?.dishName}</h1>
                        <h1 className='font-[Montserrat] text-[14px] font-[700] text-[#223544] uppercase'>{itinerary.dining.breakfast?.placeName}</h1>
                        <h1 className='font-[Montserrat] text-[13px] font-[400] text-[#223544] '>{itinerary.dining.breakfast?.address}</h1>
                    </div>
                    <div>
                        <div className='flex gap-2 items-center mb-2'>
                            <DinnerDiningIcon sx={{ fontSize: "2rem", color: "#ff6060" }} />
                            <h1 className='font-[Montserrat] text-[12px] font-[500] text-[#223544] uppercase'>Lunch</h1>
                        </div>
                        <h1 className='font-[Montserrat] text-[15px] font-[500] text-[#223544] '>{itinerary.dining.lunch?.dishName}</h1>
                        <h1 className='font-[Montserrat] text-[14px] font-[700] text-[#223544] uppercase'>{itinerary.dining.lunch?.placeName}</h1>
                        <h1 className='font-[Montserrat] text-[13px] font-[400] text-[#223544] '>{itinerary.dining.lunch?.address}</h1>
                    </div>
                    <div>
                        <div className='flex gap-2 items-center mb-2'>
                            <RestaurantMenuIcon sx={{ fontSize: "2rem", color: "#ff6060" }} />
                            <h1 className='font-[Montserrat] text-[12px] font-[500] text-[#223544] uppercase'>Dinner</h1>
                        </div>
                        <h1 className='font-[Montserrat] text-[15px] font-[500] text-[#223544] '>{itinerary.dining.dinner?.dishName}</h1>
                        <h1 className='font-[Montserrat] text-[14px] font-[700] text-[#223544] uppercase'>{itinerary.dining.dinner?.placeName}</h1>
                        <h1 className='font-[Montserrat] text-[13px] font-[400] text-[#223544] '>{itinerary.dining.dinner?.address}</h1>
                    </div>
                </div>
            </div>
            <div className="dest px-5 py-3">
                <h1 className='font-[Montserrat] text-[16.5px] font-[700] text-[#223544]  uppercase text-center bg-blue-50 py-2 mb-2 leading-loose'>Places You can visit</h1>
                <div className='grid grid-cols-3 justify-items-start gap-12'>
                    {
                        itinerary.placeToVisit.map((place, i) => <div>
                            <div className='flex gap-2 items-center mb-2'>
                                <FmdGoodIcon sx={{ fontSize: "2rem", color: "#4755c0" }} />
                                <h1 className='font-[Montserrat] text-[12px] font-[700] text-[#223544] uppercase'>{place?.placeType}</h1>
                            </div>
                            <h1 className='font-[Montserrat] text-[15px] font-[700] text-[#223544] uppercase'>{place?.placeSpot}</h1>
                            <p className='font-[Poppins]  max-w-[200px] text-[14px]  mt-1 text-[#636774] font-[400] '>{place?.address}</p>
                        </div>)
                    }
                </div>
            </div>
            {/* <div className="activity px-5 py-3">
                <h1 className='font-[Montserrat] text-[16.5px] font-[700] text-[#223544]  uppercase text-center bg-blue-50 py-2 mb-2 leading-loose'>Activity You will enjoy</h1>
                <div>
                    <SnowshoeingIcon sx={{ fontSize: "2rem" }} />
                    <h1 className='font-[Montserrat] text-[12px] font-[700] text-[#223544] uppercase'>Sports Game</h1>
                    <h1 className='font-[Montserrat] text-[18px] font-[700] text-[#223544] uppercase'>Cricket Game at Feroz Shah Kotla Stadium</h1>
                    <p className='font-[Poppins]  max-w-[500px]  mt-1 text-[#636774] font-[400] '>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </div>
            </div> */}
        </div>
    )
}

export default TripCards


const foramt = {
    tripName: "",
    subTitle: "",
    description: "",
    itinerary: [
        {
            date: "",
            Day: "",
            accommodation: {
                type: "",
                name: "",
                address: "",
            },
            dining: {
                breakfast: {
                    dishName: "",
                    placeName: "",
                    address: ""
                },
                dinner: {
                    dishName: "",
                    placeName: "",
                    address: ""
                },
                lunch: {
                    dishName: "",
                    placeName: "",
                    address: ""
                },
            },
            destination: "",
            description: "",
            placeToVisit: [{
                placeSpot: "",
                address: "",
                placeType: ""
            }]

        }
    ]
}