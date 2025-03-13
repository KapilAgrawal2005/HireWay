import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
const AppLayout = () => {
  return (
    <div>
      <div className="grid_background"></div>
      <div className="mx-20">
        <Header />
      </div>
      <Outlet />
    </div>
  );
};

export default AppLayout;
