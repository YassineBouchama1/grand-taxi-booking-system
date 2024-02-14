"use client";


import notify from "@/hooks/useNotifaction";
import AdminApi from "@/services/AdminApi";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

export default function UserCard({ user }) {
    // access client state
    const queryClient = useQueryClient();

    // this mutation for delete user
    const { mutateAsync:deleteUser } = useMutation({
        mutationFn: async () =>
            // function that edit user active
         await   AdminApi.deleteUser(user.id),
        onSuccess: async (data) => {
            console.log(data)
            console.log("succssfully");
            notify(`${user.name} Deleted`,'success')
            queryClient.invalidateQueries({ queryKey: ["usersList"] });
        },
    });

    //this for restore user
    const { mutate } = useMutation({
   
        mutationFn: async () =>
   
            await AdminApi.restoreUser(user.id),
       
        onSuccess: async (data) => {
            console.log(data)
            console.log("succssfully");
            notify(`${user.name} Restored`, 'success')
            queryClient.invalidateQueries({ queryKey: ["usersList"] });
        },
    });



    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th
                scope="row"
                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
            >
                <div className="ps-3">
                    <div className="text-base font-semibold">#{user.id && user.id}</div>
                    <div className="font-normal text-gray-500">
                        {user.email && user.email}
                    </div>
                </div>
            </th>
            <td className="px-6 py-4">{user.role_id === 3?'driver':'passenger'}</td>
            <td className="px-6 py-4">
                <div className="flex items-center">
                    {user.status === 'active' ? (
                        <>
                            <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
                            Online
                        </>
                    ) : (
                        <>
                            <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div>
                            Offline
                        </>
                    )}
                </div>
            </td>
            <td className="px-6 py-4 ">
                <div className="flex f  lex-col items-start">
                    {user.status === 'active' ? (<button
                        onClick={() => deleteUser()}
                        className="font-medium text-red-500 dark:text-red-500 hover:underline"
                    >
                        Remove
                    </button>) : (<button
                            onClick={() => mutate()}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                        Restore
                    </button>)}
                   
                </div>
            </td>
        </tr>
    );
}