import PopularCards from "./PopularCards"
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";
import '../../styles/Home.module.css'
import { Autoplay, Pagination, Navigation } from "swiper";
import { data } from './HeroCarouselData'
const Popular = () => {
    const swiper = useSwiper();
    return (
        <section className="flex items-center flex-col">
            <div className="w-4/5">
                <h2 className="font-bold text-3xl py-2 mt-10">Popular Destinations
                </h2>
                <h2 className="font-light text-lg py-1 text-[#697488] ">These popular destinations have a lot to offer
                </h2>
            </div>

            {/* <div className="grid grid-cols-1  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-[80%] gap-6  "> */}
            <div className="w-4/5 my-8 sm:text-xl">
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