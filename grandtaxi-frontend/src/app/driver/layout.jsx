'use client'
import { getSession } from "@/lib/session";
import NavBar from "../ui/shared/navbar/NavBar";
import { useSelector } from "react-redux";
import AlertActive from "../ui/driver/AlertActive/AlertActive";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function HomeLayout({ children }) {
    const user = useSelector((state) => state.auth.user);
    const route = useRouter();

    useEffect(() => {
        if (user && user.role_id !== 3) return route.push('/');
    }, []);

    return (
        <>
            <NavBar />
            {user && user.status === 'inactive' ? (
                <div className="bg-white w-full h-full flex items-center">
                    <AlertActive />
                </div>
            ) : (
                 <>
                        <section className="bg-white relative">
                            <h3 className="min-h-20 border-b-2 text-4xl flex items-center font-extrabold text-green-600 md:pl-6">My Prfile</h3>


                            <div className="flex justify-start items-center px-4 gap-x-4  py-4 ">
                                <Image src="/assets/avatar-icon.webp"className="h-20 w-20 rounded-full border-green-500 border-4" width='20' height='20' alt="avatar"/>

                                <div className="flex justify-start items-center  gap-x-4  ">


                                    {!(user && user.driver) ? null : (

                                        <div>
                                            <p className="font-black">description</p>
                                            <p>{user.driver.description}</p>
                                        </div>
                                    )}
                                    <span className="w-[1px] min-h-[40px] bg-black text-black"></span>

                                    <div>
                                        <p className="font-black">Email</p>
                                        <p>{user && user.email}</p>
                                    </div>

                                    {!(user && user.contact_info) ? null : (

                                        <div>
                                            <p className="font-black">Phone</p>
                                            <p>{user.contact_info}</p>
                                        </div>
                                    )}

                                    {!(user && user.driver) ? null : (

                                        <div>
                                            <p className="font-black">Vehicle Type</p>
                                            <p>{user.driver.vehicle_type}</p>
                                        </div>
                                    )}

                                </div>
                            </div>
                        </section>
                        {children}
                 </>
            )}
        </>
    );
}
