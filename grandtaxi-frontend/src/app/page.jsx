
import Image from "next/image";
import FromSearch from "./ui/home/fromSearch/fromSearch";

import HomeLayout from "./layouts/HomeLayout";
import { getSession } from "@/lib/session";




export default async function Home() {

    const session = await getSession()
    return (
      <HomeLayout>
            {session && session}
             <main className=" w-full lg:h-[450px] h-[550px] bg-white">

            <section className='flex  items-center justify-start pt-10 lg:justify-between flex-col lg:flex-row  max-w-screen-xl h-full gap-6 px-4 mx-auto '>
                <div className='flex flex-col items-center lg:items-start justify-between gap-10'>
                    <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl '>Get Your Ticket Online,<br></br> Easy and Safely</h2>
                        <a href="" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">BUY
                            TICKETS</a>
                </div>

                <div className=' w-full lg:w-auto'>
                    <p className="text-xs italic text-red-500 text-center" id="error_msg"></p>

                    <h3 className='font-bold text-gray-500 text-center lg:text-left'>Choose Your Ticket</h3>
                    <FromSearch/>
                </div>

            </section>



                <section className="bg-cover bg-center relative w-full h-[20%]">
                <Image
                    src="/assets/bg1.png"
                    alt="bg"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    />
                <img
                    id="bus_img"
                    src="/assets/bus.png"
                    alt="bus"
                    className="absolute w-[100px] h-auto bottom-0 right-0 z-30"
                    />
            </section>






        </main>
       
                    </HomeLayout>

    );
}
