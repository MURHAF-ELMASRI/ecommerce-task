import { Product } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
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
  const apiClient = useApiClient();

  const getInfiniteProductsFn = async ({ pageParam = 1 }) => {
    const { maxPrice, minPrice, ...restParams } = Object.fromEntries(
      new URLSearchParams(window.location.search).entries()
    );
    const filteringParams = {
      price_gte: minPrice,
      price_lte: maxPrice,
      ...restParams,
    };

    const params = {
      _page: pageParam,
      _per_page: pageLimit,
      ...filteringParams,
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
