import React, { lazy, Suspense } from "react";

import Loading from "@/components/Loading";

import LayoutBlank from "@/pages/_layouts/Blank";
import LayoutMain from "@/pages/_layouts/Main";

const Login = lazy(() => import("@/pages/Login"));
const Home = lazy(() => import("@/pages/Home"));
const Test = lazy(() => import("@/pages/Test"));

const NotFound = lazy(() => import("@/pages/results/NotFound"));
const NotAuthorized = lazy(() => import("@/pages/results/NotAuthorized"));
const ServerError = lazy(() => import("@/pages/results/ServerError"));

const lazyLoad = (children: React.ReactNode) => (
  <Suspense fallback={<Loading />}>{children}</Suspense>
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
    element: <LayoutMain />,
    children: [{ title: "首页", path: "/home", element: lazyLoad(<Home />) }],
  },
  {
    title: "测试",
    path: "/test",
    element: <LayoutMain />,
    children: [{ title: "测试", path: "/test", element: lazyLoad(<Test />) }],
  },
  {
    title: "结果",
    path: "/results",
    element: <LayoutMain />,
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
