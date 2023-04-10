import Image from "next/image"
const PopularCards = ({ name, img }) => {
    return (
        <div className="w-full cursor-pointer rounded-sm ">
            <div className="relative w-full h-[350px] rounded-sm  overflow-hidden ">
                <Image src={img} alt={name} fill style={{ objectFit: "cover" }} className="rounded-sm  hover:scale-105 transition-transform ease-out" />
                <h2 className="absolute bottom-0 text-center w-full bg-black bg-opacity-60 p-3 text-white text-sm  ">{name}</h2>
            </div>
        </div>
    )
}

export default PopularCards 