import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Dropdown, Menu, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";

import routes from "@/routes";

import type { MenuProps } from "antd/es/menu";
import type { IRoute } from "@/routes";
import { useGlobalStore } from "@/store";
import { pick } from "ramda";
import KeepAlive from "@/components/KeepAlive";
import styled from "styled-components";

const siderWidth = "20vw";
const contentWidth = `calc(100vw - ${siderWidth})`;
const contentHeadHeight = "7vh";

const Container = styled.div`
  display: flex;
`;

const SiderContainer = styled.div`
  width: ${siderWidth};
`;

const SiderLogo = styled.div`
  height: ${contentHeadHeight};
  line-height: ${contentHeadHeight};
  text-align: center;
  border: 1px solid rgba(5, 5, 5, 0.06);
`;

const SiderMenu = styled(Menu)`
  height: calc(100% - ${contentHeadHeight});
`;

const ContentContainer = styled.div`
  width: ${contentWidth};
`;

const ContentHeader = styled.div`
  height: ${contentHeadHeight};
  line-height: ${contentHeadHeight};
  text-align: right;
  padding-right: 1rem;
  border-bottom: 1px solid rgba(5, 5, 5, 0.06);
`;

const Content = styled.div`
  height: calc(100vh - ${contentHeadHeight});
  overflow: auto;
`;

export const contentScrollToTop = () => {
  const $content = document.getElementById("content");
  $content?.scrollTo({ top: 0, behavior: "smooth" });
};

const mapStateToProps = pick(["currentUser"]);

const LayoutContainer: React.FC = () => {
  const location = useLocation();
  const global = useGlobalStore(mapStateToProps);
  const navigate = useNavigate();

  const parseRoutes = (routes: IRoute[]) => {
    const result: Required<MenuProps>["items"][number][] = [];
    for (let index = 0; index < routes.length; index++) {
      const route = routes[index];
      if (route.hide) continue;

      const item: any = {
        icon: route.icon,
        key: route.path,
        label: route.title,
        onClick: (e: any) => {
          if (!route.children) {
            contentScrollToTop();
            navigate(e.key);
          }
        },
      };

      if (Array.isArray(route.children) && route.children.length) {
        if (route.children.length === 1) {
          item!.key = route.children[0].path;
          item!.label = route.children[0].title;
          item!.onClick = (e: any) => {
            contentScrollToTop();
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

  const handleLogout = () => {
    window.location.href = `${window.location.origin}${window.location.pathname}`;
  };

  return (
    <Container>
      <SiderContainer>
        <SiderLogo>后台管理系统</SiderLogo>
        <SiderMenu
          mode="vertical"
          selectedKeys={[location.pathname]}
          items={parseRoutes(routes)}
        />
      </SiderContainer>

      <ContentContainer>
        <ContentHeader>
          <Dropdown
            menu={{
              items: [
                { label: "logout", key: "logout", onClick: handleLogout },
              ],
            }}
          >
            <Space>
              <span>hello, {global.currentUser?.name}</span>
              <DownOutlined />
            </Space>
          </Dropdown>
        </ContentHeader>
        <Content id="content">
          <KeepAlive include={[]} keys={[]} />
        </Content>
      </ContentContainer>
    </Container>
  );
};

export default LayoutContainer;
