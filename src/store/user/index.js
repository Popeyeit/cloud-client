import { createSlice, combineReducers } from "@reduxjs/toolkit";
import axios from "axios";
import AuthService from "../../services/AuthService";
import { setLoader, unsetLoader } from "../loader";
import { API_URL } from "../../http";

const initialState = {
  user: {},
  isAuth: false,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    register: (_, { payload }) => payload,
    login: (_, { payload }) => payload,
    checkAuth: (_, { payload }) => payload,
    logout: () => initialState,
  },
});

export const registerOperation = (data) => async (dispatch) => {
  try {
    dispatch(setLoader(true));
    const res = await AuthService.registration(data);
    dispatch(login({ email: res.data.user.email, isAuth: true }));
    localStorage.setItem("token", res.data.accessToken);
  } catch (error) {
    console.log(error.response?.data?.message);
  } finally {
    dispatch(unsetLoader(false));
  }
};

export const loginOperation = (data) => async (dispatch) => {
  try {
    dispatch(setLoader(true));

    const res = await AuthService.login(data);
    dispatch(login({ email: res.data.user.email, isAuth: true }));
    localStorage.setItem("token", res.data.accessToken);
  } catch (error) {
    console.log(error.response?.data?.message);
  } finally {
    dispatch(unsetLoader(false));
  }
};

export const logoutOperation = () => async (dispatch) => {
  try {
    await AuthService.logout();
    dispatch(logout());
    localStorage.removeItem("token");
  } catch (error) {
    console.log(error.response?.data?.message);
  }
};

export const checkAuthOperation = () => async (dispatch) => {
  try {
    dispatch(setLoader(true));

    const res = await axios.get(`${API_URL}/auth/refresh`, {
      withCredentials: true,
    });
    dispatch(checkAuth({ email: res.data.user.email, isAuth: true }));
    localStorage.setItem("token", res.data.accessToken);
  } catch (error) {
    console.log(error.response?.data?.message);
  } finally {
    dispatch(unsetLoader(false));
  }
};

const { actions, reducer } = authSlice;
export const { register, login, checkAuth, logout } = actions;

export default combineReducers({
  user: reducer,
});
