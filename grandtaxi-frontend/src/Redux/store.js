import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth/authSlice'
import tripSlice from './trip/tripSlice'
import globalSlice from './global/globalSlice'

export const store = configureStore({
  reducer: {
    auth:authSlice,
    trip:tripSlice,
    global:globalSlice
  },
})
