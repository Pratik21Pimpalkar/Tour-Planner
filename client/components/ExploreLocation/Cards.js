import Image from "next/image"
const Cards = ({ img, name }) => {
    return (
        <div className="w-full cursor-pointer rounded-sm ">
            <div className="relative w-full h-[300px] rounded-sm  overflow-hidden ">
                <Image src={img} alt={name} fill style={{ objectFit: "cover" }} className="rounded-sm  hover:scale-105 transition-transform ease-out" />
            </div>
            <h2 className="font-semibold text-[18px] p-2 pl-0">{name}</h2>
            <h2 className="text-sm">⚫⚫⚫⚫</h2>
            <h2>₹</h2>
            <h2 className="text-sm p-2 pl-0 font-thin"> Vegeterian, Indian, Asian, Luxary, 5-star</h2>
        </div>
    )
}

export default Cards