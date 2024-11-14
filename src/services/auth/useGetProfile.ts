import { useQuery } from "@tanstack/react-query";

import { useApiClient } from "../apiClient";
import { queryKeys } from "../queryKeys";

export function useGetProfile(id: string) {
  const apiClient = useApiClient();

  const getUserFn = async () => {
    const response = await apiClient.get(`/profile/${id}`);
    return response.data;
  };

  return useQuery({
    queryKey: queryKeys.profile(id),
    queryFn: getUserFn,
  });
}
