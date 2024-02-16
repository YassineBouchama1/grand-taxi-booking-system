'use client'
import { axiosClient } from "./axios"

const AdminApi = {
  statics: async () => {
    return await axiosClient.get(`auth/statics`)
  },
    usersNotAdmin: async () => {
    return await axiosClient.get(`auth/usersNotAdmin`)
  },
  show: async () => {
    return await axiosClient.get('/drivers/show')
  },
  create: async (payload) => {
    // Use axiosClient.post instead of axiosClient.create
    return await axiosClient.post(`/drivers/create`, payload)
  },
    createReserve: async (payload) => {
    return await axiosClient.post(`/reservations/admin`, payload)
  },
    deleteUser: async (user_id) => {
    // Use axiosClient.post instead of axiosClient.create
    return await axiosClient.delete(`/auth/deleteUser/${user_id}`)
  },

      restoreUser: async (user_id) => {
    // Use axiosClient.post instead of axiosClient.create
    return await axiosClient.get(`/auth/restorUser/${user_id}`)
  },
}

export default AdminApi
