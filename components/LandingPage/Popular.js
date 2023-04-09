import PopularCards from "./PopularCards"
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/outline";
import { Autoplay, Pagination, Navigation } from "swiper";
import { data } from './HeroCarouselData'
import React from "react";
const Popular = () => {

    const renderCustomPagination = (swiper, current, total) => {
        return (
            <div className=" custom-pagination flex items-center justify-center absolute bottom-4 right-4 p-2 rounded-md shadow-md bg-black border border-gray-300 ">
                <div className="pagination-current font-bold mr-2 text-3xl">{current}   </div>
                <div className="pagination-total">/{total}</div>
            </div>
        );
    };


    return (
        <section className="flex items-center flex-col mt-24 mb-10 ">
            <div className="grid w-4/5 grid-cols-1 sm:grid-cols-2 ">
                <div className="">
                    <h2 className="font-bold text-3xl py-2">Popular Destinations
                    </h2>
                    <h2 className="font-light text-lg py-1 text-[#697488] ">These popular destinations have a lot to offer
                    </h2>
                </div>
                <div className="mx-auto sm:ml-auto sm:mr-0 mt-3 sm:mt-0 flex items-center">
                    <button className="review-swiper-button-prev p-5 hover:scale-125 hover:text-blue-700 hover:-translate-x-2 transition ease-out active:text-blue-900"><ArrowLeftIcon className="h-6" /></button>
                    <div className="my-custom-pagination-div" /> <button className="review-swiper-button-next p-5 hover:scale-125 hover:text-blue-700 hover:translate-x-2 transition ease-out active:text-blue-900"><ArrowRightIcon className="h-6" /></button>
                </div>
            </div>
            <div className="w-4/5 my-8 sm:text-xl  relative">
                <Swiper
                    className="w-full"
                    spaceBetween={15}
                    slidesPerView={1}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        // clickable: true,
                        // renderCustom: renderCustomPagination
                        el: '.my-custom-pagination-div',
                        clickable: true,


                    }}
                    navigation={{
                        nextEl: '.review-swiper-button-next',
                        prevEl: '.review-swiper-button-prev',
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
                            slidesPerView: 5,
                        },
                    }}
                    loop={true}
                    modules={[Autoplay, Pagination, Navigation]}


                >
                    {
                        data.map(({ name, img }, id) => <SwiperSlide key={id}><PopularCards name={name} img={img} /></SwiperSlide>)
                    }

                </Swiper>
            </div>

        </section >
    )
}

export default Popular