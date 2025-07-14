"use client";

import { useQuery } from "@tanstack/react-query";
import { IFlight } from "@/app/types/flight";
import { axiosInstance } from "../axiosInstance";

interface UseFlightsParams {
  fromId: string;
  toId: string;
  adults: number;
  departDate: string;
  children?: string;
  returnDate?: string;
  cabinClass?: string;
}

export const useGetFlights = (
  params: UseFlightsParams | null,
  enabled = true
) => {
  return useQuery({
    queryKey: ["flights", params],
    queryFn: async () => {
      const response = await axiosInstance.get("/flights/searchFlights", {
        params: {
          ...params,
          page_number: 1,
          currency_code: "USD",
        },
      });
      const res = response.data as IFlight;
      return res;
    },
    enabled,
    // staleTime: 1000 * 60 * 5,
  });
};
