'use client'
import { axiosClient } from "./axios"

const DriverApi = {
  delete: async (id) => {
    return await axiosClient.delete(`/drivers/destroy/${id}`)
  },
  show: async () => {
    return await axiosClient.get('/drivers/show')
  },
  create: async (payload) => {
    // Use axiosClient.post instead of axiosClient.create
    return await axiosClient.post(`/drivers/create`, payload)
  },
}

export default DriverApi
