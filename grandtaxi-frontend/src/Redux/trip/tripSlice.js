import { createSlice } from "@reduxjs/toolkit";

const initialState= {
  list:[],
  start:null,
  car:null,
  end:null,
  rating:null,
  date:null,
  isloading: false,
};

export const TripSLice = createSlice({
  name: "trip",
  initialState,
  reducers: {
    setTrips: (state, action) => {
      state.list = action.payload;
    },
    setQuery: (state, action) => {
     

      // Update other state properties as needed
      if (action.payload) {
        state.date = action.payload.date !== null ? action.payload.date : state.date;
        state.car = action.payload.car !== null ? action.payload.car : state.car;
        state.start = action.payload.start !== null ? action.payload.start : state.start;
        state.end = action.payload.end !== null ? action.payload.end : state.end;
        state.rating = action.payload.rating !== null ? action.payload.rating : state.rating;
            state.isloading = !state.isloading;
      }

      
    },
    setCar: (state, action) => {
      state.car = action.payload;
    },
    setRating: (state, action) => {
      state.rating = action.payload;
    },
    setTrips: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setTrips, setQuery, setCar, setRating } = TripSLice.actions;
export default TripSLice.reducer;
