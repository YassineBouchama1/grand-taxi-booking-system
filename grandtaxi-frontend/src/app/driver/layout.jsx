
'use client'
import { getSession } from "@/lib/session";
import NavBar from "../ui/shared/navbar/NavBar";
import { useSelector } from "react-redux";
import AlertActive from "../ui/driver/AlertActive/alertActive";



export default  function HomeLayout({ children }) {
    const user = useSelector((state) => state.auth.user)


    return (
        < >
            <NavBar />
            {(user && user.status === 'inactive') ? 
            <div className="bg-white w-full h-full flex items-center">
                <AlertActive/></div>:
                ({ children })
            }
            
           


        </>
    );
}
