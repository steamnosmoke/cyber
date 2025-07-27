import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import DB_URL from "constants/DB_URL";
import { TCategory } from "types/CategoryTypes";

export function useFilters(category: string) {
  const { data, status } = useQuery({
    queryKey: ["filters", category],
    queryFn: async () => {
      const response = await axios.get<Record<string, TCategory>>(
        `${DB_URL}/categories.json${
          category ? `?orderBy="name"&equalTo="${category}"` : ""
        }`
      );
      return response.data;
    },
    select: (data) => {
      const categoryData = Object.values(data || {})[0];
      return categoryData?.filters || [];
    },
    placeholderData: (previousData) => previousData,
    enabled: !!category,
  });
  return {
    filters: data || [],
    status,
  };
}
