import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://booking-com15.p.rapidapi.com/api/v1",
  headers: {
    "X-RapidAPI-Key": "12d865b659msh269091428f3c56fp167eb2jsn93201cf07417",
    "X-RapidAPI-Host": "booking-com15.p.rapidapi.com",
  },
});
