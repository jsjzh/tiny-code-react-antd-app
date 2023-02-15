import { lazy, Suspense } from "react";

import Loading from "@/components/Loading";

import LayoutContainer from "@/pages/_layouts/Container";
import LayoutBlank from "@/pages/_layouts/Blank";

import type { ReactNode } from "react";
import type { RouteObject } from "react-router-dom";

const Home = lazy(() => import("@/pages/Home"));

const NotFound = lazy(() => import("@/pages/404"));

const lazyLoad = (children: ReactNode): ReactNode => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

const routes: RouteObject[] = [
  {
    path: "/",
    element: <LayoutContainer />,
    children: [{ path: "/Home", element: lazyLoad(<Home />) }],
  },
  {
    path: "/default",
    element: <LayoutBlank />,
    children: [{ path: "/default/Home", element: lazyLoad(<Home />) }],
  },
  { path: "*", element: lazyLoad(<NotFound />) },
];

export default routes;
