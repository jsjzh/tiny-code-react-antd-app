import React from "react";
import { Outlet, Link } from "react-router-dom";

import routes, { IRoute } from "@/routes";
import KeepAlive from "@/components/KeepAlive";

const createLinks = (routes: IRoute[]) => {
  const results: React.ReactNode[] = [];

  for (let index = 0; index < routes.length; index++) {
    const route = routes[index];
    if (route.hide) continue;
    if (Array.isArray(route.children) && route.children.length) {
      results.push(...createLinks(route.children));
    } else {
      results.push(
        <Link key={route.path} to={route.path}>
          {route.title} &nbsp;
        </Link>,
      );
    }
  }

  return results;
};

const Main: React.FC = () => {
  return (
    <div>
      <div>{createLinks(routes)}</div>
      <KeepAlive include={[]} keys={[]} />
    </div>
  );
};

export default Main;
