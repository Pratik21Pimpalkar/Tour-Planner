import ArtHistory from "@/components/ExploreLocation/Art&History"
import Hotels from "@/components/ExploreLocation/Hotels"
const locationDetails = () => {
  return (
    <>
      <h1 className="w-4/5 m-auto mt-36 font-bold text-[40px]">Get a Tour of <span className="text-[#6388ff]"> Nagpur</span></h1>
      <Hotels />
      <ArtHistory />
    </>
  )
}

export default locationDetails