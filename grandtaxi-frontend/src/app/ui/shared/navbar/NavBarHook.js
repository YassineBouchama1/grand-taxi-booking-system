'use client'

import { setToken, setUser } from "@/Redux/auth/authSlice";
import { logoutCookies } from "@/lib/session";
import { logout } from "@/lib/sessionClient";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const NavBarHook = () => {
const dispatch = useDispatch()
const  router = useRouter()


const onLogOutBtn = ()=>{
logout()
// console.log(logoutCookies())
dispatch(setUser(null))
dispatch(setToken(null))
router.push('/')
}


  return {onLogOutBtn}
};
export default NavBarHook;