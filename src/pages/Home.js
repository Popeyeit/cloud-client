import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Disk from "../components/Disk/Disk";
import FileList from "../components/Disk/FileList/FileList";
import {
  createDirOperation,
  getFilesOperation,
  popFromStack,
  pushToStack,
  setCurrentDir,
} from "../store/file";

function Home() {
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.file.currentDir);
  const files = useSelector((state) => state.file.files);

  useEffect(() => {
    dispatch(getFilesOperation(currentDir));
  }, [currentDir, dispatch]);

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

  return (
    <>
      <Disk
        currentDir={currentDir}
        onCreateDir={createDirHandler}
        onOpenDir={openDirHandler}
        onPopFromStack={popFromStackHandler}
      />
      <FileList
        files={files}
        onOpenDir={openDirHandler}
        onPushToStack={pushToStackHandler}
      />
    </>
  );
}

export default Home;
