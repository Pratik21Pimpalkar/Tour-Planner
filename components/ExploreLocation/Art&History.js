import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";
import '../../styles/Home.module.css'
import { Autoplay, Pagination, Navigation } from "swiper";
import { data } from '../LandingPage/HeroCarouselData'
import { PopularCards } from '../LandingPage';
import Cards from './Cards';

const ArtHistory = () => {
    return (
        <>
            <div className="w-4/5 m-auto">
                <h2 className="font-bold text-3xl py-2 mt-10">Arts & History
                </h2>
                <h2 className="font-light text-lg py-1 text-[#697488] ">These popular destinations have a lot to offer
                </h2>
            </div>
            <div className="w-4/5 my-8 sm:text-xl m-auto">
                <Swiper
                    className="w-full"
                    spaceBetween={15}
                    slidesPerView={1}
                    // centeredSlides={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
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
                        data.map(({ name, img }, id) => <SwiperSlide key={id}><Cards name={name} img={img} /></SwiperSlide>)
                    }
                </Swiper>
            </div>
        </>
    )
}

export default ArtHistory