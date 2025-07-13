import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://booking-com15.p.rapidapi.com/api/v1",
  headers: {
    "X-RapidAPI-Key": "324549ca08msh9aea329069fddc1p1b0b9ajsn04bf77e78283",
    "X-RapidAPI-Host": "booking-com15.p.rapidapi.com",
  },
});
