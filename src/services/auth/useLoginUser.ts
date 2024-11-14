import { useMutation } from "@tanstack/react-query";

import { useToast } from "@/hooks/use-toast";
import { useProfileStore } from "@/store/profile";
import { AxiosError } from "axios";
import { z } from "zod";
import { useApiClient } from "../apiClient";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 character",
  }),
});

export type LoginFormType = z.infer<typeof loginSchema>;

type LoginErrorResponse = {
  message: string;
};

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
  const { toast } = useToast();

  const loginUserFn = async (loginData: LoginFormType) => {
    // json-server doesn't support email as a query param
    const response = await apiClient.get(`/profile/${loginData.email}`);
    return response.data;
  };
  return useMutation({
    mutationFn: loginUserFn,
    onError: (data: AxiosError<LoginErrorResponse>) => {
      toast({
        title: "Error",
        description: data.response?.data?.message,
        variant: "destructive",
      });
      onError(data);
    },
    onSuccess: (data) => {
      setProfile(data);
      onSuccess(data);
    },
  });
}
