"use client";

import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../axiosInstance";
import { IDestination, IFlightDestination } from "@/app/types/flight";

interface destinationParams {
  query: string;
}

export const useGetAttractionDestination = (
  params: destinationParams,
  enabled = true
) => {
  return useQuery({
    queryKey: ["AttractionDestination", params],
    queryFn: async () => {
      const response = await axiosInstance.get("/attraction/searchLocation", {
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
