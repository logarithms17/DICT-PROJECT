import React from "react";
import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import Footer from "../components/Footer";

const SharedLayout = () => {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <MainNavigation />
      <div className=" flex flex-col justify-center items-center">
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default SharedLayout;
