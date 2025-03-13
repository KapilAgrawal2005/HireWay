import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
const AppLayout = () => {
  return (
    <div>
      <div className="grid_background"></div>
      <div className="mx-5 sm:mx-10 md:mx-15">
        <Header />
      </div>
      <Outlet />
    </div>
  );
};

export default AppLayout;
