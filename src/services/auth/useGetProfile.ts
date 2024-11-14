import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
 
import { queryKeys } from "../queryKeys";
import { useApiClient } from "../apiClient";

export function useGetProfile() {
  const { id } = useParams();
  const apiClient = useApiClient();

  const getUserFn = async () => {
    const response = await apiClient.get(`/auth/me`);
    return response.data;
  };

  return useQuery({
    queryKey: queryKeys.profile(Number(id)),
    queryFn: getUserFn,
  });
}
