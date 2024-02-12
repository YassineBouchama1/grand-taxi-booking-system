'use client'
import { useLayoutEffect } from "react";
import Reservations from "../ui/passenger/Reservations";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { getSession } from "@/lib/sessionClient";

const Page = () => {
    const user = useSelector((state) => state.auth.user)
const router = useRouter()
    // const session = getSession
useLayoutEffect(()=>{

    if (user?.role_id !== 2) return router.push('/')

},[])
  return <div className="bg-white h-screen border-t-2">

      <Reservations/>
  </div>;
};
export default Page;