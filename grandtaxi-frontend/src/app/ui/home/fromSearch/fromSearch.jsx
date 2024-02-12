'use client'

import { setDate, setQuery, setTrips } from "@/Redux/trip/tripSlice";
import { axiosClient } from "@/services/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const FromSearch = () => {
const router = useRouter()
    const [cities, setCities] = useState([])
    const [date, setDate] = useState(null)
    const [start, setStart] = useState(null)
    const [end, setEnd] = useState(null)

    const dispatch = useDispatch()
    useLayoutEffect(() => {
        const fetchCities = async () => {
            const data = await axiosClient.get('/cities')
            setCities(data.data)
        }
        fetchCities()
    }, [])



    const onSubmitSearch = async (e) => {

        dispatch(setQuery({ date, start, end }));
        router.push('/search')

    }

    // //access client state
    // const queryClient = useQueryClient();

    // // this mutation for change status user
    // const { mutateAsync, isError, data, isPending } = useMutation({
    //     mutationFn: async () =>
    //         dispatch(setDate('2024-05-10')),
    //     onSuccess: async () => {
    //         console.log("Deleted succssfully");
    //         queryClient.invalidateQueries({ queryKey: ["trips"] });
    //     },
    // });
    // if (isPending){
    //    return <h1>loding</h1>
    // }

    return <form class="bg-white rounded-lg  p-6 w-full">
        <div class="grid grid-cols-2 gap-6">
            <div class="col-span-2 sm:col-span-1 ">
                <select onChange={(e) => setStart(e.target.value)} id="departure" class="w-full py-2 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-green-500 ">
                    <option class="text-gray-400" value="" disabled selected>Pick departure</option>
                    {cities?.data?.map((city, index) => (
                        <option key={index} value={city.id} selected>{city.name}</option>
                    ))}

                </select>
            </div>
            <div class="col-span-2 sm:col-span-1 ">
                <select onChange={(e) => setEnd(e.target.value)} id="destination" class="w-full py-2 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-green-500">
                    <option class="text-gray-400 " value="" disabled selected>Pick destination</option>
                    {cities?.data?.map((city, index) => (
                        <option key={index} value={city.id} selected>{city.name}</option>
                    ))}
                </select>
            </div>
            <div class="col-span-2 sm:col-span-1 ">
                <input onChange={(e) => setDate(e.target.value)} type="date" name="date" id="date" class="w-full py-2 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-green-500" />
            </div>
        </div>

        <div class="mt-4 flex justify-center">
            <button onClick={() => onSubmitSearch()} type="button" id="findTripBtn" class="w-[150px] bg-green-700 hover:bg-green-600 text-white font-medium py-1 rounded-lg focus:outline-none">Find Tickets</button>
        </div>
    </form>;
};
export default FromSearch;