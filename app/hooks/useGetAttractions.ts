"use client";

import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./axiosInstance";
import { IHotel } from "../types/hotels";

interface AttractionsParams {
  startDate?: string;
  endDate?: string;
  sortBy?: string;
  priceFilters?: number | string;
}

export const useGetAttractions = (
  params: AttractionsParams | null,
  enabled = true
) => {
  return useQuery({
    queryKey: ["hotels", params],
    queryFn: async () => {
      const response = await axiosInstance.get(
        "/attraction/searchAttractions",
        {
          params: {
            ...params,
            id: "eyJ1ZmkiOi0yMDkyMTc0fQ==",
            page: 1,
            currency_code: "USD",
            languagecode: "en-us",
          },
        }
      );
      const res = response.data as IHotel;
      return res;
    },
    enabled,
    // staleTime: 1000 * 60 * 5,
  });
};
