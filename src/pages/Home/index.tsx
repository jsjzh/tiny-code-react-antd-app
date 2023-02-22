import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";

import Loading from "@/components/Loading";
import { allAPI } from "@/api";
import { useGlobalStore } from "@/store";

const Home: React.FC = () => {
  const [id, setId] = useState(1);
  const navigate = useNavigate();
  const setUser = useGlobalStore((state) => state.setCurrentUser);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["getUser", id],
    queryFn: () => allAPI.getUser({ id }),
    onSuccess: setUser,
  });

  const handleQuery = (count: number) => {
    const _id = id + count;
    setId(_id > 10 ? 10 : _id < 1 ? 1 : _id);
  };

  const handleJump = () => {
    navigate(`/jump/${id}?${queryString.stringify({ from: "home" })}`);
  };

  return (
    <div>
      <div>
        <button onClick={() => handleQuery(1)}>click +</button>
        <button onClick={() => handleQuery(-1)}>click -</button>
        <button onClick={handleJump}>jump</button>
      </div>
      {isLoading ? (
        <Loading />
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
