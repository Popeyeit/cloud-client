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

    removeFile: (state, { payload }) => {
      return {
        currentDir: state.currentDir,
        dirStack: state.dirStack,
        files: [...state.files.filter((file) => file._id != payload)],
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

export const uploadFileOperation = (file, dirId) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      if (dirId) {
        formData.append("parent", dirId);
      }
      const res = await FileService.uploadFile(formData);

      dispatch(addFile(res.data));
    } catch (e) {
      alert(e.res.data.message);
    }
  };
};

export const downloadFileOperation = async (file) => {
  try {
    const res = await FileService.downloadFile(file._id);
    if (res.status === 200) {
      const downloadUrl = window.URL.createObjectURL(res.data);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  } catch (error) {
    console.log(error.response?.data?.message);
  }
};

export const deleteFileOperation = (file) => {
  return async (dispatch) => {
    try {
      const res = await FileService.deleteFile(file._id);
      dispatch(removeFile(file._id));
      alert(res.data.message);
    } catch (e) {
      alert(e?.response?.data?.message);
    }
  };
};

const { actions, reducer } = fileSlice;
export const {
  setFiles,
  setCurrentDir,
  addFile,
  pushToStack,
  popFromStack,
  removeFile,
} = actions;

export default reducer;
