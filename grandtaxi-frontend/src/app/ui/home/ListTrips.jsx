'use client'
import { axiosClient } from "@/services/axios";
import { useQuery } from "@tanstack/react-query";
import CardSearch from "./fromSearch/cardSearch";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import getTripsAction from "@/services/TripsAction";

const ListTrips = ({ trips }) => {






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
