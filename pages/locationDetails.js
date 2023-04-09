import ArtHistory from "@/components/ExploreLocation/Art&History"
import Hotels from "@/components/ExploreLocation/Hotels"
const locationDetails = () => {
  return (
    <>
      <h1 className="w-4/5 m-auto mt-20 font-bold text-[40px]">Get a Tour of <span className="text-orange-600"> Nagpur</span></h1>
      <Hotels />
      <ArtHistory />
    </>
  )
}

export default locationDetails