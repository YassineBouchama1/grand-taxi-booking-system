'use client'
import { FiLogOut } from "react-icons/fi";

import Image from "next/image";
import { FaArrowRightToBracket } from "react-icons/fa6";
import Modal from "../Modal";
import { useState } from "react";
import FormLogin from "../../auth/login/FormLogin";
import FormRegister from "../../auth/register/FormRegister";
import { useSelector } from "react-redux";
import Link from "next/link";
import NavBarHook from "./NavBarHook";

const NavBar = () => {
    const [toggleLogin, setToggleLogin] = useState(false)
    const [toggleRegister, setToggleRegister] = useState(false)
    const user = useSelector((state) => state.auth.user)
    const token = useSelector((state) => state.auth.token)
  
   const {onLogOutBtn} = NavBarHook()
    
    return <>
        <nav className=" bg-white border-gray-200 py-2 dark:bg-gray-900 shadow-b  shadow-lg">
            <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
                <ul className="flex  justify-between flex-row space-x-8 ">
                    <li><i className="fa-solid fa-phone text-green-600"></i>
                        <a>+212638790915</a>
                        {user ?'passenger':'login'}
                    </li>

                </ul>
             
                {user ? <div className="flex flex-col justify-center items-center">{user.email} 
                    <button onClick={() => onLogOutBtn()} className="flex items-center"><FiLogOut /></button> </div>:
                (

                    <ul className=" flex justify-between gap-4 border border-solid border-gray-500 border-opacity-25 px-1.5 py-1    rounded-md	">

                    <li className="flex items-center gap-1">

                        
                        <FaArrowRightToBracket size={15} className=" text-green-600" />

                            
                        <button onClick={() => setToggleLogin(!toggleLogin)}>Sign in</button>
                        <Modal
                            shouldShow={toggleLogin}
                            onRequestClose={() => setToggleLogin(false)}
                            >
                            <FormLogin 
                                        setToggleLogin={setToggleLogin}

                            />
                        </Modal>
                    </li>
                    /
                    <li className="flex items-center gap-1">

                        <FaArrowRightToBracket size={15} className=" text-green-600" />

                        <button onClick={() => setToggleRegister(!toggleRegister)}>Sign up</button>
<Modal
                            shouldShow={toggleRegister}
                            onRequestClose={() => setToggleRegister(false)}
>
   <FormRegister/>
</Modal>

                    </li>
                </ul>
            )}
            </div>
        </nav>
        <nav className="border-b-2 relative lg:static bg-white border-gray-200 py-2  shadow-b shadow-lg">
                <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
                    <a href="./" className="flex items-center">

                        <Image src={'/assets/logo.png'} width='120' height='120' alt="j" />

                    </a>
                    <div className="flex items-center lg:order-2">
                        <div className="hidden mt-2 mr-4 sm:inline-block">
                            <span></span>
                        </div>
                    {user && user.role_id && user.role_id !== 1 ? (
                        <Link href={user.role_id === 2 ? '/passenger' : '/driver'} className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0">
                            Profile{user.role_id}
                        </Link>
                    ) : null}

                      
         
                    </div>
                    <div className="absolute lg:static top-16 left-0 right-0 bg-white  items-center justify-between w-full lg:flex lg:w-auto lg:order-1 hidden " id="mobile-menu-2">
                        <Link href="/" className="block py-2 pl-3 pr-4 text-white bg-green-700 rounded lg:bg-transparent lg:text-green-700 lg:p-0 dark:text-white" aria-current="page">Home</Link>
                    </div>
                </div>
            </nav></>




  

};
export default NavBar;