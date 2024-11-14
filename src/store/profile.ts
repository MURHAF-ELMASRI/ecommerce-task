import { Profile } from "@/types";
import { create } from "zustand";

interface ProfileState {
  profile: Profile | null;
  setProfile: (profile: Profile) => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: JSON.parse(
    localStorage.getItem("profile") || "null"
  ) as Profile | null,
  setProfile: (profile) => {
    if (profile) {
      localStorage.setItem("profile", JSON.stringify(profile));
    } else {
      localStorage.removeItem("profile");
    }
    set({ profile });
  },
}));
