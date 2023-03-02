import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";
import { pipe } from "ramda";
import useSWR from "swr";
import { allAPI } from "@/api";
import { useGlobalStore } from "@/store";
import PageWrapper from "@/components/PageWrapper";
import Loading from "@/components/Loading";
import { sleepAsync } from "@/shared/utils";

const Home: React.FC = () => {
  const [id, setId] = useState(1);

  const navigate = useNavigate();

  // @ts-ignore
  const jump = pipe(queryString.stringifyUrl, navigate);

  const global = useGlobalStore((state) => state);

  const { data, isLoading, mutate } = useSWR([`/users/${id}`], () =>
    allAPI.getUser({ id })
  );

  global.update({ currentUser: data });

  const handleQuery = (count: number) => {
    const _id = id + count;
    setId(_id > 10 ? 10 : _id < 1 ? 1 : _id);
  };

  return (
    <PageWrapper
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <button onClick={() => handleQuery(-1)}>id - 1</button>
          <button onClick={() => handleQuery(1)}>id + 1</button>
        </div>

        <div style={{ margin: "1rem 0" }}>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <div>id: {data?.id}</div>
              <div>name: {data?.name}</div>
              <div>username: {data?.username}</div>
              <div>email: {data?.email}</div>
              <div>phone: {data?.phone}</div>
              <div>website: {data?.website}</div>
            </>
          )}
        </div>

        <div style={{ textAlign: "center" }}>
          <button
            onClick={() =>
              jump({
                url: "/jump",
                query: { from: "home", id },
              })
            }
          >
            to jump page
          </button>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Home;
