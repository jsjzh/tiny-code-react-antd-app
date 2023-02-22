import React, { lazy, Suspense } from "react";

import Loading from "@/components/Loading";

import LayoutBlank from "@/pages/_layouts/Blank";
import LayoutContainer from "@/pages/_layouts/Container";

const Home = lazy(() => import("@/pages/Home"));
const Jump = lazy(() => import("@/pages/Jump"));

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
    path: "/login",
    element: <LayoutBlank />,
    children: [{ title: "登录", path: "/login", element: lazyLoad(<Home />) }],
  },
  {
    title: "首页",
    path: "/homepage",
    element: <LayoutContainer />,
    children: [
      { title: "首页", path: "/homepage/home", element: lazyLoad(<Jump />) },
    ],
  },
  { hide: true, title: "未知", path: "*", element: <NotFound /> },
];

// const router: RouteObject[] = [
//   {
//     path: "/",
//     element: <LayoutContainer />,
//     children: [
//       { path: "/", element: lazyLoad(<Home />) },
//       { path: "/jump/:id", element: lazyLoad(<Jump />) },
//     ],
//   },
//   {
//     path: "/default",
//     element: <LayoutBlank />,
//     children: [
//       { path: "/default", element: lazyLoad(<Home />) },
//       { path: "/default/jump", element: lazyLoad(<Jump />) },
//     ],
//   },
//   { path: "*", element: lazyLoad(<NotFound />) },
// ];

export default routes;
