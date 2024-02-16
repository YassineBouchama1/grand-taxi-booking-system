'use client'

import { setDate, setQuery, setTrips } from "@/Redux/trip/tripSlice";
import notify from "@/hooks/useNotifaction";
import { axiosClient } from "@/services/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const FormSearchLonger = () => {
    const [cities, setCities] = useState([]);
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);
    const [date, setDate] = useState(null);
    const [rating, setRating] = useState(null);
    const [car, setCar] = useState(null);

const searchParams = useSearchParams()
    const router = useRouter()
    // Fetch cities data on component mount
    useLayoutEffect(() => {
        const fetchCities = async () => {
            const data = await axiosClient.get('/cities');
            setCities(data.data);
        };
        fetchCities();
    }, []);


    const onSubmitSearch = async () => {
        console.log('clicked')
        let url = `?`; 
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

        //change url
        router.push(url, { shallow: true })
        // dispatch(setQuery({ date, start, end, rating, car }));
    };

    return <form  className="bg-white rounded-lg  p-6 w-full">
        <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2 sm:col-span-1 ">



                <select value={start} onChange={(e) => setStart(e.target.value)} id="departure" className="w-full py-2 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-green-500 ">
                    <option className="text-gray-400" value='' disabled selected>Pick departure</option>
                    {cities?.data?.map((city, index) => (
                        <option key={index} value={city.id} >{city.name}</option>
                    ))}

                </select>
            </div>

            <div className="col-span-2 sm:col-span-1 ">
                <select value={end} onChange={(e) => setEnd(e.target.value)} id="destination" className="w-full py-2 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-green-500">
                    <option className="text-gray-400 " value="" disabled >Pick destination</option>
                    {cities?.data?.map((city, index) => (
                        <option key={index} value={city.id} selected={searchParams?.get('start') === city.id} >{city.name}</option>
                    ))}
                </select>
            </div>


            <div className="col-span-2 sm:col-span-1 ">
                <input onChange={(e) => setDate(e.target.value)} type="date" name="date" value={searchParams.get('date') ? searchParams.get('date'):null} className="w-full py-2 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-green-500" />
            </div>
        </div>
        <h4 className="text-center py-4">Filter</h4>
        <div className="col-span-2 sm:col-span-1  flex justify-between gap-x-4">
            <select onChange={(e) => setRating(e.target.value)} class="w-full py-2 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-green-500">
                <option class="text-gray-400" value="" disabled selected>Select Rate</option>

                <option value="null">All</option>
                <option value="4">5</option>
                <option value="3">3</option>
                <option value="2">2</option>
                <option value="1">1</option>

            </select>
            <select onChange={(e) => setCar(e.target.value)} class="w-full py-2 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-green-500">
                <option class="text-gray-400" value="" disabled selected>Select Car</option>

                <option value="bmw">BMW</option>
                <option value="tesla">TESLA</option>
                <option value="cyberpunk">cyberpunk</option>
        

            </select>
        </div>


        <div className="mt-4 flex justify-center">
            <button onClick={() => onSubmitSearch()} type="button" id="findTripBtn" className="w-[150px] bg-green-700 hover:bg-green-600 text-white font-medium py-1 rounded-lg focus:outline-none">Find Tickets</button>
        </div>
    </form>;
};
export default FormSearchLonger;