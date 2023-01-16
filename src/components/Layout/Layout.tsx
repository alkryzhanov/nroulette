import React from "react";
import { Outlet } from "react-router";
import Footer from "../Footer/Footer";

const Layout = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
