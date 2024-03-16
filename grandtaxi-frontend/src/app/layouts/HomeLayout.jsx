
'use client'
import { useState } from "react";
import FormLogin from "../ui/auth/login/FormLogin";
import NavBar from "../ui/shared/navbar/NavBar";
import ToggleableComponent from "../ui/shared/Modal";



export default function HomeLayout({ children }) {

    return (
<div className="">
            <NavBar />
                {children}
                

</div>
    );
}
