'use client'

import { useState } from "react";


export default function Modal({ shouldShow, onRequestClose , children}) {
    return  shouldShow ? (
        <div onClick={onRequestClose} className=" z-[999] absolute top-0 left-0 right-0 h-full w-full flex justify-center items-center shadow-2 bg-gray-200/50 ">

            <div onClick={e => e.stopPropagation()} className="">

            { children }
</div>
            </div>
        
    ):null;
}