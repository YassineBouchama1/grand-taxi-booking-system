'use client'

import { axiosClient } from "@/services/axios";
import Modal from "../../shared/Modal";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import ThankYouPopup from "../../passenger/ThankYouPopup/thankYouPopup";
import notify from "@/hooks/useNotifaction";
import { redirect, useRouter } from "next/navigation";


const CardSearch = ({trip}) => {

    const paragraphRef = useRef(null);
const router = useRouter()
console.log(trip)
    const [toggle, setToggle] = useState(false)
    const user = useSelector((state) => state.auth.user)
    const onReservation = async ()=>{

    console.log(user)

    //chekc if useer is passenger
    if (user?.role_id !== 2){
        return notify("You Are Not Allow To Resserve .", "warn");

    }

    const formData = {
        "trip_id":trip.id
    }

    const response = await axiosClient.post('/reservations/create', formData)
    if (response.status === 201) {
      setToggle(true)
      //scroll to the top after reserve
        window.scrollTo({ top: 0, behavior: 'smooth' });
        router.push('/passenger')

    }
    console.log(response)
  
}

    return <article id="ticket-wrapper" class="bg-white w-full  h-auto rounded-md p-4 mx-auto ">


        <div id="ticket-wrapper2" class=" flex  gap-x-2 p-4 flex-col lg:flex-row mx-auto justify-between  lg:h-[80%] items-center " >
            <div class=" ticket-wrapper-info flex-col lg:justify-between justify-center items-center gap-y-6 ">
                <h3 class="font-bold text-lg  leading-7 text-[#424248]">{trip.pick_up_city} - {trip.destination_city}</h3>
                <h4 class="font-semibold text-lg  leading-7 text-[#424248]">{new Date(trip.pickup_datetime).toLocaleDateString('en-US')}</h4>

            </div>
            <div class="ticket-wrapper-cities flex justify-between gap-x-4  items-center">

           

                <div class="text-center ">
                    <i class="fa-solid fa-arrow-right-long text-green-700"></i>
                    <p>seats : {trip.seats}</p>
                </div>

           

            </div>
            <div class="ticket-wrapper-price text-center flex flex-col gap-4">
                <h3 class="text-green-600 text-bold text-2xl">${trip.price}</h3>


                <button onClick={() => onReservation(trip.id)} class="w-full bg-[#0E9E4D] hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg focus:outline-none">Select Seat</button>

            </div>
        </div>
        <hr></hr>
            <div class="flex  gap-x-2 p-4 mx-auto justify-start basis-4/6 items-center">
                <p class="font-bold text-[#777]">Car Type-</p> 
            <span class="bg-[#f7f7f7] text-[#777] p-1 rounded-md">{trip.car}</span>
              
            </div>

        <Modal
            shouldShow={toggle}
            onRequestClose={() => setToggle(false)}
        >
            <ThankYouPopup/>    </Modal>
    </article>;
};
export default CardSearch;