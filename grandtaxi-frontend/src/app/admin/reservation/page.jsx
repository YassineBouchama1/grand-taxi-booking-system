'use client'

import Error from "@/app/ui/admin/Error";
import Loading from "@/app/ui/shared/Loading";
import notify from "@/hooks/useNotifaction";
import AdminApi from "@/services/AdminApi";
import { axiosClient } from "@/services/axios";
import { useQuery } from "@tanstack/react-query";

import { useLayoutEffect, useState } from "react";
const FormTrip = () => {




    const [formData, setFormData] = useState({
        passenger_id: '',
        trip_id: '',
        
    });
    const [errors, setErrors] = useState({});
    const [createdMsg, setCreatedMsg] = useState('');
    const [errorsMsg, setErrorsMsg] = useState([]);
    const [trips, setTrips] = useState([])




    useLayoutEffect(() => {
        const fetchTrips = async () => {
            const data = await axiosClient.get('/trips')
            setTrips(data.data.data)
            console.log(data.data.data)
        }
        fetchTrips()
    }, [])



    // fetching data from server
    const { data:users, isLoading, isSuccess, isError } = useQuery({
        queryKey: ["usersList"],
        queryFn: async () => AdminApi.usersNotAdmin(),
    });

    if (isLoading) {
        return <Loading/>
        // dispatch(setLengthUser(data.length));
    }
    if (isError) {
        return <Error />;
    }
 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setCreatedMsg('')
        setErrorsMsg('')



        const newErrors = {};
        if (!formData.passenger_id.trim()) {
            newErrors.passenger_id = "passenger_id minutes is required";
        }
        if (!formData.trip_id.trim()) {
            newErrors.trip_id = "Destination city is required";
        }
   

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
   
        try {
       
            const response = await AdminApi.createReserve(formData);
            console.log(response);
            if (response.status === 201) {
                setCreatedMsg(response.data.message)
                notify(response.data.message, 'success')

          
              
            }


        } catch (error) {
            console.log(error);


            if (error.response.status === 403) {
                notify(error.response.data.message, 'warn')
                return
            }

            // Check if error.response exists and has data and errors properties
            if (error.response && error.response.data && error.response.data.errors) {
                // Extract error messages from the response
                const errorMessages = Object.values(error.response.data.errors);
                setErrorsMsg(errorMessages);
            } else {
                // If the error structure is different or unknown, handle it accordingly
                setErrorsMsg(['An unexpected error occurred.']);
            }
        }
    };



    return <div class="h-full bg- p-6 bg-gray-100 flex items-center justify-center">
        <div class="container max-w-screen-lg mx-auto">
            <div>
                {createdMsg && <p className="text-green-500">{createdMsg}</p>}

                {errorsMsg &&
                    errorsMsg.map((error, index) => <p key={index} className="text-red-500">{error[0]}</p>)
                }

                <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                    <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                        <div class="text-gray-600">
                            <p class="font-medium text-lg">Reservation Details</p>
                            <p>Please fill out all the fields.</p>
                        </div>

                        <form onSubmit={handleSubmit} class="lg:col-span-2">
                            <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                <div class="md:col-span-2">
                                    <label for="state">Trip</label>
                                    <div class="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                        <select onChange={handleChange} name="trip_id" className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent">
                                            <option disabled selected value=''>Select Trip</option>
                                            {trips?.map((trip, index) => (
                                                <option key={index} value={trip.id} >{trip.pick_up_city}-{trip.destination_city} : {new Date(trip.pickup_datetime).toLocaleDateString('en-US') }</option>
                                            ))}
                                        </select>

                                    </div>
                                    {errors.destination_city_id && <span className="text-red-500">{errors.destination_city_id}</span>}
                                </div>
                                <div class="md:col-span-2">
                                    <label for="state">Passenger</label>
                                    <div class="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                        <select onChange={handleChange} name="passenger_id" className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent">
                                            <option disabled selected value=''>Select Passenger</option>
                                    
                                            {users?.data?.users?.map((user, index) => (
                                                user.role_id != 2 ? null:
                                                <option key={index} value={user.id} >{user.name}</option>
                                            ))}
                                        </select>

                                    </div>
                                    {errors.destination_city_id && <span className="text-red-500">{errors.destination_city_id}</span>}
                                </div>
                             



                               

                             



                       




                                <div class="md:col-span-5 text-right">
                                    <div class="inline-flex items-end">
                                        <button type="submit" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Create</button>
                                    </div>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>


        </div>
    </div>;
};
export default FormTrip;