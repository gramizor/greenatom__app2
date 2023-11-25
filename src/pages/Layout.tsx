import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { userStore } from "../store/user.store";
import Header from "../components/Header/Header";

const Layout = () => {
  useEffect(() => {
    console.log(userStore.user);
  }, [userStore.user]);

  return (
    <div>
      <Header />
      <h1>{userStore.user.username}</h1>
      <Outlet />
      <footer>FOOTER</footer>
    </div>
  );
};

export default Layout;
