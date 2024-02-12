
import { createSlice, PayloadAction } from "@reduxjs/toolkit";




const initialState= {
  role:'',
  token:localStorage.getItem('token')?localStorage.getItem('token'):null,
  email:'',
  status:'',
  user: null,

  isloading: false,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },

});

export const { setUser } = AuthSlice.actions;
export default AuthSlice.reducer;