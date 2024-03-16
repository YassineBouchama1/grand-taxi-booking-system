"use client";
import React from "react";
import StatisticsCard from "./StatisticsCard.jsx";
import { useQuery } from "@tanstack/react-query";
import AdminApi from "@/services/AdminApi.js";
import Error from "../Error.jsx";



export default function StatisticGroup() {
    // fetching data from server
    const { data, isLoading, isSuccess, isError } = useQuery({
        // queryKey: ["usersList"],
        queryFn: async () => AdminApi.statics(),
    });

    if (isSuccess) {
        console.log(data.data.users)
        // dispatch(setLengthUser(data.length));
    }
    if (isError) {
        return <Error />;
    }

    
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4">
            <StatisticsCard Length={data?.data?.users} name='users' />
            <StatisticsCard Length={data?.data?.reservations} name='reservations' />
            {/* <StatisticsCard Length={categoriesNumber} /> */}
        </div>
    );
}

