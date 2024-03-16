'use client'
import { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { redirect, useRouter } from "next/navigation";
import NavBar from "../ui/shared/navbar/NavBar";
import BarBtns from "../ui/passenger/BarBtns";
import Image from "next/image";
import isAuth from "@/lib/isAuth";



const  Layout = ({ children }) =>{

    const user = useSelector((state) => state.auth.user)
    // const [isLoading, setLoading] = useState(true);

    // // const session = getSession

    // //waiting for check role
    // useLayoutEffect(() => {
    //     if (!user && user?.role_id !== 2) {
    //         setLoading(false);
    //         return redirect("/");
    //     }
    //     else {
    //         setLoading(false);
    //     }
    // }, []);



    // if (isLoading) {
    //     // rrender loader while checking authentication status
    //     return <h2>loading...</h2>;
    // }

    return (
        < >
            <NavBar />

            <section className="bg-white ">
                <h3 className="min-h-20 border-b-2 text-4xl flex items-center font-extrabold text-green-600 md:pl-6">My Prfile</h3>


                <div className="flex justify-center items-center px-4 gap-x-4  py-4  ">


                    <div className="flex justify-start items-center  gap-x-4  ">
                        {!(user) ? null : (
                            <div>
                                <Image class="w-10 h-10  border-green-500 border-2" src={user.profile_photo ? `http://127.0.0.1/${user.profile_photo}` : '/assets/avatar.jpg'} alt="Rounded avatar" width='40' height='40' />
                            </div>
                        )}
                        <div>
                            <p className="font-black">Email</p>
                            <p>{user?.email}</p>
                        </div>

                        <span className="w-[1px] min-h-[40px] bg-black text-black"></span>
                        <div>
                            <p className="font-black">Phone</p>
                            <p>{user?.contact_info ? user.contact_info : 'no information'}</p>
                        </div>


                    </div>
                </div>
            </section>
            <div className="bg-white h-screen border-t-2">
                <BarBtns />
            {children}

            </div>;
        </>
    );
}


export default isAuth(Layout,2);