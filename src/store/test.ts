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

// 每次状态变化时打印输出
const log = (config) => (set, get, api) =>
  config(
    (args) => {
      console.log("  applying", args);
      set(args);
      console.log("  new state", get());
    },
    get,
    api
  );

// 对set方法使用immer代理
const immer = (config) => (set, get, api) =>
  config(
    (partial, replace) => {
      const nextState =
        typeof partial === "function" ? produce(partial) : partial;
      return set(nextState, replace);
    },
    get,
    api
  );

const useTestStore = create<ITestStore>()(
  immer(
    persist(
      (set, get, api) => ({
        bears: 0,
        change: (count) => set((state) => ({ bears: state.bears + count })),
      }),
      { name: "useTestStore" }
    )
  )
);

export default useTestStore;
