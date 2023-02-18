import React from "react";
import { Link, Outlet, RouteObject } from "react-router-dom";
import router from "@/router";
import "./index.css";

const createMenu = (router: RouteObject[]) => <>{router.map(createMenuItem)}</>;

const createMenuItem = (route: RouteObject) => {
  return (
    <div style={{ paddingLeft: 20 }} key={route.path}>
      <Link key={route.path} to={route.path!}>
        {route.path}
      </Link>
      {Array.isArray(route.children) && createMenu(route.children)}
    </div>
  );
};

const LayoutContainer: React.FC = () => {
  return (
    <div className="container">
      <div className="side">
        <div className="logo">
          <span>Tiny</span>
        </div>
        {createMenu(router)}
      </div>
      <div className="content">
        <div className="header">
          <span>header</span>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutContainer;
