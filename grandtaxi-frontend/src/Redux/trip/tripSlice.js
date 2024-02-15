
import { createSlice, PayloadAction } from "@reduxjs/toolkit";




const initialState= {
 
  list:'',
  start:null,
  end:null,
  rating:null,
  date:null,
  typeCar:null,
  


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
            console.log(action.payload)
      state.date = action.payload?.date;
      state.start = action.payload?.start;
      state.end = action.payload?.end;
      state.typeCar = action.payload?.typeCar;
      state.rating = action.payload?.rating;
    },
  },

});

export const { setTrips ,setQuery} = TripSLice.actions;
export default TripSLice.reducer;