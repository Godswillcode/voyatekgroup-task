import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://booking-com15.p.rapidapi.com/api/v1",
  headers: {
    "X-RapidAPI-Key": "52ca01dadcmsha65b2c1afe0c040p176b81jsn61ef07f68290",
    "X-RapidAPI-Host": "booking-com15.p.rapidapi.com",
  },
});
