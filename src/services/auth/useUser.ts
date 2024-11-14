import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { apiClient } from "../apiClient";
import { queryKeys } from "../queryKeys";

export function useUser() {
  const { id } = useParams();

  const getUserFn = async () => {
    const response = await apiClient.get(`/profile/${id}`);
    return response.data;
  };

  return useQuery({
    queryKey: queryKeys.profile(Number(id)),
    queryFn: getUserFn,
  });
}
