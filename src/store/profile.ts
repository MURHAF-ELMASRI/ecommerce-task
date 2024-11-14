import { Profile } from "@/types";
import { create } from "zustand";

interface ProfileState {
  profile: Profile | null;
  setProfile: (profile: Profile | null) => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: JSON.parse(
    localStorage.getItem("profile") || "null"
  ) as Profile | null,
  loadingProfile: false,
  setProfile: (profile) => {
    if (profile) {
      localStorage.setItem("accessToken", profile.email);
    } else {
      localStorage.removeItem("accessToken");
    }
    set({ profile });
  },
}));
