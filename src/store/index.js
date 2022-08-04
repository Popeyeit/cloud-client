import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import user from "./user";
import fileReducer from "./file";
import loader from "./loader";

const middleware = getDefaultMiddleware({
  immutableCheck: false,
  thunk: true,
});

export const store = configureStore({
  reducer: {
    auth: user,
    loader,
    file: fileReducer,
  },
  middleware,
  devTools: process.env.NODE_ENV !== "production",
});
