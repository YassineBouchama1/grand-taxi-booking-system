'use client'

import axios from "axios";

const axiosClient = axios.create({
  baseURL:'http://127.0.0.1:80/api',
  withCredentials: true,
})

axiosClient.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
})

export {axiosClient}
