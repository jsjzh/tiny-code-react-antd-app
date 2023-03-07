import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools, persist } from "zustand/middleware";

interface IGlobalData {
  currentUser?: T.User;

  [k: string]: any;
}

interface IGlobalFunc {
  update: (globalData: Partial<IGlobalData>) => void;
}

type IGlobal = IGlobalData & IGlobalFunc;

const useGlobalStore = create<IGlobal>()(
  devtools(
    persist(
      immer((set, get, api) => ({
        currentUser: undefined,

        update: (data) =>
          set((draft) => {
            Object.keys(data).forEach((key) => {
              draft[key] = data[key];
            });
          }),
      })),
      { name: "useGlobalStore" }
    ),
    { name: "useGlobalStore" }
  )
);

export default useGlobalStore;
