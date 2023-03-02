import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { combine, devtools, persist } from "zustand/middleware";

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
  num: number;
}

interface ITestFuns {
  update: (count: number) => void;
}

export type ITestStore = ITestData & ITestFuns;

export const useTestStore = create<ITestStore>()(
  devtools(
    persist(
      immer((set, get, api) => ({
        num: 0,
        update: (count) =>
          set((draft) => {
            draft.num = draft.num + count;
          }),
      })),
      { name: "useTestStore" }
    ),
    { name: "useTestStore" }
  )
);

export default useTestStore;
