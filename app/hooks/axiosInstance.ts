import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://booking-com15.p.rapidapi.com/api/v1",
  headers: {
    "X-RapidAPI-Key": "422106e265msh8eb3f4e7531a675p1f5bb0jsn3af7b01f7146",
    "X-RapidAPI-Host": "booking-com15.p.rapidapi.com",
  },
});
