import axios from "axios";

const API = axios.create({
  baseURL: "https://localhost:7224/api", 
  withCredentials: true, 
});

export default API;
