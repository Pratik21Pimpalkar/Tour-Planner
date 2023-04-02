import Image from "next/image"
const PopularCards = ({ name, img }) => {
    return (
        <div className="w-full cursor-pointer rounded-xl">
            <div className="relative w-full h-[350px] rounded-xl">
                <Image src={img} alt={name} fill style={{ objectFit: "cover" }} className="rounded-xl" />
                <h2 className="absolute bottom-0 text-center w-full bg-black bg-opacity-80 p-3 text-white rounded-e-xl rounded-l-xl">{name}</h2>
            </div>
        </div>
    )
}

export default PopularCards 