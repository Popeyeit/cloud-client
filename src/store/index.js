import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import user from "./user";
import file from "./file";
import loader from "./loader";

const middleware = getDefaultMiddleware({
  immutableCheck: false,
  thunk: true,
});

export const store = configureStore({
  reducer: {
    auth: user,
    loader,
    file,
  },
  middleware,
  devTools: process.env.NODE_ENV !== "production",
});

// export const persistor = persistStore(store);
