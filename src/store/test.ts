import { create } from "zustand";
import { produce } from "immer";
import { combine, persist } from "zustand/middleware";

// const log = (config: any) => (set, get, api) =>
//   config(
//     (args) => {
//       console.log("  applying", args);
//       set(args);
//       console.log("  new state", get());
//     },
//     get,
//     api
//   );

const useTestStore = create(
  persist(
    combine({ bears: 0 }, (set) => ({
      increase: (by: number) => set((state) => ({ bears: state.bears + by })),
      add: () => set((state) => ({ bears: state.bears + 1 })),
    })),
    { name: "useTestStore" }
  )
);

export default useTestStore;
