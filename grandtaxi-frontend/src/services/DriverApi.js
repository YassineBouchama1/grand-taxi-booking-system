'use client'
import axios from "axios"
import { axiosClient } from "./axios"

const DriverApi = {
  delete: async (id) => {
    return await axiosClient.delete(`/drivers/destroy/${id}`)
  },
  show: async () => {
    return await axiosClient.get('/drivers/show')
  },
  create: async (payload) => {
    
    return await axiosClient.post(`/drivers/create`, payload)
  },
    update: async (payload) => {
 
    //  await axios.get('http://127.0.0.1:80/sanctum/csrf-cookie');
    return await axiosClient.put(`/drivers/update`, payload)
  },
}

export default DriverApi
