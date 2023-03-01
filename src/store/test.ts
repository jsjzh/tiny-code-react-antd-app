import { create } from "zustand";
import { produce } from "immer";
import { combine, persist } from "zustand/middleware";

// 使用 combine 自动推断类型
// 感觉不太好，因为还有其他地方会用到 ITestStore 类型
// const useTestStore = create(
//   persist(
//     combine({ bears: 0 }, (set) => ({
//       increase: (by: number) => set((state) => ({ bears: state.bears + by })),
//       add: () => set((state) => ({ bears: state.bears + 1 })),
//     })),
//     { name: "useTestStore" }
//   )
// );

interface ITestData {
  bears: number;
}

interface ITestFuns {
  change: (count: number) => void;
}

export type ITestStore = ITestData & ITestFuns;

const useTestStore = create<ITestStore>()(
  persist(
    (set, get, api) => ({
      bears: 0,
      change: (count) => set((state) => ({ bears: state.bears + count })),
    }),
    { name: "useTestStore" }
  )
);

export default useTestStore;
