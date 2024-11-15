import { Product } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useApiClient } from "../apiClient";
import { queryKeys } from "../queryKeys";

type PaginationResponse = {
  data: Product[];
  first: number;
  items: number;
  last: number;
  next: number;
};

export function useInfiniteProducts({ pageLimit }: { pageLimit: number }) {
  const [searchParams] = useSearchParams();
  const apiClient = useApiClient();

  const getInfiniteProductsFn = async ({ pageParam = 1 }) => {
    const params = {
      _page: pageParam,
      _per_page: pageLimit,
      ...Object.fromEntries(searchParams.entries()),
    };

    return apiClient
      .get<PaginationResponse>(`products`, { params })
      .then(({ data }) => data);
  };

  return useInfiniteQuery({
    queryKey: queryKeys.infinityProducts(),
    queryFn: getInfiniteProductsFn,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => lastPage.next,
  });
}
