
import { getSession } from "@/lib/session";

import ListTrips from "../ui/home/ListTrips";
import FormSearchLonger from "../ui/home/fromSearch/formSearchLonger";
import NavBar from "../ui/shared/navbar/NavBar";
const fetchTrips = async (params) => {

//build ur extend of params comes from query
  let url = `${process.env.BACKEND_URL}/api/trips`;

  if (params) {
    const queries = await Object.keys(params).map(key => `${key}=${params[key]}`).join('&');
    url += `?${queries}`;
  }
  console.log(url)
  const resp = await fetch(url)
  const trips = await resp.json()
  return trips;

}

export default async function Home({ searchParams }) {

const session = await getSession();
console.log(session)
  //bring trips 
  const trips = await fetchTrips(searchParams)


  return (<>
       <NavBar />



    <section id="slider_hero" class="bg-cover bg-center relative   h-[300px] flex items-end justify-center" style={{ backgroundImage: `url('/assets/slider/3.jpg')` }} >
      <div class="bg-white rounded-tr-md rounded-tl-md w-full h-auto4 flex gap-x-10    max-w-screen-xl  px-4 mx-auto">
        <FormSearchLonger/>
      </div>
    </section>


    <section class="flex gap-10  h-auto items-start justify-start pt-10 lg:justify-between flex-col lg:flex-row  max-w-screen-xl min-h-screen px-4 mx-auto">




      <ListTrips trips={trips.data}/>


       
            </section>
            </>


    ) 
}