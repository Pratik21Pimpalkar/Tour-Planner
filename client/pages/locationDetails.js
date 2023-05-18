import ArtHistory from "@/components/ExploreLocation/Art&History"
import Hotels from "@/components/ExploreLocation/Hotels"
import { useSelector } from "react-redux"
import { travelApi } from "@/services/api"
import { LoaderExample } from "@/components/Loader"
const LocationDetails = () => {

  const { data: place, isLoading, isError, isSuccess } = useSelector(state => state.placeDetails)
  console.log(place);
  return (
    <>
      {
        isLoading ? <LoaderExample /> :
          <>
            <h1 className="w-4/5 m-auto mt-36 font-bold text-[40px]">Get a Tour of <span className="text-[#6388ff]"> {place?.hotels?.features[0]?.properties?.county}</span></h1>
            <Hotels hotelsData={place?.hotels?.features} />
            <ArtHistory tourismData={place?.tourism?.features} />
          </>
      }
    </>
  )
}

export default LocationDetails