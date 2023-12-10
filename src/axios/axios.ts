import axios from "axios";

const baseURL = import.meta.env.MODE === "development" ? "http://localhost:5183/api" : "http://192.168.0.104/api";

const axiosInstance = axios.create({
  baseURL: baseURL,

  timeout: 3000,

  headers: {
    "Content-Type": "application/json",
    //fix missingAllowOriginHeader
    "Access-Control-Allow-Origin": "*",
  },
});

export default axiosInstance;
