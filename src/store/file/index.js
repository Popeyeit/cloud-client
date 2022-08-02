import { createSlice, combineReducers } from "@reduxjs/toolkit";
import axios from "axios";
import { setLoader, unsetLoader } from "../loader";
import { API_URL } from "../../http";

const initialState = {};

const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    register: (_, { payload }) => payload,
    login: (_, { payload }) => payload,
    checkAuth: (_, { payload }) => payload,
    logout: () => initialState,
  },
});

const { actions, reducer } = fileSlice;
export const { register, login, checkAuth, logout } = actions;

export default reducer;
