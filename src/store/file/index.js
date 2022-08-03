import { createSlice } from "@reduxjs/toolkit";

import FileService from "../../services/FileService";

const initialState = {
  files: [],
  currentDir: null,
  dirStack: [],
};

const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    setFiles: (state, { payload }) => {
      return {
        currentDir: state.currentDir,
        files: payload,
        dirStack: state.dirStack,
      };
    },
    setCurrentDir: (state, { payload }) => {
      return {
        files: state.files,
        currentDir: payload,
        dirStack: state.dirStack,
      };
    },
    addFile: (state, { payload }) => {
      return {
        currentDir: state.currentDir,
        dirStack: state.dirStack,
        files: [payload, ...state.files],
      };
    },
    pushToStack: (state, { payload }) => {
      return {
        currentDir: state.currentDir,
        files: state.files,
        dirStack: [...state.dirStack, payload],
      };
    },
    popFromStack: (state, { payload }) => {
      const newDirStack = [...state.dirStack];
      newDirStack.pop();
      return {
        currentDir: state.currentDir,
        files: state.files,
        dirStack: newDirStack,
      };
    },
  },
});

export const getFilesOperation = (currentDir) => async (dispatch) => {
  try {
    const res = await FileService.getFiles(currentDir);
    dispatch(setFiles(res.data));
  } catch (error) {
    console.log(error.response?.data?.message);
  }
};

export const createDirOperation = (dirId, name) => async (dispatch) => {
  try {
    const res = await FileService.createDir({
      name,
      parent: dirId,
      type: "dir",
    });
    dispatch(addFile(res.data));
  } catch (error) {
    console.log(error.response?.data?.message);
  }
};

const { actions, reducer } = fileSlice;
export const { setFiles, setCurrentDir, addFile, pushToStack, popFromStack } =
  actions;

export default reducer;
