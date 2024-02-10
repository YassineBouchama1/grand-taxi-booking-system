'use client'
import Link from "next/link";
const FormRegister = () => {
    return <form className="mt-8 space-y-6" action="#" method="POST">
        <input type="hidden" name="remember" value="true"></input>
        <div className="flex gap-x-2">
            <div className="relative">

                <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Name</label>
                <input className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-green-500" type="" placeholder="Yassine Bouchama" value=""></input>
            </div>
            <div className="relative">

                <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Phone</label>
                <input className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-green-500" type="" placeholder="0638790915" value=""></input>
            </div>
        </div>

        <div className="relative">
            <div className="absolute right-3 mt-4"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            </div>
            <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Email</label>
            <input className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-green-500" type="" placeholder="mail@gmail.com" value=""></input>

        </div>
        <div className="mt-8 content-center">
            <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">
                Password
            </label>
            <input className="w-full content-center text-base px-4 py-2 border-b rounded-2xl border-gray-300 focus:outline-none focus:border-green-500" type="" placeholder="Enter your password" value=""></input>
        </div>

        <div>
            <button type="submit" className="w-full flex justify-center bg-gradient-to-r from-green-600 to-green-600  hover:bg-green-to-l hover:from-green-600 hover:to-green-600 text-gray-100 p-4  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
                Sign in
            </button>
        </div>
        <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
            <span>Do You have an account?</span>
            <Link href="login" className="text-green-600 hover:text-green-600 no-underline hover:underline cursor-pointer transition ease-in duration-300">
                Login</Link>
        </p>
    </form>;
};
export default FormRegister;