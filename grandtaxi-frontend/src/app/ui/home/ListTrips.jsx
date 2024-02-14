'use client'
import { axiosClient } from "@/services/axios";
import { useQuery } from "@tanstack/react-query";
import CardSearch from "./fromSearch/cardSearch";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const ListTrips = () => {
  const params = useSearchParams();
  const [trips, setTrips] = useState([]);
  const date = useSelector((state) => state.trip.date) ;
  const start = useSelector((state) => state.trip.start);
  const end = useSelector((state) => state.trip.end);
  const typeCar = useSelector((state) => state.trip.typeCar);
  const car = 'BMW'
  const rating = 5 

  useEffect(() => {
    const fetchData = async () => {
      let url = 'trips';
      if (date) {
        url += `?date=${date}`;
        if (start) {
          url += `&start=${start}`;
        }
        if (end) {
          url += `&end=${end}`;
        }
        if (typeCar) {
          url += `&end=${end}`;
        }
      }

      try {
        const response = await axiosClient.get(url);
        setTrips(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [date, start, end]);

  console.log(trips)
  return (
    <>
      {trips.map((trip, index) => (
        (trip.isFull && trip.car != car ) ? null : (
          <CardSearch key={index} trip={trip} />
        )
      ))}

    </>
  );
};

export default ListTrips;
