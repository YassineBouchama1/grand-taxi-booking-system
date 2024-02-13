'use client'
import { setUser } from "@/Redux/auth/authSlice";
import DriverApi from "@/services/DriverApi";

import { useState } from "react";
import { useDispatch } from "react-redux";
const AlertActive = (setToggleLogin) => {

    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        description: '',
        license_plate_number: '',
        vehicle_type: '',
    });
    const [errors, setErrors] = useState({});
    const [createdMsg, setCreatedMsg] = useState('');
    const [errorsMsg, setErrorsMsg] = useState([]);


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
        if (!formData.description?.trim()) {
            newErrors.description = 'description is required';
        }
        if (!formData.license_plate_number?.trim()) {
            newErrors.license_plate_number = 'Phone is required';
        }
        if (!formData.vehicle_type?.trim()) {
            newErrors.vehicle_type = 'vehicle_type is required';
        }
        // if (!formData.payment_type) {
        //     newErrors.payment_type = 'payment_type is required';
        // }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            // await axiosClient.get('/sanctum/csrf-cookie');
            // dispatch(setUser({ 'name': 'hole' }));
            const response = await DriverApi.create(formData)
            console.log(response);
            if (response.status === 201) {
                setCreatedMsg(response.data.message)
              
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



    return <div class="w-full md:w-2/3 mx-auto">
        <div class="flex flex-col p-5 rounded-lg shadow bg-white">
            <div class="flex flex-col items-center text-center">
                <div class="inline-block p-4 bg-yellow-50 rounded-full">
                    <svg class="w-12 h-12 fill-current text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z" /></svg>
                </div>
                <h2 class="mt-2 font-semibold text-gray-800">Warning Alert Title With Large Icon and Action</h2>
            </div>

            {createdMsg && <p className="text-green-500">{createdMsg}</p>}

            {errorsMsg &&
                errorsMsg.map((error, index) => <p key={index} className="text-red-500">{error[0]}</p>)
            }

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <input type="hidden" name="remember" value="true"></input>

            
                <div className="flex gap-x-2">
                    <div className="relative">

                        <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Vehicle Type</label>
                        <input type="text" name="vehicle_type" value={formData.vehicle_type} onChange={handleChange} className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-green-500" ></input>
                        {errors.name && <span className="text-red-500">{errors.vehicle_type}</span>}
                    </div>
                    <div className="relative">

                        <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">License Number</label>
                        <input type="text" name="license_plate_number" value={formData.license_plate_number} onChange={handleChange} className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-green-500"  ></input>
                        {errors.license_plate_number && <span className="text-red-500">{errors.license_plate_number}</span>}

                    </div>
                </div>


                <div className="flex gap-x-2">
                    <div className="relative">
                        <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Payment Type</label>
                        <select onChange={handleChange} name="payment_type" className="w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-green-500">
                            <option disabled>Select Type Payment</option>
                            <option value="cash">Cash</option>
                            <option value="card">Card</option>
                        </select>
                        {errors.payment_type && <span className="text-red-500">{errors.payment_type}</span>}
                    </div>

                    <div className="relative">

                        <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Discription</label>
                        <input type="text" name="description" value={formData.description} onChange={handleChange} className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-green-500"  ></input>
                        {errors.description && <span className="text-red-500">{errors.description}</span>}

                    </div>
                </div>

                <div>
                    <button type="submit" className="w-full flex justify-center bg-gradient-to-r from-green-600 to-green-600  hover:bg-green-to-l hover:from-green-600 hover:to-green-600 text-gray-100 p-4  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
                        Active
                    </button>
                </div>
                
            </form>
        </div>
    </div>
};
export default AlertActive;