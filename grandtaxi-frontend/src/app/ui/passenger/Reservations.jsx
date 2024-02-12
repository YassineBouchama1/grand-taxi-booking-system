'use client'

import { axiosClient } from "@/services/axios";
import { data } from "autoprefixer";
import { useEffect, useState } from "react";

const Reservations = () => {
    
    const [reserv, setReserv] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
           
            try {
                const response = await axiosClient.get('/reservations');
                setReserv(response.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);


const isValidCancleBtn = (date)=>{
    return (new Date(date).getTime() - new Date().getTime())> 24*60*60*1000
    
}

  return(
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
                      {reserv.map((item, index) => (

                     
                           

                          <tr>
                      
                              <td class="px-5 py-5 border-b border-gray-200  text-sm">
                                  <p class="text-gray-900 dark:text-white whitespace-no-wrap"> kect - safi</p>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200  text-sm">
                                  <p class="text-gray-900 dark:text-white whitespace-no-wrap">
                                     {item.data}
                                  </p>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200  text-sm">
                                  <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                      <span aria-hidden class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                      <span class="relative">{item.status}</span>
                                  </span>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200  text-sm">
                                  {!isValidCancleBtn(item.created_at) && 
                                      (<button type="button"
                                          class="text-white bg-red-700 hover:bg-red-800   font-medium rounded-full text-sm px-5 py-1 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                          cancel</button>)}
                                 

                              </td>
                          </tr>   
                          
                      ))}

                

            </tbody>
        </table>

    </div>
</div>

  );
};
export default Reservations;