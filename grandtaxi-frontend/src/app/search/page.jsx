'use client'

import { axiosClient } from "@/services/axios";
import HomeLayout from "../layouts/HomeLayout";
import ListTrips from "../ui/home/ListTrips";

import FormSearchLonger from "../ui/home/fromSearch/formSearchLonger";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default   function Home() {

  const [trips, setTrips] = useState([]);
  const isloading = useSelector((state) => state.trip.isloading);
  const date = useSelector((state) => state.trip.date);
  const start = useSelector((state) => state.trip.start);
  const end = useSelector((state) => state.trip.end);
  const car = useSelector((state) => state.trip.car);
  const rating = useSelector((state) => state.trip.rating);

  const fetchData = async () => {
    let url = `?q=null`;
    if (date) {
      url += `&date=${date}`;
    }
      if (start) {
        url += `&start=${start}`;
      }
      if (end) {
        url += `&end=${end}`;
      }
      if (car) {
        url += `&typeCar=${car}`;
      }
      if (rating) {
        url += `&rating=${rating}`;
      }
   
    console.log(url)
    console.log(car)
    try {
      const response = await axiosClient.get(`trips${url}`);
      console.log(response)
 
      setTrips(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  useEffect(() => {
 
    console.log('use effect')
    console.log(isloading)
    fetchData();
  }, [isloading]);



  return (<HomeLayout>



    <section id="slider_hero" class="bg-cover bg-center relative   h-[300px] flex items-end justify-center" style={{ backgroundImage: `url('/assets/slider/3.jpg')` }} >
      <div class="bg-white rounded-tr-md rounded-tl-md w-full h-auto4 flex gap-x-10    max-w-screen-xl  px-4 mx-auto">
        <FormSearchLonger/>
      </div>
    </section>


    <section class="flex gap-10  h-auto items-start justify-start pt-10 lg:justify-between flex-col lg:flex-row  max-w-screen-xl min-h-screen px-4 mx-auto">




      <ListTrips trips={trips}/>


       
            </section>
  </HomeLayout>

    ) 
}