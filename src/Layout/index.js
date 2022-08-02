import React from "react";
import { Outlet } from "react-router-dom";
import Container from "../components/Container/Container";
import NavBar from "../components/NavBar/NavBar";

function Layout({ dispatch, isAuth, avatarUrl }) {
  return (
    <>
      <NavBar dispatch={dispatch} isAuth={isAuth} avatarUrl={avatarUrl} />{" "}
      <main>
        <Container>
          <Outlet />
        </Container>
      </main>
    </>
  );
}

export default Layout;
