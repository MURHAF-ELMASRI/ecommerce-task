import { Product } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "../apiClient";
import { queryKeys } from "../queryKeys";

export default function useBrands() {
  const apiClient = useApiClient();

  function getBrands() {
    return apiClient
      .get<Product[]>("/products", { params: { _fields: "brand" } })
      .then(({ data }) => {
        const t = new Set(data.map((product: Product) => product.brand));
        return Array.from(t);
      });
  }

  return useQuery<string[]>({
    queryKey: queryKeys.brands(),
    queryFn: getBrands,
  });
}
