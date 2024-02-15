'use client'

import { setDate, setQuery, setTrips } from "@/Redux/trip/tripSlice";
import { axiosClient } from "@/services/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const FormSearchLonger =  ({setDate}) => {

    const [cities, setCities] = useState([])
    // const [date, setDate] = useState(null)
    const [start, setStart] = useState(null)
    const [end, setEnd] = useState(null)

const dispatch = useDispatch()
    useLayoutEffect(()=>{
const fetchCities =async ()=>{
  const data =   await axiosClient.get('/cities')
  setCities(data.data)
}
        fetchCities()
    },[])


    const onSubmitSearch = async (e)=>{
if (!date) return notify('select date first', 'warn')
       
        // dispatch(setQuery({ date,start,end }));

    }


    return <form className="bg-white rounded-lg  p-6 w-full">
        <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2 sm:col-span-1 ">
                <select onChange={(e) => setStart(e.target.value)} id="departure" className="w-full py-2 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-green-500 ">
                    <option className="text-gray-400" value="" disabled selected>Pick departure</option>
                    {cities?.data?.map((city, index) => (
                        <option key={index}   value={city.id}  selected>{city.name}</option>
                    ))}

                </select>
            </div>
            <div className="col-span-2 sm:col-span-1 ">
                <select onChange={(e) => setEnd(e.target.value)} id="destination" className="w-full py-2 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-green-500">
                    <option className="text-gray-400 " value="" disabled selected>Pick destination</option>
                    {cities?.data?.map((city, index) => (
                        <option key={index}  value={city.id} selected>{city.name}</option>
                    ))}
                </select>
            </div>
            <div className="col-span-2 sm:col-span-1 ">
                <input onChange={(e) => setDate(e.target.value)} type="date" name="date" id="date" className="w-full py-2 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-green-500" />
            </div>
        </div>

        <div className="mt-4 flex justify-center">
            <button onClick={() => onSubmitSearch()} type="button" id="findTripBtn" className="w-[150px] bg-green-700 hover:bg-green-600 text-white font-medium py-1 rounded-lg focus:outline-none">Find Tickets</button>
        </div>
    </form>;
};
export default FormSearchLonger;