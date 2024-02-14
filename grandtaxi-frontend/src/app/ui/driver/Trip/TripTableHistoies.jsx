'use client'


import TripApi from "@/services/TripApi";

import { useEffect, useState } from "react";
import Loader from "../../shared/Loader";



const TripTableHistoies = () => {

    const [trips, setTrips] = useState([]);
    const [toggleLoader, setToggleLoader] = useState(true);
    const [status, setStatus] = useState('');
    

    const fetchData = async () => {

        try {
            const response = await TripApi.historiesTrips()
            setTrips(response.data.data);
            setToggleLoader(false)
        } catch (error) {
            console.error("Error fetching data:", error);
            setToggleLoader(false)
        }
    };
    useEffect(() => {
 

        fetchData();
    }, []);







    const statusColor = (status) => {
        switch (status) {
            case 'waiting':
                return 'bg-green-500'
                break;
            case 'canceled':
                return 'bg-red-500'
                break;
            case 'en_route':
                return 'bg-blue-500'
                break;

            case 'expired':
                return 'bg-black'
                break;
            case 'full':
                return 'bg-orang-500'
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
                                price
                            </th>
                            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-transparent  text-left text-xs font-semibold text-gray-600 dark:text-white  uppercase tracking-wider">
                                seats
                            </th>
                       
                        </tr>
                    </thead>
                    <tbody >
                        {trips.length > 0 ? trips.map((item, index) => {
                            // Check if the trip is either completed, expired, or has been deleted
                            if (item.status !== 'completed' && item.status !== 'expired' && !item.deleted_at && item.status !== 'canceled') {
                                return null; // Skip this trip
                            }

                            return (
                                <tr key={index}>
                                    <td class="px-5 py-5 border-b border-gray-200 text-sm">
                                        <p class="text-gray-900 dark:text-white whitespace-no-wrap">{item.pick_up_city} - {item.destination_city} </p>
                                    </td>
                                    <td class="px-5 py-5 border-b border-gray-200 text-sm">
                                        <p class="text-gray-900 dark:text-white whitespace-no-wrap">
                                            {item.pickup_datetime}
                                        </p>
                                    </td>
                                    <td class="px-5 py-5 border-b border-gray-200 text-sm">
                                        <span aria-hidden class={`absolute inset-0 ${statusColor(item.status)} opacity-50 rounded-full`}></span>
                                        <span class="relative">{item.status}</span>
                                    </td>
                                    <td class="px-5 py-5 border-b border-gray-200 text-sm">
                                        <p class="text-gray-900 dark:text-white whitespace-no-wrap">
                                            {item.price}
                                        </p>
                                    </td>
                                    <td class="px-5 py-5 border-b border-gray-200 text-sm">
                                        <p class="text-gray-900 dark:text-white whitespace-no-wrap">
                                            {item.seats}
                                        </p>
                                    </td>
                                </tr>
                            );
                        }) : <p>no Histories</p>}



                    </tbody>
                </table>
                <Loader shouldShow={toggleLoader} />
                  
            </div>
        </div>

    );
};
export default TripTableHistoies;