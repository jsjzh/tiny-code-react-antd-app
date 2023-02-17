import { useGlobalStore } from "@/store";
import React from "react";
import { useParams, useSearchParams } from "react-router-dom";

const Jump: React.FC = () => {
  const params = useParams();
  const [searchParams] = useSearchParams();

  const user = useGlobalStore((state) => state.currentUser);

  searchParams.forEach((value, key) => {
    console.log(`key: ${key}`, `value: ${value}`);
  });

  return (
    <div>
      <div>
        从 url 获取来的 params: <span>{params.id}</span>
      </div>

      <div>
        从 <span>{searchParams.get("from")} 页面</span> 跳转
      </div>

      <div>
        <div>从 globalStore 获取来的数据</div>
        <div>email: {user.email}</div>
        <div>id: {user.id}</div>
        <div>name: {user.name}</div>
        <div>phone: {user.phone}</div>
        <div>username: {user.username}</div>
        <div>website: {user.website}</div>
      </div>
    </div>
  );
};
export default Jump;
