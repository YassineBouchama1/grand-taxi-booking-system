'use client'
import { Suspense, useEffect, useLayoutEffect } from "react";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import TripTableHistoies from "@/app/ui/driver/Trip/TripTableHistoies";

const Page = () => {
    const user = useSelector((state) => state.auth.user)
    const router = useRouter()
    // const session = getSession
    useEffect(() => {

        if (user && user?.role_id !== 3) return router.push('/')

    }, [])
    return <>

        <div className="bg-white h-screen border-t-2">
            

                <TripTableHistoies />
     

        </div>;
    </>
};
export default Page;