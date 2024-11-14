import { Profile } from "@/types";
import { create } from "zustand";

interface ProfileState {
  profile: Profile | null;
  setProfile: (profile: Profile) => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null as Profile | null,
  setProfile: (profile) => {
    set(() => ({
      profile,
    }));
  },
}));
