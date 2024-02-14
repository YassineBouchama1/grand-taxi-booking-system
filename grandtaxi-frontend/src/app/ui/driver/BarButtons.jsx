'use client'
import Link from "next/link";
import Modal from "../shared/Modal";
import { useState } from "react";
import DriverEditForm from "./DriverEditForm";

const BarButtons = () => {

    const [toggleEdit, setToggleEdit] = useState(false)
    return <>
     <div class="w-full text-center mx-auto">
        <Link href='/driver'
            class="border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline">
            Driver
        </Link>
                    <Link href='driver/histories'
                        class="border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline">
                        Histories
                    </Link>
        <Link href='driver/create'
            class="border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline">
            Create
        </Link>
        <button onClick={() => setToggleEdit(!toggleEdit)} className="text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline bg-black  ">Edit Profile</button>   
                </div>
        <Modal
            shouldShow={toggleEdit}
            onRequestClose={() => setToggleEdit(false)}
        >
            <DriverEditForm setToggleEdit={setToggleEdit}/>
        </Modal>
                </>

  
  ;
};
export default BarButtons;