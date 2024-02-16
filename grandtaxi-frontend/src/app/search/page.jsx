'use client'
import { useSearchParams } from "next/navigation";
import HomeLayout from "../layouts/HomeLayout";
import ListTrips from "../ui/home/ListTrips";
import Filter from "../ui/home/fromSearch/Filter";
import FormSearchLonger from "../ui/home/fromSearch/formSearchLonger";
import { useQueryState } from 'nuqs'

export default   function Home() {

  // const trem = searchParams?.has('rating') && searchParams.get('rating')
  // console.log(trem)




  return (<HomeLayout>



    <section id="slider_hero" class="bg-cover bg-center relative   h-[300px] flex items-end justify-center" style={{ backgroundImage: `url('/assets/slider/3.jpg')` }} >
      <div class="bg-white rounded-tr-md rounded-tl-md w-full h-auto4 flex gap-x-10    max-w-screen-xl  px-4 mx-auto">
        <FormSearchLonger/>
      </div>
    </section>


    <section class="flex gap-10  h-auto items-start justify-start pt-10 lg:justify-between flex-col lg:flex-row  max-w-screen-xl min-h-screen px-4 mx-auto">




            
  
        <ListTrips />

       
            </section>
  </HomeLayout>

    ) 
}