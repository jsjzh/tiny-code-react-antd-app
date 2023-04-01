import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { pick, pipe } from "ramda";
import { useImmer } from "use-immer";
import queryString from "query-string";
import { allAPI } from "@/api";
import { useGlobalStore } from "@/store";
import { Button, Select, Space } from "antd";
import styled from "styled-components";

const LoginContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginContent = styled.div`
  width: 30rem;
  text-align: center;
`;

const mapStateToProps = pick(["update"]);

const Login: React.FC = () => {
  const global = useGlobalStore(mapStateToProps);

  const navigate = useNavigate();
  const jump = useCallback(pipe(queryString.stringifyUrl as any, navigate), []);

  const [pageStatus, updatePageStatus] = useImmer<{ id: number }>({ id: 1 });

  const { data: users } = useSWR(["getUsers"], () => allAPI.getUsers(), {
    onSuccess(data) {
      updatePageStatus((draft) => {
        const ids = data.map((user) => user.id);
        draft.id = ids[Number((Math.random() * ids.length).toFixed())];
      });
    },
  });

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
    <LoginContainer>
      <LoginContent>
        <div style={{ marginBottom: "1rem" }}>
          <Select
            style={{ width: "50%" }}
            value={pageStatus.id}
            options={users?.map((user) => ({
              label: user.name,
              value: user.id,
            }))}
            onChange={handleChange}
          />
        </div>
        <div>
          <Button type="primary" onClick={handleJump}>
            Login
          </Button>
        </div>
      </LoginContent>
    </LoginContainer>
  );
};

export default Login;
