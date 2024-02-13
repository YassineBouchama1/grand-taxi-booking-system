'use client'


import TripApi from "@/services/TripApi";

import { useEffect, useState } from "react";
import Loader from "../../shared/Loader";


const TripTable = () => {

    const [trips, setTrips] = useState([]);
    const [toggleLoader, setToggleLoader] = useState(true);
    
    const cancelReservation = async (id) => {
        try {
            const response = await ReservationsApi.delete(id)
            console.log(response)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await TripApi.all()
                setTrips(response.data.data);
                setToggleLoader(false)
            } catch (error) {
                console.error("Error fetching data:", error);
                setToggleLoader(false)
            }
        };

        fetchData();
    }, [cancelReservation]);







    const statusColor = (status) => {
        switch (status) {
            case 'waiting':
                return 'bg-green-500'
                break;
            case 'canceled':
                return 'bg-red-500'
                break;
            case 'completed':
                return 'bg-blue-500'
                break;
            default:
                break;
        }
    }

    return (
        <div class=" px-4 sm:px-8 py-4 overflow-x-auto">
            <div class="inline-block min-w-full  transition-shadow rounded-[18px] shadow-md  backdrop-blur-md  overflow-hidden">
                <table class="min-w-full leading-normal">
                    <thead>
                        <tr>

                            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-transparent  text-left text-xs font-semibold text-gray-600 dark:text-white  uppercase tracking-wider">
                                Route
                            </th>
                            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-transparent  text-left text-xs font-semibold text-gray-600 dark:text-white  uppercase tracking-wider">
                                Date
                            </th>
                            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-transparent  text-left text-xs font-semibold text-gray-600 dark:text-white  uppercase tracking-wider">
                                Status
                            </th>
                            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-transparent  text-left text-xs font-semibold text-gray-600 dark:text-white  uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody id="container_list">
                        {trips.length > 0 ?trips.map((item, index) => (




                            <tr key={index}>

                                <td class="px-5 py-5 border-b border-gray-200  text-sm">
                                    <p class="text-gray-900 dark:text-white whitespace-no-wrap">{item.pick_up_city} - {item.destination_city} </p>
                                </td>
                                <td class="px-5 py-5 border-b border-gray-200  text-sm">
                                    <p class="text-gray-900 dark:text-white whitespace-no-wrap">
                                        {item.pickup_datetime}
                                    </p>
                                </td>
                                <td class="px-5 py-5 border-b border-gray-200  text-sm">
                                    <span class="relative inline-block px-3 py-1 font-semibold text-white leading-tight">
                                        <span aria-hidden class={`absolute inset-0 ${statusColor(item.status)} opacity-50 rounded-full`}></span>
                                        <span class="relative">{item.status}</span>
                                    </span>
                                </td>
                                <td class="px-5 py-5 border-b border-gray-200  text-sm">
                                    <button onClick={() => cancelReservation(item.id)} type="button"
                                        class="text-white bg-red-700 hover:bg-red-800   font-medium rounded-full text-sm px-5 py-1 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                        cancel</button>


                                </td>
                            </tr>

                        )):<p>no trips</p>}



                    </tbody>
                </table>
                <Loader shouldShow={toggleLoader} />
                  
            </div>
        </div>

    );
};
export default TripTable;