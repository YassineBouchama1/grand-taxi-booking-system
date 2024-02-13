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

                      
                        <button id="mobile-menu-toggle" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 " aria-controls="mobile-menu-2" aria-expanded="true">

                            <span className="sr-only">Open main menu</span>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                            </svg>
                            <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="absolute lg:static top-16 left-0 right-0 bg-white  items-center justify-between w-full lg:flex lg:w-auto lg:order-1 hidden " id="mobile-menu-2">
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <a href="./" className="block py-2 pl-3 pr-4 text-white bg-green-700 rounded lg:bg-transparent lg:text-green-700 lg:p-0 dark:text-white" aria-current="page">Home</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 ">About</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 ">FAQs</a>
                            </li>

                            <li>
                                <a href="#" className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 ">Contact</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav></>




  

};
export default NavBar;