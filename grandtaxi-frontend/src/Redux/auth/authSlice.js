
import { createSession } from "@/lib/session";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



const initialState = {
  role: '',
  token: typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null,
  email: '',
  status: '',
  user: typeof localStorage !== 'undefined' && localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  isLoading: false,
};


export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
   state.token = action.payload;
      // Save token to localStorage
      localStorage.setItem('token', action.payload);    },

      setUser: (state, action) => {
      state.user = action.payload;
      // Save user to localStorage
      localStorage.setItem('user', JSON.stringify(action.payload));
      // createSession(action.payload)
    },
          setDriver: (state, action) => {
      state.user = action.payload;
      // Save user to localStorage
      localStorage.setItem('driver', JSON.stringify(action.payload));
      // createSession(action.payload)
    },
  },

});

export const { setToken,setUser } = AuthSlice.actions;
export default AuthSlice.reducer;