import React, { useMemo } from 'react'
import TripCards from './TripCards'
import { useSelector } from 'react-redux'
import { LoaderExample } from '../Loader'
import Tripcards2 from './Tripcards2'

const TripDetails = () => {
    const d = "{\n  \"title\": \"Spiritual Sojourn in India\",\n  \"subtitle\": \"A 7-day journey to seek blessings in holy sites\",\n  \"itinerary\": [\n    {\n      \"date\": \"25 June\",\n      \"destination\": \"Varanasi\",\n      \"accommodation\": {\n        \"type\": \"3-star hotel\",\n        \"name\": \"Ramada Plaza JHV\",\n        \"address\": \"The Mall Rd, Cantonment, Varanasi, Uttar Pradesh 221002\"\n      },\n      \"activities\": [\n        {\n          \"name\": \"Visit Kashi Vishwanath Temple\",\n          \"time\": \"6:00 AM to 2:00 PM, 3:00 PM to 9:00 PM\"\n        },\n        {\n          \"name\": \"Take a dip in the River Ganges\",\n          \"time\": \"5:00 AM to 9:00 PM\"\n        },\n        {\n          \"name\": \"Walk through the narrow lanes of the old city and witness the evening aarti on the ghats\",\n          \"time\": \"6:00 PM to 7:00 PM\"\n        }\n      ],\n      \"dining\": {\n        \"breakfast\": \"Aloo Puri, Jalebi and Lassi at Kashi Cafe\",\n        \"lunch\": \"Chaat and Thandai at Deena Chat Bhandar\",\n        \"dinner\": \"Malaiyo and Kachori at Baati Chokha\"\n      }\n    },\n    {\n      \"date\": \"26 June\",\n      \"destination\": \"Prayagraj\",\n      \"accommodation\": {\n        \"type\": \"3-star hotel\",\n        \"name\": \"OYO 1868 Shree Sai Guest House\",\n        \"address\": \"153/1/A/1, Viswanath Rd, Near Vishal Mega Mart, Muirabad, Prayagraj, Uttar Pradesh 211002\"\n      },\n      \"activities\": [\n        {\n          \"name\": \"Visit Triveni Sangam and take a boat ride during sunset\",\n          \"time\": \"6:00 AM to 7:00 PM\"\n        },\n        {\n          \"name\": \"Take a dip in the holy waters of Triveni Sangam\",\n          \"time\": \"6:00 AM to 7:00 PM\"\n        },\n        {\n          \"name\": \"Explore the Akshaya Vat, a timeless Banyan tree, in the Allahabad Fort\",\n          \"time\": \"9:00 AM to 5:00 PM\"\n        }\n      ],\n      \"dining\": {\n        \"breakfast\": \"Kachori Sabzi and Lassi at Netram Ajay Kumar Sweets\",\n        \"lunch\": \"Chaat and Kulfi at Dev Prayag Chat Bhandar\",\n        \"dinner\": \"Paneer Tikka and Butter Naan at Kanha Shyam Dhaba\"\n      }\n    },\n    {\n      \"date\": \"27 June\",\n      \"destination\": \"Haridwar\",\n      \"accommodation\": {\n        \"type\": \"3-star hotel\",\n        \"name\": \"OYO 4858 Radha Milan Guest House\",\n        \"address\": \"Laltaro Pul, Bhoopatwala, Haridwar, Uttarakhand 249401\"\n      },\n      \"activities\": [\n        {\n          \"name\": \"Take a holy dip in the River Ganges at Har Ki Pauri\",\n          \"time\": \"6:30 AM to 7:00 PM\"\n        },\n        {\n          \"name\": \"Take a walk on the ghats to witness the evening aarti\",\n          \"time\": \"6:00 PM to 7:00 PM\"\n        },\n        {\n          \"name\": \"Take a ropeway to the top of Mansa Devi hill for a panoramic view of the city\",\n          \"time\": \"8:00 AM to 6:00 PM\"\n        }\n      ],\n      \"dining\": {\n        \"breakfast\": \"Chole Bhature at Hoshiyarpuri\",\n        \"lunch\": \"Ganga Beach Special Thali at Ganga Lahari Restaurant\",\n        \"dinner\": \"Aloo Paratha with curd and pickle at Chotiwala\"\n      }\n    },\n    {\n      \"date\": \"28 June\",\n      \"destination\": \"Rishikesh\",\n      \"accommodation\": {\n        \"type\": \"3-star hotel\",\n        \"name\": \"Green View by One Hotels\",\n        \"address\": \"Laxman Jhula Road, Tapovan, Rishikesh, Uttarakhand 249201\"\n      },\n      \"activities\": [\n        {\n          \"name\": \"Explore the Beatles Ashram, also known as Maharishi Mahesh Yogi Ashram\",\n          \"time\": \"9:00 AM to 5:00 PM\"\n        },\n        {\n          \"name\": \"Visit the Trimbakeshwar Temple and take a dip in the Neer Garh waterfall\",\n          \"time\": \"7:00 AM to 5:00 PM\"\n        },\n        {\n          \"name\": \"Attend the evening Ganga aarti at Parmarth Niketan Ashram\",\n          \"time\": \"6:00 PM to 7:00 PM\"\n        }\n      ],\n      \"dining\": {\n        \"breakfast\": \"Poha at Chotiwala\",\n        \"lunch\": \"Italian Wood Fired Pizza at Cafe Delmar\",\n        \"dinner\": \"Thali and Lassi at Ramana's Organic Cafe\"\n      }\n    },\n    {\n      \"date\": \"29 June\",\n      \"destination\": \"Amritsar\",\n      \"accommodation\": {\n        \"type\": \"3-star hotel\",\n        \"name\": \"Hotel Popular\",\n        \"address\": \"Chowk Regent Cinema Katra, Katra Ahluwalia, Amritsar, Punjab 143001\"\n      },\n      \"activities\": [\n        {\n          \"name\": \"Visit the Golden Temple and witness the Palki sahib ceremony\",\n          \"time\": \"5:00 AM to 10:00 PM\"\n        },\n        {\n          \"name\": \"Explore the Jallianwala Bagh and pay respects to the martyrs\",\n          \"time\": \"6:30 AM to 7:30 PM\"\n        },\n        {\n          \"name\": \"Attend the Beating Retreat ceremony at the Wagah Border\",\n          \"time\": \"4:00 PM to 6:00 PM\"\n        }\n      ],\n      \"dining\": {\n        \"breakfast\": \"Parantha and Lassi at Kanha Sweets\",\n        \"lunch\": \"Amritsari Kulcha Chole at Kulcha Land\",\n        \"dinner\": \"Sarson da Saag and Makki di Roti at Kesar da Dhaba\"\n      }\n    },\n    {\n      \"date\": \"30 June\",\n      \"destination\": \"Jaipur\",\n      \"accommodation\": {\n        \"type\": \"3-star hotel\",\n        \"name\": \"Royal Resort\",\n        \"address\": \"Opp. Dhaka Nagar, Amer Road, Jaipur, Rajasthan 302002\"\n      },\n      \"activities\": [\n        {\n          \"name\": \"Visit the Amber Fort and take an elephant or Jeep ride\",\n          \"time\": \"9:00 AM to 5:00 PM\"\n        },\n        {\n          \"name\": \"Explore the Jaigarh Fort and witness the largest cannon on wheels, Jaivana\",\n          \"time\": \"9:00 AM to 4:30 PM\"\n        },\n        {\n          \"name\": \"Experience the vibrant culture and shop for handicrafts in Johri Bazaar\",\n          \"time\": \"10:00 AM to 9:00 PM\"\n        }\n      ],\n      \"dining\": {\n        \"breakfast\": \"Poha and Kachori at Lakshmi Mishthan Bhandar\",\n        \"lunch\": \"Rajasthani Thali at Laxmi Misthan Bhandar (LMB)\",\n        \"dinner\": \"Laal Maas and Garlic Naan at Handi Restaurant\"\n      }\n    },\n    {\n      \"date\": \"1 July\",\n      \"destination\": \"Udaipur\",\n      \"accommodation\": {\n        \"type\": \"3-star hotel\",\n        \"name\": \"The Royale Country Retreat\",\n        \"address\": \"Opp. Sajjangarh Udaipur, Ekalavya marg, Udaipur, Rajasthan 313001\"\n      },\n      \"activities\": [\n        {\n          \"name\": \"Visit the City Palace and admire the Mewar architecture\",\n          \"time\": \"9:30 AM to 5:30 PM\"\n        },\n        {\n          \"name\": \"Take a boat ride in the serene Lake Pichola\",\n          \"time\": \"9:00 AM to 6:00 PM\"\n        },\n        {\n          \"name\": \"Witness the sunset at the Monsoon Palace, once a summer retreat of the royal family\",\n          \"time\": \"9:30 AM to 6:00 PM\"\n        }\n      ],\n      \"dining\": {\n        \"breakfast\": \"Pyaaz Ki Kachori at Shree Ji Sweets\",\n        \"lunch\": \"Dal Baati Churma at Ashoka Restaurant\",\n        \"dinner\": \"Laal Maas and Tandoori Roti at Savage Garden\"\n      }\n    },\n    {\n      \"date\": \"2 July\",\n      \"destination\": \"Delhi\",\n      \"accommodation\": {\n        \"type\": \"3-star hotel\",\n        \"name\": \"Treebo Citi International\",\n        \"address\": \"8395, Arya Nagar, Paharganj, New Delhi, Delhi 110055\"\n      },\n      \"activities\": [\n        {\n          \"name\": \"Visit the iconic India Gate and pay homage to the martyrs\",\n          \"time\": \"24 hours\"\n        },\n        {\n          \"name\": \"Explore the rich cultural heritage in the Red Fort and Qutub Minar\",\n          \"time\": \"7:00 AM to 5:00 PM\"\n        },\n        {\n          \"name\": \"Shop for souvenirs and street food in Chandni Chowk\",\n          \"time\": \"10:00 AM to 9:00 PM\"\n        }\n      ],\n      \"dining\": {\n        \"breakfast\": \"Bedmi Poori and Nagori Halwa at Dariba Kalan Khatri Sweet Shop\",\n        \"lunch\": \"Chole Bhature at Sitaram Diwan Chand\",\n        \"dinner\": \"Butter Chicken and Naan at Karim's\"\n      }\n    },\n    {\n      \"date\": \"3 July\",\n      \"destination\": \"Departure\",\n      \"accommodation\": {\n        \"type\": \"N/A\"\n      },\n      \"activities\": [\n        {\n          \"name\": \"Departure from Delhi\",\n          \"time\": \"N/A\"\n        }\n      ],\n      \"dining\": {\n        \"breakfast\": \"N/A\",\n        \"lunch\": \"N/A\",\n        \"dinner\": \"N/A\"\n      }\n    }\n  ]\n}"


    const s = "{\n\"tripName\": \"Spiritual Journey Across India\",\n\"subTitle\": \"A Divine Exploration\",\n\"description\": \"Embark on a blissful journey to explore the ancient spiritual traditions, enchanting temples and diverse cultures of India.\",\n\"itinerary\": [\n{\n\"date\": \"25th June\",\n\"Day\": \"Day 1\",\n\"accommodation\": {\"type\":\"Luxury Hotel\", \"name\":\"The Leela Palace\", \"address\":\"Chanakyapuri, New Delhi\"},\n\"dining\": {\"breakfast\":{\"dishName\":\"Parantha\",\"placeName\":\"Paranthe Wali Gali\",\"address\":\"Chandni Chowk, Delhi\"}, \"lunch\":{\"dishName\":\"Butter Chicken\",\"placeName\":\"Kake Di Hatti\",\"address\":\"Chandni Chowk, Delhi\"}, \"dinner\":{\"dishName\":\"Mutton Rogan Josh\",\"placeName\":\"Karim's\",\"address\":\"Jama Masjid, Delhi\"}},\n\"destination\": \"Delhi\",\n\"description\": \"Begin your spiritual odyssey in the vibrant capital city of India, Delhi.\",\n\"placeToVisit\": [{\"placeSpot\":\"Qutub Minar\",\"address\":\"Mehrauli, Delhi\",\"placeType\":\"Historical Monument\"},{\"placeSpot\":\"Akshardham Temple\",\"address\":\"Noida Mor, Delhi-Meerut Expressway, Near Noida Mor Metro Station\"},{\"placeSpot\":\"Lotus Temple\",\"address\":\"Lotus Temple Road, Bahapur, Shambhu Dayal Bagh, Kalkaji\"}]\n},\n{\n\"date\": \"26th June\",\n\"Day\": \"Day 2\",\n\"accommodation\": {\"type\":\"Heritage Hotel\", \"name\":\"Samode Palace\", \"address\":\"Samode, Rajasthan\"},\n\"dining\": {\"breakfast\":{\"dishName\":\"Kachori\",\"placeName\":\"Rawat Mishtan Bhandar\",\"address\":\"Station Road, Jaipur\"}, \"lunch\":{\"dishName\":\"Laal Maas\",\"placeName\":\"Shri Thal Village Restaurant\",\"address\":\"Opposite Jantar Mantar, Jaipur\"}, \"dinner\":{\"dishName\":\"Dal Bati Churma\",\"placeName\":\"Chokhi Dhani Village\",\"address\":\"Tonk Road, Sita Pura\"}},\n\"destination\": \"Jaipur\",\n\"description\": \"Experience the magical pink city of Jaipur, renowned for its majestic forts, palaces and rich traditions.\",\n\"placeToVisit\": [{\"placeSpot\":\"Hawa Mahal\",\"address\":\"Ajmeri Gate, Jaipur\",\"placeType\":\"Palace\"},{\"placeSpot\":\"Amber Fort\",\"address\":\"Devisinghpura, Amer, Jaipur\",\"placeType\":\"Fort\"},{\"placeSpot\":\"City Palace\",\"address\":\"Tulsi Marg, Gangori Bazaar, J.D.A. Market, Pink City, Jaipur\",\"placeType\":\"Palace\"}]\n},\n{\n\"date\": \"27th June\",\n\"Day\": \"Day 3\",\n\"accommodation\": {\"type\":\"Radisson Blu\", \"name\":\"Radisson Blu Agra Taj East Gate\", \"address\":\"Taj East Gate Road, Agra\"},\n\"dining\": {\"breakfast\":{\"dishName\":\"Bedai with Sabzi\",\"placeName\":\"Panchhi Petha Store\",\"address\":\"Near Agra Fort Railway Station, Agra\"}, \"lunch\":{\"dishName\":\"Tandoori Chicken\",\"placeName\":\"Pinch Of Spice\",\"address\":\"Fatehabad Road, Agra\"}, \"dinner\":{\"dishName\":\"Dal Bukhara\",\"placeName\":\"Dasaprakash\",\"address\":\"Fatehabad Road, Agra\"}},\n\"destination\": \"Agra\",\n\"description\": \"Visit the awe-inspiring monument of love, the iconic Taj Mahal and the historically rich city of Agra.\",\n\"placeToVisit\": [{\"placeSpot\":\"Taj Mahal\",\"address\":\"Dharmapuri, Forest Colony, Tajganj, Agra\",\"placeType\":\"Monument\"},{\"placeSpot\":\"Agra Fort\",\"address\":\"Rakabganj, Agra\",\"placeType\":\"Monument\"},{\"placeSpot\":\"Fatehpur Sikri\",\"address\":\"Fatehpur Sikri, Uttar Pradesh\",\"placeType\":\"Monument\"}]\n},\n{\n\"date\": \"28th June\",\n\"Day\": \"Day 4\",\n\"accommodation\": {\"type\":\"Heritage Hotel\", \"name\":\"Raj Palace\", \"address\":\"Jorawer Singh Gate, Amer Road, Jaipur\"},\n\"dining\": {\"breakfast\":{\"dishName\":\"Kulhad Lassi\",\"placeName\":\"Lassiwala\",\"address\":\"MI Road, Jaipur\"}, \"lunch\":{\"dishName\":\"Laal Biryani\",\"placeName\":\"Handi Restaurant\",\"address\":\"Near Alsisar Haveli, Jaipur\"}, \"dinner\":{\"dishName\":\"Butter Naan\",\"placeName\":\"Sankalp Restaurant\",\"address\":\"Tonk Road, Jaipur\"}},\n\"destination\": \"Jaipur\",\n\"description\": \"Explore the hidden gems of Jaipur, delve into its art, culture and spirituality.\",\n\"placeToVisit\": [{\"placeSpot\":\"Jantar Mantar\",\"address\":\"Gangori Bazaar, J.D.A. Market, Pink City, Jaipur\",\"placeType\":\"Astronomical Observatory\"},{\"placeSpot\":\"Nahargarh Fort\",\"address\":\"Krishna Nagar, Brahampuri, Jaipur, Rajasthan\",\"placeType\":\"Fort\"},{\"placeSpot\":\"Albert Hall Museum\",\"address\":\"Ram Niwas Garden, Kailash Puri, Adarsh Nagar, Jaipur\",\"placeType\":\"Museum\"}]\n},\n{\n\"date\": \"29th June\",\n\"Day\": \"Day 5\",\n\"accommodation\": {\"type\":\"Luxury Hotel\", \"name\":\"The Oberoi Amarvilas\", \"address\":\"Taj East Gate Road, Agra\"},\n\"dining\": {\"breakfast\":{\"dishName\":\"Petha\",\"placeName\":\"Panchi Petha\",\"address\":\"Kinchit Road, Sanjay Place, Agra\"}, \"lunch\":{\"dishName\":\"Papri Chaat\",\"placeName\":\"Deviram Sweets\",\"address\":\"Hari Parbat, Agra\"}, \"dinner\":{\"dishName\":\"Chicken Pickle\",\"placeName\":\"Shankara Vegis\",\"address\":\"Rajpur Chungi, Agra\"}},\n\"destination\": \"Agra\",\n\"description\": \"Continue your spiritual sojourn with a visit to the spiritual abode of the Lord Krishna, Vrindavan.\",\n\"placeToVisit\": [{\"placeSpot\":\"Krishna Janmasthan Temple\",\"address\":\"Mathura, Uttar Pradesh\",\"placeType\":\"Temple\"},{\"placeSpot\":\"Shri Bankey Bihari Temple\",\"address\":\"Raman Reti, Vrindavan, Uttar Pradesh\",\"placeType\":\"Temple\"},{\"placeSpot\":\"ISKCON Temple\",\"address\":\"Lajpat Nagar Colony, Vrindavan, Uttar Pradesh\",\"placeType\":\"Temple\"}]\n},\n{\n\"date\": \"30th June\",\n\"Day\": \"Day 6\",\n\"accommodation\": {\"type\":\"Heritage Hotel\", \"name\":\"Jamaal Resort & Palace\", \"address\":\"Naddi, Mcleodganj, Dharamshala\"},\n\"dining\": {\"breakfast\":{\"dishName\":\"Aloo Parantha\",\"placeName\":\"Punjabi Tadka\",\"address\":\"Bhagsunag Road, Dharamshala\"}, \"lunch\":{\"dishName\":\"Thukpa\",\"placeName\":\"Woeser Bakery\",\"address\":\"Temple Road, Mcleodganj\"}, \"dinner\":{\"dishName\":\"Tibetan Butter Tea\",\"placeName\":\"Lung Ta\",\"address\":\"Bhagsunag Road, Mcleodganj\"}},\n\"destination\": \"Dharamshala\",\n\"description\": \"Experience the majestic Himalayas, the peaceful Buddhist monasteries and the free-spirited culture of Dharamshala.\",\n\"placeToVisit\": [{\"placeSpot\":\"Tsechokling Gompa\",\"address\":\"Temple Road, Mcleodganj, Dharamshala\",\"placeType\":\"Monastery\"},{\"placeSpot\":\"Namgyalma Stupa\",\"address\":\"Temple Road, Mcleodganj, Dharamshala\",\"placeType\":\"Stupa\"},{\"placeSpot\":\"Bhagsu Waterfall\",\"address\":\"Bhagsu Waterfall, Mcleodganj, Dharamshala\",\"placeType\":\"Waterfall\"}]\n},\n{\n\"date\": \"1st July\",\n\"Day\": \"Day 7\",\n\"accommodation\": {\"type\":\"Resort\", \"name\":\"Ananda in the Himalayas\", \"address\":\"Narendra Nagar, Tehri - Garhwal, Uttarakhand\"},\n\"dining\": {\"breakfast\":{\"dishName\":\"Almond Milk\",\"placeName\":\"Vatika Restaurant\",\"address\":\"Idgah, Raja Road, Dehradun\"}, \"lunch\":{\"dishName\":\"Saag Meat\",\"placeName\":\"Black Pepper Restaurant\",\"address\":\"Paltan Bazaar, Dehradun\"}, \"dinner\":{\"dishName\":\"Maggi\",\"placeName\":\"Maggi Point\",\"address\":\"Landour, Mussoorie\"}},\n\"destination\": \"Mussoorie\",\n\"description\": \"End your spiritual journey in the enchanting hill town of Mussoorie, surrounded by scenic landscapes and cool weather.\",\n\"placeToVisit\": [{\"placeSpot\":\"Kempty Falls\",\"address\":\"Kempty Falls Road, Kempty, Mussoorie\",\"placeType\":\"Waterfall\"},{\"placeSpot\":\"Mall Road\",\"address\":\"The Mall Rd, Mussoorie, Uttarakhand\",\"placeType\":\"Market\"},{\"placeSpot\":\"Gun Hill\",\"address\":\"The Mall, Picture Palace, Mussoorie\",\"placeType\":\"Scenic Spot\"}]\n}\n]\n}"
    // const tripData = JSON.parse(s);
    // console.log(data);

    const { data, isLoading, isError, isSuccess } = useSelector(state => state.tripPlan);
    // const data = JSON.parse(tripData);
    console.log(data);
    if (isLoading) {
        return <LoaderExample />
    }
    if (isError) {
        return <p className='text-xl mt-36'>Something goes wrong!</p>
    }
    return (
        <div className='mt-36'>
            <div className='mx-auto '>
                <h1 className='text-center text-[1rem] uppercase text-[#3B79C9] font-medium'>{data?.subTitle} Enjoy Your Trip</h1>
                <h1 className='text-center text-[#223544] font-[Montserrat] uppercase font-bold text-[42px]'>{data?.tripName} Your Amazing Memorial Trip is here!</h1>
                <p className='font-[Poppins] text-center max-w-[900px] mx-auto mt-3 text-[#636774]'>{data?.description}</p>
            </div>
            <div>
                <Tripcards2 />
            </div>
            {/* <div>
                {
                    data.itinerary && data.itinerary.map((ite, index) =>
                        <TripCards itinerary={ite} key={index} />
                    )
                }
            </div> */}
        </div>
    )
}

export default TripDetails