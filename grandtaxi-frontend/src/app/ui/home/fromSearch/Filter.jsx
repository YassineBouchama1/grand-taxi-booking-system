'use client'

import { setQuery } from "@/Redux/trip/tripSlice";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

const Filter = ({ setRating }) => {
    const dispatch = useDispatch()
 const searchParams =   useSearchParams();


 

    return <div class="bg-white basis-1/4	rounded-md w-full h-screen p-8 mx-auto">
        <div class=" flex justify-between  ">
            <p class='font-bold'>Filter</p><button id="restBtn" class="border-none ourline-none bg-transparent">Reset All</button>

        </div>

        <hr></hr>
        {/* <!-- filer sorting  --> */}
        <div class=" py-6">
            <p class='font-bold py-4'>vehicle type</p>

            <div id="companySelector" class="flex flex-col gap-4">
                <label for="allcompany" class="flex items-center gap-x-4 text-gray-400">
                    <input id="allcompany" type="radio" name="company" value="all" class="accent-green-600 border-2 w-4 h-4 text-green-600 bg-gray-100 border-green-300 rounded focus:ring-green-600" ></input>
                    <span class="bg-[#f6f6f7] rounded-md w-2/2 px-2 flex gap-x-3 items-center">ALL</span>
                </label>
                <label for="allcompany" class="flex items-center gap-x-4 text-gray-400">
                    <input onChange={(e) => dispatch(setQuery({ 'typeCar':e.target.value }))} id="allcompany" type="radio" name="company" value="BMW" class="accent-green-600 border-2 w-4 h-4 text-green-600 bg-gray-100 border-green-300 rounded focus:ring-green-600" ></input>
                    <span class="bg-[#f6f6f7] rounded-md w-2/2 px-2 flex gap-x-3 items-center">tesla</span>
                </label>
            </div>

        </div>

        <div class=" py-6">
            <p class='font-bold py-4'>driver ratings</p>

            <div>
                <select onChange={e => (searchParams.set('raing', e.target.value))} class="w-full py-2 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-green-500">
                    <option class="text-gray-400" value="" disabled selected>sorting By</option>
                    <option value={null}>ALL</option>
                    <option value="5">5</option>
                    <option value="4">5</option>
                    <option value="3">3</option>
                    <option value="2">2</option>
                    <option value="1">1</option>

                </select>

            </div>

        </div>
        

  

    </div>;
};
export default Filter;