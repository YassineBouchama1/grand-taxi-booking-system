'use client'
import { setUser } from "@/Redux/auth/authSlice";
import { axiosClient } from "@/services/axios";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";

const FormRegister = ({ setToggleLogin }) => { // Added curly braces around setToggleLogin

    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: '',
        contact_info: '',
        email: '',
        password: '',
        role_id: ''
    });

    const [errors, setErrors] = useState({});
    const [createdMsg, setCreatedMsg] = useState('');
    const [errorsMsg, setErrorsMsg] = useState([]);
    const [image, setImage] = useState(null); // Added state for image

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCreatedMsg('');
        setErrorsMsg('');

        const newErrors = {};
        if (!formData.name?.trim()) {
            newErrors.name = 'Name is required';
        }
        if (!formData.contact_info?.trim()) {
            newErrors.contact_info = 'Phone is required';
        }
        if (!formData.email?.trim()) {
            newErrors.email = 'Email is required';
        }
        if (!formData.password?.trim()) {
            newErrors.password = 'Password is required';
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const formDataWithImage = new FormData();
            formDataWithImage.append('profile_photo', image); // Append image to form data

            // Append other form data fields
            Object.entries(formData).forEach(([key, value]) => {
                formDataWithImage.append(key, value);
            });

            const response = await axiosClient.post('/auth/register', formDataWithImage);
            if (response.status === 201) {
                setCreatedMsg(response.data.message);
                e.target.reset();
                setToggleLogin(false);
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                const errorMessages = Object.values(error.response.data.errors);
                setErrorsMsg(errorMessages);
            } else {
                setErrorsMsg(['An unexpected error occurred.']);
            }
        }
    };

    return (
        <div className="md:flex md:items-center md:justify-center sm:w-auto md:h-full p-8 rounded-lg bg-white">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center flex flex-col justify-center items-center">
                    <Image className="w-20 h-auto" src="/assets/logo.png" alt="travel smart" width={200} height={200} />
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">
                        Welcome to TravelSmart!
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">Sign in to your Account</p>
                </div>

                {createdMsg && <p className="text-green-500">{createdMsg}</p>}

                {errorsMsg &&
                    errorsMsg.map((error, index) => <p key={index} className="text-red-500">{error}</p>)
                }

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <input type="hidden" name="remember" value="true"></input>
                    <div className="flex justify-center gap-x-4">
                        <Image className="w-10 h-10 border-green-500 border-2" src={'/assets/avatar.jpg'} alt="Rounded avatar" width={40} height={40} />
                        <input type="file" name="profile_photo" onChange={(e) => setImage(e.target.files[0])} />
                    </div>
                <label>
                    <div className="flex items-center mb-4">
                        <input
                           
                            type="radio"
                            value="2"
                            name="role_id"
                            onChange={handleChange} 
                            defaultChecked
                            className="w-4 h-4 text-blue-600  focus:ring-blue-500 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
                        ></input>
                        <label
                            htmlFor="Passenger"
                            className="ms-2 text-sm font-medium text-gray-300 "
                        >
                            Passenger
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                       
                            type="radio"
                            value="3"
                            name="role_id"
                            onChange={handleChange} 
                            className="w-4 h-4 text-blue-600  focus:ring-blue-500 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
                        ></input>
                        <label
                            htmlFor="driver"
                            className="ms-2 text-sm font-medium text-gray-300"
                        >
                            driver
                        </label>
                        </div>
                </label>
                <div className="flex gap-x-2">
                    <div className="relative">

                        <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-green-500" ></input>
                        {errors.name && <span className="text-red-500">{errors.name}</span>}
                    </div>
                    <div className="relative">

                        <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Phone</label>
                        <input type="text" name="contact_info" value={formData.contact_info} onChange={handleChange} className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-green-500"  ></input>
                        {errors.phone && <span className="text-red-500">{errors.phone}</span>}

                    </div>
                </div>

                <div className="relative">
                    <div className="absolute right-3 mt-4"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    </div>
                    <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Email</label>
                    <input type="text" name="email" value={formData.email} onChange={handleChange} className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-green-500"  ></input>
                    {errors.email && <span className="text-red-500">{errors.email}</span>}

                </div>
                <div className="mt-8 content-center">
                    <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">
                        Password
                    </label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full content-center text-base px-4 py-2 border-b rounded-2xl border-gray-300 focus:outline-none focus:border-green-500"  ></input>
                    {errors.password && <span className="text-red-500">{errors.password}</span>}

                </div>

                <div>
                    <button type="submit" className="w-full flex justify-center bg-gradient-to-r from-green-600 to-green-600  hover:bg-green-to-l hover:from-green-600 hover:to-green-600 text-gray-100 p-4  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
                        Sign up
                    </button>
                </div>
                <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
                    <span>Do You have an account?</span>
                    <Link href="login" className="text-green-600 hover:text-green-600 no-underline hover:underline cursor-pointer transition ease-in duration-300">
                        Login</Link>
                </p>
            </form>
        </div>
    </div>
    )
};
export default FormRegister;