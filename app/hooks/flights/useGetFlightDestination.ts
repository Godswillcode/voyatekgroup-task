"use client";

import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../axiosInstance";
import { IDestination, IFlightDestination } from "@/app/types/flight";

interface destinationParams {
  query: string;
}

export const useGetFlightDestination = (
  params: destinationParams,
  enabled = true
) => {
  return useQuery({
    queryKey: ["FlightDestination", params],
    queryFn: async () => {
      const response = await axiosInstance.get("/flights/searchDestination", {
        params: {
          ...params,
        },
      });
      const res = response.data as IDestination;
      return res;
    },
    enabled,
  });
};
