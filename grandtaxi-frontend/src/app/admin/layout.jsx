import NavBar from "../ui/admin/NavBar";
import SideBar from "../ui/admin/SideBar";


export default async function AdminLayout({ children }) {
  const session = true;


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