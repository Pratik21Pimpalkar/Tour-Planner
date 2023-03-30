import PopularCards from "./PopularCards"

const Popular = () => {
    return (
        <section>
            <h2 className="text-center font-bold text-[30px] py-2 my-2">Most Popular Tourist Destination</h2>

            <div className="grid grid-cols-3">
                <PopularCards />
                <PopularCards />
                <PopularCards />
                <PopularCards />
                <PopularCards />
            </div>
        </section>
    )
}

export default Popular