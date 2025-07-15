"use client";

import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../axiosInstance";
import { IHotelDestination } from "@/app/types/hotels";

interface destinationParams {
  query: string;
}

export const useGetHotelDestination = (
  params: destinationParams,
  enabled = true
) => {
  return useQuery({
    queryKey: ["HotelDestination", params],
    queryFn: async () => {
      const response = await axiosInstance.get("/hotels/searchDestination", {
        params: {
          ...params,
        },
      });
      const res = response.data as IHotelDestination;
      return res;
    },
    enabled,
  });
};
