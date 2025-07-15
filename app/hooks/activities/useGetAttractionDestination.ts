"use client";

import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../axiosInstance";
import { IAttractionLocation } from "@/app/types/attractions";

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
      const res = response.data as IAttractionLocation;
      return res;
    },
    enabled,
  });
};
