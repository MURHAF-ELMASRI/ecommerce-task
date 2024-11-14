import { User } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../apiClient";

const createUserFn = async (newUser: User) => {
  const response = await apiClient.post("/auth/register", newUser);
  return response.data;
};

export function useCreateUser({
  onSuccess,
}: {
  onSuccess: (data: User) => void;
}) {
  return useMutation({
    mutationFn: createUserFn,
    onSuccess: (data) => {
      onSuccess(data);
    },
  });
}
