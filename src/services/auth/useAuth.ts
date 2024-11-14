import { useProfileStore } from "@/store/profile";
import { Profile } from "@/types";
import { useEffect } from "react";
import { useApiClient } from "../apiClient";

function useAuth() {
  const apiClient = useApiClient();
  const setProfile = useProfileStore((state) => state.setProfile);
  useEffect(() => {
    async function initProfile() {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        const profile = await apiClient
          .get<Profile>(`/profile/${accessToken}`)
          .then((res) => res.data);

        setProfile(profile);
      }
    }
    initProfile();
  }, [apiClient, setProfile]);
}

export default useAuth;
