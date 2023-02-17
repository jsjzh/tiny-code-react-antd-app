import { create } from "zustand";

interface ICurrentUser {
  currentUser: Partial<D.User>;

  setCurrentUser: (currentUser: ICurrentUser["currentUser"]) => void;
}

type IGlobal = ICurrentUser;

const useGlobalStore = create<IGlobal>((set, get, api) => ({
  currentUser: {
    name: undefined,
    age: undefined,
  },

  setCurrentUser: (currentUser) =>
    set((state) => ({
      ...state,
      currentUser: { ...state.currentUser, ...currentUser },
    })),
}));

export default useGlobalStore;
