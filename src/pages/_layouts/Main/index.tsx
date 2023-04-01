import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Dropdown, Menu, Space, Spin } from "antd";
import { DownOutlined } from "@ant-design/icons";

import routes from "@/routes";

import type { MenuProps } from "antd/es/menu";
import type { IRoute } from "@/routes";
import { useGlobalStore } from "@/store";
import { pick } from "ramda";
import KeepAlive from "@/components/KeepAlive";

const containerScrollToTop = () => {
  const container = document.getElementById("globalContainer");
  container?.scrollTo({ top: 0, behavior: "smooth" });
};

type MenuItem = Required<MenuProps>["items"][number];

const mapStateToProps = pick(["isInit", "updateGlobal"]);

const LayoutContainer: React.FC = () => {
  const location = useLocation();
  const global = useGlobalStore(mapStateToProps);
  const navigate = useNavigate();

  const parseRoutes = (routes: IRoute[]) => {
    const result: MenuItem[] = [];
    for (let index = 0; index < routes.length; index++) {
      const route = routes[index];
      if (route.hide) continue;

      const item: any = {
        icon: route.icon,
        key: route.path,
        label: route.title,
        onClick: (e: any) => {
          if (!route.children) {
            containerScrollToTop();
            navigate(e.key);
          }
        },
      };

      if (Array.isArray(route.children) && route.children.length) {
        if (route.children.length === 1) {
          item!.key = route.children[0].path;
          item!.label = route.children[0].title;
          item!.onClick = (e: any) => {
            containerScrollToTop();
            navigate(route!.children![0].path);
          };
        } else {
          item.children = parseRoutes(route.children);
        }
      }

      result.push(item);
    }
    return result;
  };

  const onClick: MenuProps["onClick"] = (props) => {
    if (props.key === "quit") {
      window.location.href = `${window.location.origin}${window.location.pathname}`;
    }
  };

  const items: MenuProps["items"] = [{ label: "退出登录", key: "quit" }];

  return (
    <div
      style={{
        display: "flex",
        position: "relative",
      }}
    >
      <div style={{ width: "10vw" }}>
        <div
          style={{
            height: "3rem",
            lineHeight: "3rem",
            textAlign: "center",
            border: "1px solid rgba(5, 5, 5, 0.06)",
          }}
        >
          IT 账台
        </div>

        <Menu
          style={{ height: "calc(100% - 3rem)" }}
          mode="vertical"
          selectedKeys={[location.pathname]}
          items={parseRoutes(routes)}
        />
      </div>

      <div style={{ width: "90vw" }}>
        <div
          style={{
            height: "3rem",
            lineHeight: "3rem",
            textAlign: "right",
            paddingRight: "1rem",
            borderBottom: "1px solid rgba(5, 5, 5, 0.06)",
          }}
        >
          <div>
            <Dropdown menu={{ items, onClick }}>
              <Space>
                <span>用户，您好</span>
                <DownOutlined />
              </Space>
            </Dropdown>
          </div>
        </div>
        <div
          id="globalContainer"
          style={{ height: "calc(100vh - 3rem)", overflow: "auto" }}
        >
          <Spin spinning={false} size="large">
            <KeepAlive include={[]} keys={[]} />
          </Spin>
        </div>
      </div>
    </div>
  );
};

export default LayoutContainer;
