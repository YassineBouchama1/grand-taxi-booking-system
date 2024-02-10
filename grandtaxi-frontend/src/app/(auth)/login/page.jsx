'use client'
import FormLogin from "@/app/ui/auth/login/FormLogin";
import Image from "next/image";
import Link from "next/link";


const Page = () => {
    return <div>

        <div className="relative min-h-screen flex ">
            <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
                <div style={{ backgroundImage: `url('/assets/auth/bg.jpg')` }} className="sm:w-1/2 xl:w-2/5 h-full hidden md:flex flex-auto items-center justify-start p-10 overflow-hidden text-white bg-no-repeat bg-cover relative">





                </div>
                <div className="md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full w-2/5 xl:w-2/5 p-8  md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-white ">
                    <div className="max-w-md w-full space-y-8">
                        <div className="text-center flex flex-col justify-center items-center">

                            <Image className="w-20 h-auto " src="/assets/logo.png" alt="traveklsmart" width='200' height='200' />
                            <h2 className="mt-6 text-3xl font-bold text-gray-900">
                                Welcome to TravelSmart!
                            </h2>
                            <p className="mt-2 text-sm text-gray-500">Sign in your Account</p>
                        </div>

                        <FormLogin/>
                    </div>
                </div>
            </div>
        </div>

    </div>;
};
export default Page;