import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth/authSlice'
import tripSlice from './trip/tripSlice'

export const store = configureStore({
  reducer: {
    auth:authSlice,
    trip:tripSlice
  },
})
