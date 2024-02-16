'use client'
import { axiosClient } from "@/services/axios";
import { useQuery } from "@tanstack/react-query";
import CardSearch from "./fromSearch/cardSearch";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const ListTrips = () => {




  const [trips, setTrips] = useState([]);
  const date = useSelector((state) => state.trip.date) ;
  const start = useSelector((state) => state.trip.start);
  const end = useSelector((state) => state.trip.end);
  const car = useSelector((state) => state.trip.car);

  const rating = useSelector((state) => state.trip.rating);
 
  const fetchData = async () => {
    let url = 'trips?t=null';

    if (date) {
      url += `&date=${date}`;

      if (start) {
        url += `&start=${start}`;
      }
      if (end) {
        url += `&end=${end}`;
      }
      if (car) {
        url += `&typeCar=${car}`;
      }
      if (rating) {
        url += `&rating=${rating}`;
      }
    }
    console.log(url)
    try {
      const response = await axiosClient.get(url);
      console.log(response)
 
      setTrips(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  useEffect(() => {
 

    fetchData();
  }, [car, rating ,date, start, end]);

  console.log(trips)
  return (
    <>
      {trips.map((trip, index) => (
        (trip.status === 'deleted' || trip.isFull || !trip.valid ) ? null : (
          <CardSearch key={index} trip={trip} />
        )
      ))}

    </>
  );
};

export default ListTrips;
