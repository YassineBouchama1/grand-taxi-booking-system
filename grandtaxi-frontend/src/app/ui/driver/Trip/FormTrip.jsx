'use client'

import notify from "@/hooks/useNotifaction";
import TripApi from "@/services/TripApi";
import { axiosClient } from "@/services/axios";
import { useRouter } from "next/navigation";

import { useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
const FormTrip = () => {


    const dispatch = useDispatch()
const router = useRouter()
    const [formData, setFormData] = useState({
        duration_minutes: '',
        seats: '',
        price: '',
        pick_up_city_id: '',
        destination_city_id: '',
        pickup_datetime: ''
    });
    const [errors, setErrors] = useState({});
    const [createdMsg, setCreatedMsg] = useState('');
    const [errorsMsg, setErrorsMsg] = useState([]);
    const [cities, setCities] = useState([])




    useLayoutEffect(() => {
        const fetchCities = async () => {
            const data = await axiosClient.get('/cities')
            setCities(data.data)
        }
        fetchCities()
    }, [])

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


        console.log(formData)


        const newErrors = {};
        if (!formData.duration_minutes.trim()) {
            newErrors.duration_minutes = "Duration minutes is required";
        }
        if (!formData.destination_city_id.trim()) {
            newErrors.destination_city_id = "Destination city is required";
        }
        if (!formData.pick_up_city_id.trim()) {
            newErrors.pick_up_city_id = "Pick up city is required";
        }
        if (!formData.pickup_datetime.trim()) {
            newErrors.pickup_datetime = "Pickup datetime is required";
        }
        if (!formData.price.trim()) {
            newErrors.price = "Price is required";
        }
        if (!formData.seats.trim()) {
            newErrors.seats = "Seats is required";
        }
        if (formData.pick_up_city_id === formData.destination_city_id) {
            notify("You can't travel to the same city", "warn");
            return
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            // await axiosClient.get('/sanctum/csrf-cookie');
            // dispatch(setUser({ 'name': 'hole' }));
            const response = await TripApi.create(formData);
            console.log(response);
            if (response.status === 201) {
                setCreatedMsg(response.data.message)
                notify('response.data.message','success')
             
                router.push('/driver')
                setFormData({
                    duration_minutes: '',
                    seats: '',
                    price: '',
                    pick_up_city_id: '',
                    destination_city_id: '',
                    pickup_datetime: ''
                })
            }


        } catch (error) {
            console.log(error);


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

    //get today date  for input date
    const today = new Date().toISOString().split('T')[0];

    return <div class="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div class="container max-w-screen-lg mx-auto">
            <div>
                {createdMsg && <p className="text-green-500">{createdMsg}</p>}

                {errorsMsg &&
                    errorsMsg.map((error, index) => <p key={index} className="text-red-500">{error[0]}</p>)
                }

                <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                    <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                        <div class="text-gray-600">
                            <p class="font-medium text-lg">Trip Details</p>
                            <p>Please fill out all the fields.</p>
                        </div>

                        <form onSubmit={handleSubmit} class="lg:col-span-2">
                            <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                <div class="md:col-span-5 flex  justify-between gap-x-2">
                                    <div>
                                        <label for="duration_minutes">Duration Minutes</label>
                                        <input onChange={handleChange} type="number" name="duration_minutes" id="full_name" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                        {errors.duration_minutes && <span className="text-red-500">{errors.duration_minutes}</span>}
                                    </div>
                                    <div>
                                        <label for="price">Price</label>
                                        <input onChange={handleChange} type="number" name="price" id="full_name" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                        {errors.price && <span className="text-red-500">{errors.price}</span>}
                                    </div>
                                    <div>
                                        <label for="Seats">Seats</label>
                                        <input onChange={handleChange} type="number" name="seats" id="full_name" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                        {errors.seats && <span className="text-red-500">{errors.seats}</span>}
                                    </div>
                                </div>



                                <div class="md:col-span-2">
                                    <label for="country">Pick Up City</label>
                                    <div class="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                        <select onChange={handleChange} name="pick_up_city_id" className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent">
                                            <option className="text-gray-200" disabled selected value=''>Select Pick Up City</option>
                                            {cities?.data?.map((city, index) => (
                                                <option key={index} value={city.id} >{city.name}</option>
                                            ))}
                                        </select>


                                    </div>
                                        {errors.pick_up_city_id && <span className="text-red-500">{errors.pick_up_city_id}</span>}
                                </div>

                                <div class="md:col-span-2">
                                    <label for="state">Destination City</label>
                                    <div class="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                        <select onChange={handleChange} name="destination_city_id" className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent">
                                            <option disabled selected value=''>Select Destination City</option>
                                            {cities?.data?.map((city, index) => (
                                                <option key={index} value={city.id} >{city.name}</option>
                                            ))}
                                        </select>

                                    </div>
                                        {errors.destination_city_id && <span className="text-red-500">{errors.destination_city_id}</span>}
                                </div>



                                <div class="md:col-span-1">
                                    <div>
                                        <label for="pickup_datetime">Date</label>
                                        <input onChange={handleChange} type="date" min={today} name="pickup_datetime" id="pickup_datetime" class="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder=""  />
                                    </div>
                                    {errors.pickup_datetime && <span className="text-red-500">{errors.pickup_datetime}</span>}

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

            <a href="https://www.buymeacoffee.com/dgauderman" target="_blank" class="md:absolute bottom-0 right-0 p-4 float-right">
                <img src="https://www.buymeacoffee.com/assets/img/guidelines/logo-mark-3.svg" alt="Buy Me A Coffee" class="transition-all rounded-full w-14 -rotate-45 hover:shadow-sm shadow-lg ring hover:ring-4 ring-white"></img>
            </a>
        </div>
    </div>;
};
export default FormTrip;