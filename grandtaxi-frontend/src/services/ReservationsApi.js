
'use client'
import { axiosClient } from "./axios"

const ReservationsApi = {
  delete: async (id) => {
    return await axiosClient.delete(`/reservations/destroy/${id}`)
  },
  all: async () => {
    return await axiosClient.get('/trips')
  },
    update: async (payload,id) => {
    return await axiosClient.put(`/reservations/create${id}`, payload)
  },
}
export default ReservationsApi