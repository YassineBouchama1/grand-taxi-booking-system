import Image from "next/image";
import Link from "next/link";

const FormLogin = () => {
    return       <div className=" md:flex md:items-center md:justify-center sm:w-auto md:h-full    p-8   rounded-lg  bg-white ">
                    <div className="max-w-md w-full space-y-8">
                        <div className="text-center flex flex-col justify-center items-center">
          
                            <Image className="w-20 h-auto " src="/assets/logo.png" alt="traveklsmart" width='200' height='200' />
                            <h2 className="mt-6 text-3xl font-bold text-gray-900">
                                Welcome to TravelSmart!
                            </h2>
                            <p className="mt-2 text-sm text-gray-500">Sign in your Account</p>
                        </div>

                    
             
    <form className="mt-8 space-y-6" action="#" method="POST">
        <input type="hidden" name="remember" value="true"></input>


        <div className="relative">
            <div className="absolute right-3 mt-4"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            </div>
            <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Email</label>
            <input className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-green-500" type="text" placeholder="mail@gmail.com" ></input>

        </div>
        <div className="mt-8 content-center">
            <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">
                Password
            </label>
            <input className="w-full content-center text-base px-4 py-2 border-b rounded-2xl border-gray-300 focus:outline-none focus:border-green-500" type="password" placeholder="Enter your password" ></input>
        </div>

        <div>
            <button type="submit" className="w-full flex justify-center bg-gradient-to-r from-green-600 to-green-600  hover:bg-green-to-l hover:from-green-600 hover:to-green-600 text-gray-100 p-4  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
                Sign in
            </button>
        </div>
        <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
            <span>Don't have an account?</span>
            <Link href="login" className="text-green-600 hover:text-green-600 no-underline hover:underline cursor-pointer transition ease-in duration-300">
                Register</Link>
        </p>
    </form>
        </div>
    </div>
};
export default FormLogin;