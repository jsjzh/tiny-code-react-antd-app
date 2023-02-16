import React from "react";
import { allAPI } from "@/api";
import { useQuery } from "@tanstack/react-query";

import { create } from "zustand";
import { useNavigate } from "react-router-dom";

// import { pipe } from "lodash/fp";

interface IStore {
  id: number;
}

// https://github.com/pmndrs/zustand/blob/main/tests/middlewareTypes.test.tsx
// https://zhuanlan.zhihu.com/p/475571377

// const log = (config) => (set, get, api) =>
//   config(
//     (args) => {
//       console.log("  applying", args);
//       set(args);
//       console.log("  new state", get());
//     },
//     get,
//     api
//   );

// // 对set方法使用immer代理
// const immer = (config) => (set, get, api) =>
//   config(
//     (partial, replace) => {
//       const nextState =
//         typeof partial === "function" ? produce(partial) : partial;
//       return set(nextState, replace);
//     },
//     get,
//     api
//   );

// const createStore = pipe(log, immer, create);

// const useStore = createStore((set) => ({
//   bears: 1,
//   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
// }));

const useStore = create<IStore & { setId: (data: { id: number }) => any }>(
  (set) => ({
    id: 1,
    setId: (data) => set(data),
  })
);

const Home: React.FC = () => {
  const idHandler = useStore();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["getUser", idHandler.id],
    queryFn: () => allAPI.getUser({ id: idHandler.id }),
  });

  const handleQuery = (count: number) => {
    const id = idHandler.id + count;
    idHandler.setId({ id: id > 10 ? 10 : id < 1 ? 1 : id });
  };

  const handleJump = () => {
    navigate("/jump/123?author=jack&age=18");
  };

  return (
    <div>
      <div>
        <button onClick={() => handleQuery(1)}>click +</button>
        <button onClick={() => handleQuery(-1)}>click -</button>
        <button onClick={handleJump}>jump</button>
      </div>
      {isLoading ? (
        <>获取数据中...</>
      ) : (
        <div>
          <div>email: {data?.email}</div>
          <div>id: {data?.id}</div>
          <div>name: {data?.name}</div>
          <div>phone: {data?.phone}</div>
          <div>username: {data?.username}</div>
          <div>website: {data?.website}</div>
        </div>
      )}
    </div>
  );
};

export default Home;
