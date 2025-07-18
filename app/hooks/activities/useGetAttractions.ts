"use client";

import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../axiosInstance";
import { IAttraction } from "../../types/attractions";

interface AttractionsParams {
  startDate?: string;
  endDate?: string;
  sortBy?: string;
  priceFilters?: number | string;
  id: string;
}

export const useGetAttractions = (
  params: AttractionsParams | null, enabled = true
) => {
  return useQuery({
    queryKey: ["activities", params],
    queryFn: async () => {
      const response = await axiosInstance.get(
        "/attraction/searchAttractions",
        {
          params: {
            ...params,
            page: 1,
            currency_code: "USD",
            languagecode: "en-us",
          },
        }
      );
      const res = response.data as IAttraction;
      return res;
    },
    enabled,
    // staleTime: 1000 * 60 * 5,
  });
};
