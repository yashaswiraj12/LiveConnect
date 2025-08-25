// https://slack-pues.vercel.app/api

import axios from "axios";

const BASE_URL= import.meta.env.VITE_BASE_URL


export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

