import { Profile } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { z } from "zod";
import { useApiClient } from "../apiClient";

export const signupSchema = z.object({
  password: z.string().min(6),
  email: z.string().email(),
  firstName: z.string().min(3),
  lastName: z.string().optional(),
  gender: z.enum(["male", "female"]),
});

export type SignupFormType = z.infer<typeof signupSchema>;
type SignUpErrorResponse = {
  message: string;
};

export function useSignup({
  onSuccess,
  onError,
}: {
  onSuccess: (data: Profile) => void;
  onError: (data: AxiosError<SignUpErrorResponse>) => void;
}) {
  const apiClient = useApiClient();

  const signupFn = async (newUser: SignupFormType) => {
    const response = await apiClient.post("/auth/register", newUser);
    return response.data;
  };

  return useMutation({
    mutationFn: signupFn,
    onSuccess: (data) => {
      onSuccess(data);
    },
    onError: (data) => {
      onError(data);
    },
  });
}
