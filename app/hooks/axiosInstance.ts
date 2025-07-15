import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://booking-com15.p.rapidapi.com/api/v1",
  headers: {
    "X-RapidAPI-Key": "5d714004a6mshd17346dfc38b14cp18801bjsn76d1a684a20d",
    "X-RapidAPI-Host": "booking-com15.p.rapidapi.com",
  },
});
