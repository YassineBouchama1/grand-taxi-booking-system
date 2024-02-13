
'use client'
import { axiosClient } from "./axios"

const DriverApi = {
  delete: async (id) => {
    return await axiosClient.delete(`/drivers/destroy/${id}`)
  },
  all: async () => {
    return await axiosClient.get('/d')
  },
    create: async (payload) => {
    return await axiosClient.update(`/drivers/create`, payload)
  },
}
export default DriverApi