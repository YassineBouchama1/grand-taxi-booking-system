
'use client'
import { axiosClient } from "./axios"

const TripApi = {
  create: async (payload) => {
    return await axiosClient.post('/trips/create', payload)
  },
    updateStatis: async (payload,id) => {
    return await axiosClient.put(`/trips/updateStatus/${id}`, payload)
  },
    delete: async (id) => {
    return await axiosClient.delete(`/trips/destroy/${id}`)
  },
  historiesTrips: async () => {
    return await axiosClient.get('/trips/history')
  },
  all: async () => {
    return await axiosClient.get('/trips/my')
  },
    forAlll: async () => {
    return await axiosClient.get('/trips')
  },
}
export default TripApi