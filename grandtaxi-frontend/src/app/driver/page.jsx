'use client'
import { Suspense, useEffect, useLayoutEffect } from "react";
import Reservations from "../ui/passenger/Reservations";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { getSession } from "@/lib/sessionClient";
import TripTable from "../ui/driver/Trip/TripTable";

const Page = () => {
    const user = useSelector((state) => state.auth.user)
const router = useRouter()
    // const session = getSession
useEffect(()=>{

    if (user && user?.role_id !== 3) return router.push('/')

},[])
  return <>

  <div className="bg-white h-screen border-t-2">
          <Suspense fallback={<p>Loading</p>}>

<TripTable/>
          </Suspense>
    
  </div>;
  </>
};
export default Page;