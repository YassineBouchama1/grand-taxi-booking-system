'use client'


import TripApi from "@/services/TripApi";

import { useEffect, useState } from "react";
import Loader from "../../shared/Loader";
import notify from "@/hooks/useNotifaction";


const TripTable = () => {

    const [trips, setTrips] = useState([]);
    const [toggleLoader, setToggleLoader] = useState(true);
    const [status, setStatus] = useState('');
    
    const cancelReservation = async (id) => {
        try {
            const response = await TripApi.delete(id)
            console.log(response)
        } catch (error) {
            console.log( error);
        }
    }
    const updateTrip = async (id) => {

        if (!status.trim()) return notify('chose status first','warn')
        try {

            const response = await TripApi.updateStatis({ status },id)
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
                                    <select className="bg-green-200 rounded-md text-gray-400" onChange={(e) => setStatus(e.target.value)}>
                                        <option disabled selected={item.status === 'waiting'} value='waiting' class="relative inline-block px-3 py-1 font-semibold text-white leading-tight">
                                            <span aria-hidden class={`absolute inset-0 ${statusColor('waiting')} opacity-50 rounded-full`}></span>
                                            <span class="relative">waiting</span>
                                        </option>
                                        <option disabled={item.status === 'completed' || item.status === 'expired' || item.status === 'en_route'} selected={item.status === 'full'} value='full' class="relative inline-block px-3 py-1 font-semibold text-white leading-tight">
                                            <span aria-hidden class={`absolute inset-0 ${statusColor('full')} opacity-50 rounded-full`}></span>
                                            <span class="relative">full</span>
                                        </option>

                                        <option disabled={item.status === 'completed' || item.status === 'expired'} selected={item.status === 'en_route'} value='en_route' class="relative inline-block px-3 py-1 font-semibold text-white leading-tight">
                                            <span aria-hidden class={`absolute inset-0 ${statusColor('en_route')} opacity-50 rounded-full`}></span>
                                            <span class="relative">on Route</span>
                                        </option>
                                        <option selected={item.status === 'expired'} value='completed' class="relative inline-block px-3 py-1 font-semibold text-white leading-tight">
                                            <span aria-hidden class={`absolute inset-0 ${statusColor('completed')} opacity-50 rounded-full`}></span>
                                            <span class="relative">completed</span>
                                        </option>

                                        <option selected={item.status === 'expired'} value='expired' class="relative inline-block px-3 py-1 font-semibold text-white leading-tight">
                                            <span aria-hidden class={`absolute inset-0 ${statusColor('expired')} opacity-50 rounded-full`}></span>
                                            <span class="relative">expired</span>
                                        </option>
                                    </select>
                                </td>
                                <td class="px-5 py-5 border-b border-gray-200  text-sm">
                                    <p class="text-gray-900 dark:text-white whitespace-no-wrap">
                                        {item.price}
                                    </p>
                                </td>
                                <td class="px-5 py-5 border-b border-gray-200  text-sm">
                                    <p class="text-gray-900 dark:text-white whitespace-no-wrap">
                                        {item.seats}
                                    </p>
                                </td>
                                <td class="px-5 py-5 border-b border-gray-200  text-sm">
                                    <button onClick={() => updateTrip(item.id)} type="button"
                                        class="text-white bg-red-700 hover:bg-red-800   font-medium rounded-full text-sm px-5 py-1 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                        Update</button>
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