import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://booking-com15.p.rapidapi.com/api/v1",
  headers: {
    "X-RapidAPI-Key": "e771502cecmsh4581111a083f8eap109b9fjsn5a44a77d5490",
    "X-RapidAPI-Host": "booking-com15.p.rapidapi.com",
  },
});
