import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { pick, pipe } from "ramda";
import { useImmer } from "use-immer";
import queryString from "query-string";
import { allAPI } from "@/api";
import { useGlobalStore } from "@/store";
import PageWrapper from "@/components/PageWrapper";
import { Button, Select } from "antd";

const mapStateToProps = pick(["update"]);

const Login: React.FC = () => {
  const global = useGlobalStore(mapStateToProps);

  const navigate = useNavigate();
  const jump = useCallback(pipe(queryString.stringifyUrl as any, navigate), []);

  const [pageStatus, updatePageStatus] = useImmer<{ id: number }>({ id: 1 });

  const { data: users } = useSWR(["getUsers"], () => allAPI.getUsers());

  const handleChange = useCallback((value: number) => {
    updatePageStatus((draft) => {
      draft.id = value;
    });
  }, []);

  const handleJump = useCallback(() => {
    allAPI.getUsersId({ id: pageStatus.id }).then((user) => {
      global.update({ currentUser: user });
      jump({ url: "/home" });
    });
  }, [pageStatus.id]);

  return (
    <PageWrapper>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Select
          value={pageStatus.id}
          options={users?.map((user) => ({ label: user.name, value: user.id }))}
          onChange={handleChange}
        />

        <Button type="primary" onClick={handleJump}>
          Login
        </Button>
      </div>
    </PageWrapper>
  );
};

export default Login;
