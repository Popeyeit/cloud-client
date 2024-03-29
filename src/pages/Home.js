import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Disk from "../components/Disk/Disk";
import FileList from "../components/FileList/FileList";
import useDraAndDrop from "../hooks/useDraAndDrop";
import {
  createDirOperation,
  deleteFileOperation,
  getFilesOperation,
  popFromStack,
  pushToStack,
  setCurrentDir,
  setFileView,
  uploadFileOperation,
} from "../store/file";

function Home() {
  const dispatch = useDispatch();
  const { currentDir, files, fileView } = useSelector((state) => state.file);
  const { dragEnter, onDragDrop, onDragEnter, onDragLeave } =
    useDraAndDrop(currentDir);

  const [sort, setSort] = useState("type");

  useEffect(() => {
    dispatch(getFilesOperation(currentDir, sort));
  }, [currentDir, sort, dispatch]);

  const pushToStackHandler = () => {
    dispatch(pushToStack(currentDir));
  };

  const createDirHandler = (name) => {
    dispatch(createDirOperation(currentDir, name));
  };

  const openDirHandler = (id) => {
    dispatch(setCurrentDir(id));
  };

  const popFromStackHandler = () => {
    dispatch(popFromStack());
  };

  const uploadFileHandler = (file) => {
    dispatch(uploadFileOperation(file, currentDir));
  };

  const RemoveFileHandler = (file) => {
    dispatch(deleteFileOperation(file));
  };

  const SortFilesHandler = (value) => {
    setSort(value);
  };

  const setFileViewHandler = (value) => {
    dispatch(setFileView(value));
  };

  return (
    <>
      {!dragEnter ? (
        <div
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDragOver={onDragEnter}
        >
          <Disk
            currentDir={currentDir}
            sort={sort}
            onCreateDir={createDirHandler}
            onOpenDir={openDirHandler}
            onPopFromStack={popFromStackHandler}
            onUploadFile={uploadFileHandler}
            onSortFiles={SortFilesHandler}
            onSetView={setFileViewHandler}
          />
          <FileList
            files={files}
            fileView={fileView}
            onOpenDir={openDirHandler}
            onPushToStack={pushToStackHandler}
            onRemoveFile={RemoveFileHandler}
          />
        </div>
      ) : (
        <div
          className="w-full h-[90vh] m-5 border-2 border-[#566885] border-dashed flex justify-center items-center text-4xl"
          onDrop={onDragDrop}
          onDragLeave={onDragLeave}
          onDragEnter={onDragEnter}
          onDragOver={onDragEnter}
        >
          Move your file here
        </div>
      )}
    </>
  );
}

export default Home;
