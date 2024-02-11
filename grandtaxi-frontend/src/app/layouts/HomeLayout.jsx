
'use client'
import { useState } from "react";
import FormLogin from "../ui/auth/login/FormLogin";
import NavBar from "../ui/shared/navbar/NavBar";
import ToggleableComponent from "../ui/shared/Modal";



export default function HomeLayout({ children }) {

    const [toggle,setToggle]=useState(false);
    return (
<div className="">
            <NavBar />
                {children}
                
{/* 
            {toggle &&
                <div className="absolute  top-0 left-0 right-0  flex justify-center items-center shadow-2 bg-gray-200/50 z-[999]  w-full">

                    <FormLogin/>
            </div>
            }  */}
</div>
    );
}
