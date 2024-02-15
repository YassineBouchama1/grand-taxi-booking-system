'use client'
import Link from "next/link";



const BarBtns = () => {

    return <>
        <div class="w-full text-center mx-auto py-10">
            <Link href='/passenger'
                class="border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline">
                Reservations
            </Link>
            <Link href='passenger/favorite'
                class="border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline">
                Favorite
            </Link>
           
        </div>

    </>


        ;
};
export default BarBtns;