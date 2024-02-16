
import { createSlice, PayloadAction } from "@reduxjs/toolkit";




const initialState= {
 
  list:'',
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
        
      state.date = action.payload?.date;
      state.car = action.payload?.car;
      state.start = action.payload?.start;
      state.end = action.payload?.end;

      state.rating = action.payload?.rating;
    },
        setCar: (state, action) => {
          console.log('car Redux',action.payload)
      state.car = action.payload;
    },
        setRating: (state, action) => {
          console.log('rating redux',action.payload)
      state.rating = action.payload;
    },
    
  },

});

export const { setTrips ,setQuery,setCar,setRating} = TripSLice.actions;
export default TripSLice.reducer;