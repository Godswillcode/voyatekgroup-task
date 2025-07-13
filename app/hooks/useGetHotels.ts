"use client";

import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./axiosInstance";
import { IHotel } from "../types/hotels";

interface UseHotelsParams {
  arrival_date: string;
  departure_date: string;
  adults: number;
  room_qty: number;
  page_number?: number;
  children_age?: string;
  location?: string;
}

export const useGetHotels = (params: UseHotelsParams | null, enabled = true) => {
  return useQuery({
    queryKey: ["hotels", params],
    queryFn: async () => {
      const response = await axiosInstance.get("/hotels/searchHotels", {
        params: {
          ...params,
          dest_id: "-2092174",
          search_type: "CITY",
          page_number: params?.page_number || 1,
          currency_code: "USD",
          units: "metric",
          temperature_unit: "c",
          languagecode: "en-us",
          location: "US",
        },
      });
     const res = response.data as IHotel;
      return res;
    },
    enabled,
    // staleTime: 1000 * 60 * 5,
  });
};
