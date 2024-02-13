
'use client'
import { axiosClient } from "./axios"

const TripApi = {
  create: async (payload) => {
    return await axiosClient.post('/trips/create', payload)
  },
    delete: async (id) => {
    return await axiosClient.delete(`/trips/destroy/${id}`)
  },
  all: async () => {
    return await axiosClient.get('/trips/my')
  },
}
export default TripApi