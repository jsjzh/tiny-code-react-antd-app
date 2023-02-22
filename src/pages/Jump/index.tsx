import React from "react";
import { useGlobalStore } from "@/store";
import { useSearchParams } from "react-router-dom";

import PageWrapper from "@/components/PageWrapper";

const Jump: React.FC = () => {
  const [searchParams] = useSearchParams();

  const user = useGlobalStore((state) => state.currentUser);

  searchParams.forEach((value, key) => {
    console.log(`key: ${key}`, `value: ${value}`);
  });

  return (
    <PageWrapper>
      <div>
        <div>url query from: {searchParams.get("from")}</div>
        <div>url query id: {searchParams.get("id")}</div>
      </div>

      <div>
        <div>从 globalStore 获取来的数据如下</div>

        <div>id: {user.id}</div>
        <div>name: {user.name}</div>
        <div>username: {user.username}</div>
        <div>email: {user.email}</div>
        <div>phone: {user.phone}</div>
        <div>website: {user.website}</div>
      </div>
    </PageWrapper>
  );
};
export default Jump;
