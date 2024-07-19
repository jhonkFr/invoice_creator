import { create } from "zustand";
import { persist } from "zustand/middleware";
import { account } from "../../appwrite/config";

export const useUserL = create(
  persist(
    (set) => {
      return {
        user: null,
        loginUser: async (mail, pass) => {
          const info = await account.createEmailPasswordSession(mail, pass);
          set({ user: info });
        },
        logoutUser: () => {
          account.deleteSession("current");
          set({ user: null });
        },
      };
    },
    { name: "items_storage" }
  )
);
