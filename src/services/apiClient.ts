import { useProfileStore } from "@/store/profile";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const useApiClient = () => {
  const profile = useProfileStore((state) => state.profile);

  if (profile?.accessToken) {
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${profile.accessToken}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }

  return axiosInstance;
};
