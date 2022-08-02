import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Home from "./pages/Home";
import { checkAuthOperation } from "./store/user";
import PrivateRouter from "./utils/PrivateRouter";
import PublicRouter from "./utils/PublicRouter";

function App() {
  const dispatch = useDispatch();
  const { isAuth, isLoading } = useSelector((state) => {
    return {
      isAuth: state.auth.user.isAuth,
      isLoading: state.loader,
    };
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(checkAuthOperation());
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout dispatch={dispatch} isAuth={isAuth} />}>
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
