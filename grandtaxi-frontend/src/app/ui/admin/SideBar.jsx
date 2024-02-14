"use client";
import { usePathname } from "next/navigation";

import Link from "next/link";

import { useSelector } from "react-redux";

export default function SideBar() {
    const pathname = usePathname();
    const toggleNavBar = useSelector((state) => state.global.toggleNavBar);
    return (
        <aside
            id="logo-sidebar"
            className={`fixed ${toggleNavBar ? "left-0" : "left-[-100%]"
                } md:left-0 top-0 z-40 
     w-64 h-screen pt-20 transition-right duration-300 ease-in-out
      bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800
       dark:border-gray-700`}
            aria-label="Sidebar"
        >
            <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800  ">
                <ul className="space-y-2 font-medium">
                    <li>
                        <Link
                            href="/admin"
                            className={`${pathname.endsWith("/admin") ? "bg-gray-100" : "none"
                                } flex items-center p-2 text-gray-900 rounded-lg
               dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700`}
                        >
                            <svg
                                aria-hidden="true"
                                className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                            </svg>
                            <span className="ml-3">Dashboard</span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/admin/reservation"
                            className={`${pathname.endsWith("/reservation") ? "bg-gray-100" : "none"
                                } flex items-center p-2 text-gray-900 rounded-lg
               dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700`}
                        >
                            <svg
                                aria-hidden="true"
                                className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                                <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                            </svg>
                            <span className="flex-1 ml-3 whitespace-nowrap">reservation</span>
                            <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                                3
                            </span>
                        </Link>
                    </li>

                </ul>
            </div>
        </aside>
    );
}