import { createSlice } from "@reduxjs/toolkit";
import api from "../../http";

import FileService from "../../services/FileService";
import {
  addUploadFile,
  changeUploadFile,
  errorUploadFile,
  showUploader,
} from "../upload";

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
        files: [...state.files.filter((file) => file._id !== payload)],
      };
    },
  },
});

export const getFilesOperation = (currentDir, sort) => async (dispatch) => {
  try {
    const res = await FileService.getFiles(currentDir, sort);
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
    let uploadFile;
    try {
      const formData = new FormData();
      formData.append("file", file);
      if (dirId) {
        formData.append("parent", dirId);
      }
      uploadFile = {
        name: file.name,
        progress: 0,
        id: Date.now(),
        error: false,
      };

      dispatch(showUploader(true));
      dispatch(addUploadFile(uploadFile));
      const res = await api.post("/files/upload", formData, {
        onUploadProgress: (progressEvent) => {
          const totalLength = progressEvent.lengthComputable
            ? progressEvent.total
            : progressEvent.target.getResponseHeader("content-length") ||
              progressEvent.target.getResponseHeader(
                "x-decompressed-content-length"
              );
          if (totalLength) {
            const changedUploadFile = {
              ...uploadFile,
              progress: Math.round((progressEvent.loaded * 100) / totalLength),
            };

            dispatch(changeUploadFile(changedUploadFile));
          }
        },
      });
      dispatch(addFile(res.data));
    } catch (e) {
      dispatch(changeUploadFile({ ...uploadFile, error: true }));
      console.log(e.response?.data?.message);
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
