"use client";

import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../axiosInstance";

interface destinationParams {
    query: string;
}

export const useGetFlightDestination = (
  params: destinationParams, enabled = true
) => {
  return useQuery({
    queryKey: ["FlightDestination", params],
    queryFn: async () => {
      const response = await axiosInstance.get(
        "/flights/searchDestination",
        {
          params: {
            ...params,
          
          },
        }
      );
      const res = response.data as IFlightDestination;
      return res;
    },
    enabled,
  });
};


interface IFlightDestination {

}