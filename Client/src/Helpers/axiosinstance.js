import axios from "axios";

const BASE_URL = "http://localhost:3001/api/v1/"; // Process.env.REACT_APP_BASE_URL;

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL; //  Default base URL for all requests in this instance of the library
axiosInstance.defaults.withCredentials = true; //   for cross-domain requests

export default axiosInstance;
