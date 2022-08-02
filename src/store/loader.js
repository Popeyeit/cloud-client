import { createSlice } from "@reduxjs/toolkit";
const initialState = false;
const loader = createSlice({
  name: "loader",
  initialState,
  reducers: {
    setLoader: (_, { payload }) => payload,
    unsetLoader: (_, { payload }) => payload,
  },
});
const { actions, reducer } = loader;
export const { setLoader, unsetLoader } = actions;
export default reducer;
