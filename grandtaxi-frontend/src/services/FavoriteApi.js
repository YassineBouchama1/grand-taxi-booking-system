'use client'
import { axiosClient } from "./axios"

const FavoriteApi = {
  getAll: async () => {
    return await axiosClient.get(`/favorites`)
  },

  create: async (payload) => {

    return await axiosClient.post(`/favorites/create`, payload)
  },
    delete: async (favoriteId) => {
 
    return await axiosClient.delete(`/favorites/${favoriteId}`)
  },

      restoreUser: async (user_id) => {
    // Use axiosClient.post instead of axiosClient.create
    return await axiosClient.get(`/auth/restorUser/${user_id}`)
  },
}

export default FavoriteApi
