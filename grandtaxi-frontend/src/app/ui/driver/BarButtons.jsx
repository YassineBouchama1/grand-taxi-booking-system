'use client'
import Link from "next/link";

const BarButtons = () => {
    return  <div class="w-full text-center mx-auto">
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
                
                </div>
        

  
  ;
};
export default BarButtons;