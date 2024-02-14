'use client'

import { setUser } from "@/Redux/auth/authSlice";
import notify from "@/hooks/useNotifaction";
import DriverApi from "@/services/DriverApi";
import { useState } from "react";
import { useDispatch } from "react-redux";

const DriverEditForm = ({ setToggleEdit }) => {

const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        description: null,
        name: null,
        vehicle_type: null,
        payment_type: null,
    });



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
  


       



        try {
         
            const response = await DriverApi.update(formData)
            console.log(response);
            if (response.status === 201) {
           notify('profile updated','success')
                dispatch(setUser(response.data.user));
                setToggleEdit(false)
            }


        } catch (error) {
            console.log(error)
        }
    };

    return <div class="w-full md:w-2/3 mx-auto">
        <div class="flex flex-col p-5 rounded-lg shadow bg-white">
            
<h2 className="text-center">Update Profile</h2>


            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <input type="hidden" name="remember" value="true"></input>


                <div className="flex gap-x-2">
                    <div className="relative">

                        <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">name</label>
                        <input type="text" name="name" onChange={handleChange} className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-green-500" ></input>

                    </div>
                    <div className="relative">

                        <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">License Number</label>
                        <input type="text" name="license_plate_number" onChange={handleChange} className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-green-500"  ></input>


                    </div>
                </div>


                <div className="flex gap-x-2">
                    <div className="relative">
                        <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Payment Type</label>
                        <select name="payment_type" onChange={handleChange} className="w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-green-500">
                            <option disabled>Select Type Payment</option>
                            <option value="cash">Cash</option>
                            <option value="card">Card</option>
                        </select>

                    </div>

                    <div className="relative">

                        <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Discription</label>
                        <input type="text" name="description" onChange={handleChange} className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-green-500"  ></input>


                    </div>
                </div>

                <div>
                    <button type="submit" className="w-full flex justify-center bg-gradient-to-r from-green-600 to-green-600  hover:bg-green-to-l hover:from-green-600 hover:to-green-600 text-gray-100 p-4  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
                        Active
                    </button>
                </div>

            </form>
        </div>
    </div>;
};
export default DriverEditForm;