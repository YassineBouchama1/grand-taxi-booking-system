
'use client'
import { axiosClient } from "./axios"

const TripApi = {
  create: async (payload) => {
    return await axiosClient.post('/trips/parents', payload)
  },
  all: async () => {
    return await axiosClient.get('/trips')
  },
}
export default TripApi