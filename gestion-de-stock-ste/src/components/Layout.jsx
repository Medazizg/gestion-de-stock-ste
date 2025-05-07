import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

const Layout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">
        <TopNavbar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;