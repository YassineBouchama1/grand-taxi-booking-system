'use client'


import { useEffect, useState } from "react";

import FavoriteApi from "@/services/FavoriteApi";
import { useDispatch } from "react-redux";
import { setQuery } from "@/Redux/trip/tripSlice";
import { useRouter } from "next/navigation";



const Favorite = () => {
   const dispatch = useDispatch()
    const [favorites, setFavorites] = useState([]);


const router = useRouter()
    const handleDelete = async (favoriteId) => {
        try {
            await FavoriteApi.delete(favoriteId);
            setFavorites(favorites.filter(favorite => favorite.id !== favoriteId));
        } catch (error) {
            console.error('Error deleting favorite:', error);
        }
    };

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await FavoriteApi.getAll();
                console.log(response)
                setFavorites(response.data);
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        };

        fetchFavorites();
    }, []);



    const searchWithit = async (searchWord) => {
        dispatch(setQuery(searchWord));

        let url = `/search?tripo=null`;
        if (searchWord.start) {
            url += `&${searchWord.start}`;
        }
        if (searchWord.end) {
            url += `&${searchWord.end}`;
        }

        router.push(url);
    };


  return(
    <div class=" px-4 sm:px-8 py-4 overflow-x-auto">
        <h3 className="py-6 text-center">My Reservation & Histories</h3>
    <div class="inline-block min-w-full  transition-shadow rounded-[18px] shadow-md  backdrop-blur-md  overflow-hidden">
        <table class="min-w-full leading-normal">
            <thead>
                <tr>
                
                
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-transparent  text-left text-xs font-semibold text-gray-600 dark:text-white  uppercase tracking-wider">
                              Pick Up City 
                    </th>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-transparent  text-left text-xs font-semibold text-gray-600 dark:text-white  uppercase tracking-wider">
                              Destination City 
                    </th>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-transparent  text-left text-xs font-semibold text-gray-600 dark:text-white  uppercase tracking-wider">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody id="container_list">
                      {favorites.map(favorite => (
                          <tr key={favorite.id}>
                           
                              <td>{favorite.pick_up_city}</td>
                              <td>{favorite.destination_city}</td>
                              <td>
                                  <button onClick={() => handleDelete(favorite.id)}>Delete</button>
                                  <button onClick={() => searchWithit({ start: favorite.pick_up_city_id, end: favorite.destination_city_id })}>Search</button>
                              </td>
                          </tr>
                      ))}


            </tbody>
        </table>

    </div>
</div>

  );
};
export default Favorite;