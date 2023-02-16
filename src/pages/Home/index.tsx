import React from "react";
import { allAPI } from "@/api";
import { useQuery } from "@tanstack/react-query";

import { create } from "zustand";

interface IStore {
  id: number;
}

const useStore = create<IStore & { setId: (data: { id: number }) => any }>(
  (set) => ({
    id: 1,
    setId: (data) => set(data),
  })
);

const Home: React.FC = () => {
  const idHandler = useStore();

  const { data, isLoading } = useQuery({
    queryKey: ["getUser", idHandler.id],
    queryFn: () => allAPI.getUser({ id: idHandler.id }),
  });

  const handleQuery = (count: number) => {
    const id = idHandler.id + count;
    idHandler.setId({ id: id > 10 ? 10 : id < 1 ? 1 : id });
  };

  return (
    <div>
      <div>
        <button onClick={() => handleQuery(1)}>click +</button>
        <button onClick={() => handleQuery(-1)}>click -</button>
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
