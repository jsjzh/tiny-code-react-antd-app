import React, { useState } from "react";
import { allAPI } from "@/api";
import { useQuery } from "@tanstack/react-query";

const Home: React.FC = () => {
  const [query, setQuery] = useState({ id: 1 });

  const { data, isLoading } = useQuery({
    queryKey: ["getUser", query],
    queryFn: () => allAPI.getUser(query),
  });

  const handleQuery = (count: number) => {
    const id = query.id + count;
    setQuery({ id: id > 10 ? 10 : id < 1 ? 1 : id });
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
