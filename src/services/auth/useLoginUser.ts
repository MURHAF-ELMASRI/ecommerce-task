import { useMutation } from "@tanstack/react-query";

import { useProfileStore } from "@/store/profile";
import { z } from "zod";
import { useApiClient } from "../apiClient";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 character",
  }),
});

export type LoginFormType = z.infer<typeof loginSchema>;

//TODO refactor: create wrapper hook around for hook with react query  so it enforce user to pass onError and onSuccess
// Note: I will leave this as is for now. to tell how I am thinking about this
export function useLoginUser({
  onError,
  onSuccess,
}: {
  onError: (data) => void;
  onSuccess: (data) => void;
}) {
  const apiClient = useApiClient();
  const setProfile = useProfileStore((state) => state.setProfile);

  const loginUserFn = async (loginData: LoginFormType) => {
    const response = await apiClient.post("/auth/login", loginData);
    return response.data;
  };
  return useMutation({
    mutationFn: loginUserFn,
    onError: (data) => {
      onError({
        response: {
          data: { fieldErrors: { email: "Invalid email or password" } },
        },
      });
    },
    onSuccess: (data) => {
      setProfile(data);
      onSuccess(data);
    },
  });
}
