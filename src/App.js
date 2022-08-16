import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { checkAuthOperation } from "./store/user";
import PrivateRouter from "./utils/PrivateRouter";
import PublicRouter from "./utils/PublicRouter";

//TODO: Optimize request to redux. When going to upload/remove multiple files it calls a lot of request to redux.

function App() {
  const dispatch = useDispatch();
  const { isAuth, avatar } = useSelector((state) => state.auth.user);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(checkAuthOperation());
    }
  }, []);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout dispatch={dispatch} isAuth={isAuth} avatarUrl={avatar} />
        }
      >
        <Route
          index
          element={
            <PrivateRouter isAuth={isAuth} redirectPath="login">
              <Home />
            </PrivateRouter>
          }
        />
        <Route
          path="login"
          element={
            <PublicRouter isAuth={isAuth} redirectPath="/">
              <Login />
            </PublicRouter>
          }
        />
        <Route
          path="profile"
          element={
            <PrivateRouter isAuth={isAuth} redirectPath="login">
              <Profile />
            </PrivateRouter>
          }
        />
        <Route
          path="registration"
          element={
            <PublicRouter isAuth={isAuth} redirectPath="/">
              <Registration />
            </PublicRouter>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}

export default App;
