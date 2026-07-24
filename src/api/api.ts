import axios from "axios";
console.log("VITE_API_BASE_URL =", import.meta.env.VITE_API_BASE_URL);
console.log("MODE =", import.meta.env.MODE);
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

export default api;
