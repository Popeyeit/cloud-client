import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isVisible: false,
  files: [],
};

const uploaderSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    showUploader: (state, { payload }) => {
      return {
        ...state,
        isVisible: payload,
      };
    },

    addUploadFile: (state, { payload }) => {
      return {
        ...state,
        files: [payload, ...state.files],
      };
    },

    removeUploadFile: (state, { payload }) => {
      return {
        ...state,
        files: state.files.filter((file) => file.id !== payload),
      };
    },

    changeUploadFile: (state, { payload }) => {
      return {
        ...state,
        files: state.files.map((file) => {
          return file.id === payload.id
            ? { ...file, progress: payload.progress, error: payload.error }
            : { ...file };
        }),
      };
    },
  },
});

const { actions, reducer } = uploaderSlice;
export const {
  showUploader,
  addUploadFile,
  removeUploadFile,
  changeUploadFile,
} = actions;

export default reducer;
