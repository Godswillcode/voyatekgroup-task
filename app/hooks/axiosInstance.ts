import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://booking-com15.p.rapidapi.com/api/v1",
  headers: {
    "X-RapidAPI-Key": "472d4498a2msh492c1beeb66885dp14b1f8jsnd070690bc9d4",
    "X-RapidAPI-Host": "booking-com15.p.rapidapi.com",
  },
});
