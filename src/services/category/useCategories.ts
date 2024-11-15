import { Product } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "../apiClient";
import { queryKeys } from "../queryKeys";

export default function useCategories() {
  const apiClient = useApiClient();

  function getCategories() {
    return apiClient
      .get<Product[]>("/products", { params: { _embed: "category" } })
      .then(({ data }) => {
        const t = new Set(data.map((product: Product) => product.category));
        return Array.from(t);
      });
  }

  return useQuery<string[]>({
    queryKey: queryKeys.categories(),
    queryFn: getCategories,
  });
}
