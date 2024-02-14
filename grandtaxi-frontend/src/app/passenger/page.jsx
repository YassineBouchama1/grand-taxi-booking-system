'use client'
import { useLayoutEffect } from "react";
import Reservations from "../ui/passenger/Reservations";
import { useSelector } from "react-redux";
import { redirect, useRouter } from "next/navigation";
import { getSession } from "@/lib/sessionClient";

const Page = () => {
    const user = useSelector((state) => state.auth.user)
const router = useRouter()
    // const session = getSession
useLayoutEffect(()=>{

    if (user?.role_id !== 2) return redirect('/')

},[])
  return <>
      <section className="bg-white ">
          <h3 className="min-h-20 border-b-2 text-4xl flex items-center font-extrabold text-green-600 md:pl-6">My Prfile</h3>


          <div className="flex justify-start items-center px-4 gap-x-4  py-4 ">
              <div className="h-20 w-20 rounded-full border-green-500 border-4"></div>

              <div className="flex justify-start items-center  gap-x-4  ">
                  <div>
                      <p className="font-black">Email</p>
                      <p>yassine@gmail.com</p>
                  </div>

                  <span className="w-[1px] min-h-[40px] bg-black text-black"></span>
                  <div>
                      <p className="font-black">Phone</p>
                      <p>0638790915</p>
                  </div>


              </div>
          </div>
      </section>
  <div className="bg-white h-screen border-t-2">

      <Reservations/>
  </div>;
  </>
};
export default Page;