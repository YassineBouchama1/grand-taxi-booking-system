'use client'



export default function Loader({shouldShow}) {
    return shouldShow ? (
        <div className="fixed right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2  z-50 bg-slate-400 w-full h-full flex justify-center">
            <div className="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-8 h-64 w-64 mt-80"></div>
        </div>

    ) : null;
}