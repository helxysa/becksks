import axios from "axios";
// console.log(import.meta.env.VITE_APP_API_URL);
export const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  withCredentials: false,
});
