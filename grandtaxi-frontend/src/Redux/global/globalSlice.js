import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {
  whichForm: true, // if true so register from appear if false login from appear
  isloading: false,
  toggleNavBar: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setWhichForm: (state, action) => {
      state.whichForm = action.payload;
    },
    setToggleNavbar: (state, action) => {
      state.toggleNavBar = action.payload;
    },
  },
});

export const { setWhichForm,setToggleNavbar } = globalSlice.actions;
export default globalSlice.reducer;