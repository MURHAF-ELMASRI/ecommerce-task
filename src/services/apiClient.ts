import { useProfileStore } from "@/store/profile";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const useApiClient = () => {
  const profile = useProfileStore((state) => state.profile);
  if (profile) {
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${profile.accessToken}`;
  }
  return axiosInstance;
};
