import { createSlice, combineReducers } from "@reduxjs/toolkit";
import axios from "axios";
import AuthService from "../../services/AuthService";
import { API_URL } from "../../http";
import UserService from "../../services/UserService";

const initialState = {
  user: {},
  isAuth: false,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => payload,
    logout: () => initialState,
  },
});

export const registerOperation = (data) => async (dispatch) => {
  try {
    const res = await AuthService.registration(data);
    dispatch(setUser({ ...res.data.user, isAuth: true }));
    localStorage.setItem("token", res.data.accessToken);
  } catch (error) {
    console.log(error.response?.data?.message);
  }
};

export const loginOperation = (data) => async (dispatch) => {
  try {
    const res = await AuthService.login(data);
    dispatch(setUser({ ...res.data.user, isAuth: true }));
    localStorage.setItem("token", res.data.accessToken);
  } catch (error) {
    console.log(error.response?.data?.message);
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
    const res = await axios.get(`${API_URL}/auth/refresh`, {
      withCredentials: true,
    });
    dispatch(setUser({ ...res.data.user, isAuth: true }));
    localStorage.setItem("token", res.data.accessToken);
  } catch (error) {
    localStorage.removeItem("token");
    console.log(error.response?.data?.message);
  }
};

export const uploadAvatarOperation = (file) => async (dispatch) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await UserService.uploadAvatar(formData);

    dispatch(setUser(res.data));
  } catch (error) {
    console.log(error.response?.data?.message);
  }
};

export const deleteAvatarOperation = () => async (dispatch) => {
  try {
    const res = await UserService.deleteAvatar();

    dispatch(setUser(res.data));
  } catch (error) {
    console.log(error.response?.data?.message);
  }
};

const { actions, reducer } = authSlice;
export const { setUser, logout } = actions;

export default combineReducers({
  user: reducer,
});
