'use client'
import NavBar from "../ui/shared/navbar/NavBar";
import { useSelector } from "react-redux";
import AlertActive from "../ui/driver/AlertActive/AlertActive";
import { useEffect, useLayoutEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";
import BarButtons from "../ui/driver/BarButtons";
import DriverApi from "@/services/DriverApi";
import Loader from "../ui/shared/Loader";

import isAuth from "@/lib/isAuth";


const  Layout = ({ children }) =>{
    const userStatus = useSelector((state) => state.auth.user);
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [toggleLoader, setToggleLoader] = useState(true)



// fetch  data user
    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await DriverApi.show()
            setUser(response.data.user);
                    setLoading(false)

            
     console.log(response.data.user)
        } catch (error) {
                                setLoading(false)

            console.error("Error fetching data:", error);
            setToggleLoader(false)
        }
    };
    useEffect(() => {


        fetchData();
      
    }, [userStatus]);


    return (
        <>
           {loading?<div>Loading...</div>:<NavBar user={user}/>} 
            {toggleLoader && <Loader />}
            {userStatus && userStatus.status === 'inactive' ? (
                <div className="bg-white w-full h-full flex items-center">
                    <AlertActive />
                </div>
            ) : (
                 <>
                        <section className="bg-white relative">
                            <h3 className="min-h-20 border-b-2 text-4xl flex items-center font-extrabold text-green-600 md:pl-6">My Prfile</h3>


                            <div className=" flex justify-center items-center px-4 gap-x-4  py-4 ">

                                <div className="flex justify-start items-center  gap-x-4   ">
                                    {!(user ) ? null : (
                                    <div>
                                            <Image class="w-10 h-10  border-green-500 border-2" src={user.profile_photo ? `http://127.0.0.1/${user.profile_photo}` : '/assets/avatar.jpg'}  alt="Rounded avatar" width='40' height='40' />
                                    </div>
                                    )}
                                    <span className="w-[1px] min-h-[40px] bg-black text-black"></span>
{!(user && user.driver) ? null : (

                                        <><div>
                                            <p className="font-black">description</p>
                                            <p>{user.driver.description}</p>
                                        </div><div>
                                                <p className="font-black">Email</p>
                                                <p>{user && user.email}</p>
                                            </div><div>
                                                <p className="font-black">Phone</p>
                                                <p>{user.contact_info}</p>
                                            </div><div>
                                                <p className="font-black">Vehicle Type</p>
                                                <p>{user.driver.vehicle_type}</p>
                                            </div><div>
                                                <p className="font-black">Raiting</p>
                                                <p>{user.driver.rating}</p>
                                            </div></>
                                  
  )}
                                </div>


                            
                            </div>

                            <BarButtons/>
                           
                        </section>
                        {children}
                 </>
            )}
        </>
    );
}
export default isAuth(Layout,3);