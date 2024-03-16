'use client'
import NavBar from "../ui/admin/NavBar";
import SideBar from "../ui/admin/SideBar";
import isAuth from "@/lib/isAuth";

const Layout = ({ children })=> {

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

export default isAuth(Layout,1);