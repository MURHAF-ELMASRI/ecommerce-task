import { Profile } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useApiClient } from "../apiClient";

export function useSignup({
  onSuccess,
}: {
  onSuccess: (data: Profile) => void;
}) {
  const apiClient = useApiClient();

  const signupFn = async (newUser: Profile) => {
    const response = await apiClient.post("/auth/register", newUser);
    return response.data;
  };

  return useMutation({
    mutationFn: signupFn,
    onSuccess: (data) => {
      onSuccess(data);
    },
  });
}
