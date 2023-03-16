import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { combine, devtools, persist } from "zustand/middleware";

// 使用 combine 自动推断类型
// 感觉不太好，因为还有其他地方会用到 ITestStore 类型
const useTestStore = create(
  devtools(
    persist(
      immer(
        combine({ num: 0 }, (set) => ({
          update: (count: number) =>
            set((draft) => {
              draft.num = draft.num + count;
            }),
        })),
      ),
      { name: "useTestStore" },
    ),
    { name: "useTestStore" },
  ),
);

export default useTestStore;
