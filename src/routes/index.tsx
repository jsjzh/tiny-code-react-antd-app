import React, { lazy, Suspense } from "react";
import { Spin } from "antd";

import LayoutBlank from "@/pages/_layouts/Blank";
import LayoutContainer from "@/pages/_layouts/Container";

const Login = lazy(() => import("@/pages/Login"));
const Home = lazy(() => import("@/pages/Home"));
const Todo = lazy(() => import("@/pages/Todo"));
const Test = lazy(() => import("@/pages/Test"));

const NotFound = lazy(() => import("@/pages/results/NotFound"));
const NotAuthorized = lazy(() => import("@/pages/results/NotAuthorized"));
const ServerError = lazy(() => import("@/pages/results/ServerError"));

const lazyLoad = (children: React.ReactNode) => (
  <Suspense fallback={<Spin spinning size="large" />}>{children}</Suspense>
);

export interface IRoute {
  title: string;
  path: string;
  icon?: React.ReactNode;
  element?: React.ReactNode;
  children?: IRoute[];
  hide?: boolean;
}

const routes: IRoute[] = [
  {
    hide: true,
    title: "登录",
    path: "/",
    element: <LayoutBlank />,
    children: [{ title: "登录", path: "/", element: lazyLoad(<Login />) }],
  },
  {
    title: "首页",
    path: "/home",
    element: <LayoutContainer />,
    children: [{ title: "首页", path: "/home", element: lazyLoad(<Home />) }],
  },
  {
    title: "待办",
    path: "/todo",
    element: <LayoutContainer />,
    children: [{ title: "待办", path: "/todo", element: lazyLoad(<Todo />) }],
  },
  {
    title: "测试",
    path: "/test",
    element: <LayoutContainer />,
    children: [{ title: "测试", path: "/test", element: lazyLoad(<Test />) }],
  },
  {
    title: "结果",
    path: "/results",
    element: <LayoutContainer />,
    children: [
      {
        title: "无权限",
        path: "/results/403",
        element: lazyLoad(<NotAuthorized />),
      },
      {
        title: "未知错误",
        path: "/results/404",
        element: lazyLoad(<NotFound />),
      },
      {
        title: "服务器出错",
        path: "/results/500",
        element: lazyLoad(<ServerError />),
      },
    ],
  },
];

export default routes;
