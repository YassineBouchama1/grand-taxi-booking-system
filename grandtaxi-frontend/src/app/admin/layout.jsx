'use client'
import { useSelector } from "react-redux";
import NavBar from "../ui/admin/NavBar";
import SideBar from "../ui/admin/SideBar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default  function AdminLayout({ children }) {
  const session = true;

  const userStatus = useSelector((state) => state.auth.user);
  const route = useRouter();

  useEffect(() => {
    if (!userStatus && userStatus?.role_id !== 1) return route.push('/');
  }, []);


  return (
    <main className="flex">
      <NavBar />
      <SideBar />
      <div className=" md:ml-64 bg-gray-100  w-full h-full min-h-screen pt-20 p-5">
        {children}
      </div>
    </main>
  );
}