'use client'
import { axiosClient } from "@/services/axios";
import Image from "next/image";

import { useRouter } from 'next/navigation'
import { useState } from "react";


// import { login } from "@/lib/session";

const FormLogin = () => {
  

    const router = useRouter()


    const [formData, setFormData] = useState({

        email: '',
        password: '',
     
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


    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        console.log('clicked login')
        setCreatedMsg('')
        setErrorsMsg('')
        const newErrors = {};
        if (!formData.password?.trim()) {
            newErrors.password = 'password is required';
        }
   
        if (!formData.email?.trim()) {
            newErrors.email = 'Email is required';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
     


        try {
            // await axiosClient.post('/sanctum/csrf-cookie', formData);
            // const authResponse =  await axiosClient.post('/auth/login', formData);
          
            const response = await fetch("http://127.0.0.1:80/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })
        
            const authResponse = response.json()

      
            console.log(authResponse);
            if (authResponse.status === 201) {
                setCreatedMsg(authResponse.data.message)
                e.target.reset();
                //save all user info  and token to global state & localstorage

                dispatch(setUser((authResponse.data.data)));
                localStorage.setItem('token', authResponse.data.data.token)
          
             
                await fetch("api/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(authResponse.data.data),
                })
                setTimeout(() => router.refresh(),5000)
            }


        } catch (error) {
            console.log(error);

            // Check if error.authResponse exists and has data and errors properties
            if (error.authResponse && error.authResponse.data && error.authResponse.data.errors) {
                // Extract error messages from the authResponse
                const errorMessages = Object.values(error.authResponse.data.errors);
                setErrorsMsg(errorMessages);
            } else {
                // If the error structure is different or unknown, handle it accordingly
                setErrorsMsg(['An unexpected error occurred.']);
            }
        }
    };



    return <div className=" md:flex md:items-center md:justify-center sm:w-auto md:h-full    p-8   rounded-lg  bg-white ">
        <div className="max-w-md w-full space-y-8">
            <div className="text-center flex flex-col justify-center items-center">
                <Image className="w-20 h-auto " src="/assets/logo.png" alt="traveklsmart" width='200' height='200' />
                <h2 className="mt-6 text-3xl font-bold text-gray-900">
                    Welcome to TravelSmart!
                </h2>
                <p className="mt-2 text-sm text-gray-500">Sign in your Account</p>
            </div>

            {createdMsg && <p className="text-green-500">{createdMsg}</p>}

            {errorsMsg &&
                errorsMsg.map((error, index) => <p key={index} className="text-red-500">{error[0]}</p>)
            }

            <form className="mt-8 space-y-6" onSubmit={handleSubmitLogin}>
                <input type="hidden" name="remember" value="true"></input>
      

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
                        login
                    </button>
                </div>
                <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
                    <span>Do You have an account?</span>
                    {/* <Link  className="text-green-600 hover:text-green-600 no-underline hover:underline cursor-pointer transition ease-in duration-300">
                        Sign up</Link> */}
                </p>
            </form>
        </div>
    </div>
};
export default FormLogin;