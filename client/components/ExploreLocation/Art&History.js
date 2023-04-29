import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";
import '../../styles/Home.module.css'
import { Autoplay, Pagination, Navigation } from "swiper";
import { data } from '../LandingPage/HeroCarouselData'
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/outline";
import Cards from './Cards';
import { useSelector } from 'react-redux';

const ArtHistory = () => {
    const { data: allData, isLoading, isError, isSuccess } = useSelector(state => state.placeDetails)
    const tourismData = allData?.tourism?.features

    return (
        <>
            <div className="grid w-4/5 grid-cols-1 sm:grid-cols-2  mx-auto mt-11">
                <div className="">
                    <h2 className="font-bold text-3xl py-2">Art & History
                    </h2>
                    <h2 className="font-light text-lg py-1 text-[#697488] ">These popular destinations have a lot to offer
                    </h2>
                </div>
                <div className="mx-auto sm:ml-auto sm:mr-0 mt-3 sm:mt-0 flex items-center space-x-2">
                    <button className="artPrev p-3 hover:scale-105 hover:text-blue-700 hover:-translate-x-2 transition ease-out active:text-blue-900 bg-gray-100 rounded-full"><ArrowLeftIcon className="h-5" /></button>
                    <div className="art" /> <button className="artNext p-3 hover:scale-105 hover:text-blue-700 hover:translate-x-2 transition ease-out active:text-blue-900 bg-gray-100 rounded-full"><ArrowRightIcon className="h-5" /></button>
                </div>
            </div>
            <div className="w-4/5 my-8 sm:text-xl m-auto">
                <Swiper
                    className="w-full"
                    spaceBetween={15}
                    slidesPerView={1}
                    // centeredSlides={true}
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        // clickable: true,
                        // renderCustom: renderCustomPagination
                        el: '.art',
                        clickable: true,
                    }}
                    navigation={{
                        nextEl: '.artNext',
                        prevEl: '.artPrev',
                    }}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                        },
                        640: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 4,
                        },
                    }}
                    loop={true}
                    modules={[Autoplay, Pagination, Navigation]}


                >
                    {
                        isSuccess && tourismData.map((data, id) => <SwiperSlide key={data.properties.place_id}><Cards data={data.properties} /></SwiperSlide>)
                    }
                </Swiper>
            </div>
        </>
    )
}

export default ArtHistory