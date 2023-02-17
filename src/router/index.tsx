import { lazy, Suspense } from "react";

import Loading from "@/components/Loading";

import LayoutContainer from "@/pages/_layouts/Container";
import LayoutBlank from "@/pages/_layouts/Blank";

import type { ReactNode } from "react";
import type { RouteObject } from "react-router-dom";

const Home = lazy(() => import("@/pages/Home"));
const Jump = lazy(() => import("@/pages/Jump"));

const NotFound = lazy(() => import("@/pages/404"));

const lazyLoad = (children: ReactNode): ReactNode => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

const router: RouteObject[] = [
  {
    path: "/",
    element: <LayoutContainer />,
    children: [
      { path: "/home", element: lazyLoad(<Home />) },
      { path: "/jump/:id", element: lazyLoad(<Jump />) },
    ],
  },
  {
    path: "/default",
    element: <LayoutBlank />,
    children: [
      { path: "/default/home", element: lazyLoad(<Home />) },
      { path: "/default/jump", element: lazyLoad(<Jump />) },
    ],
  },
  { path: "*", element: lazyLoad(<NotFound />) },
];

export default router;
