import { createSlice } from "@reduxjs/toolkit";
const initialState = false;
const loader = createSlice({
  name: "loader",
  initialState,
  reducers: {
    setLoader: (_, { payload }) => payload,
  },
});
const { actions, reducer } = loader;
export const { setLoader } = actions;
export default reducer;
