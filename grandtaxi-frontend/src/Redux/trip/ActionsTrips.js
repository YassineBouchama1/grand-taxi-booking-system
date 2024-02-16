import TripApi from "@/services/TripApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllTrips = createAsyncThunk("files/getAll", async () => {
  try {
    const response = await TripApi.forAlll();

    return response.data;
  } catch (error) {
    return error.response;
  }
});