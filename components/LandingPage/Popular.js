import PopularCards from "./PopularCards"
import { data } from './HeroCarouselData'
const Popular = () => {
    return (
        <section className="flex items-center flex-col">
            <h2 className="text-center font-bold text-[40px] py-2 my-10">Most Popular Tourist Destination</h2>

            <div className="grid grid-cols-1  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-[80%] gap-6  ">
                {
                    data.map(({ name, img }, id) => <PopularCards name={name} img={img} key={id} />)
                }

            </div>
        </section>
    )
}

export default Popular