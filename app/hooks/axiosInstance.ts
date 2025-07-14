import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://booking-com15.p.rapidapi.com/api/v1",
  headers: {
    "X-RapidAPI-Key": "1e5b12e074msh7f724ad61e04436p11edfcjsn39902fa39648",
    "X-RapidAPI-Host": "booking-com15.p.rapidapi.com",
  },
});
