import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { uploadFileOperation } from "../store/file";

function useDraAndDrop(currentDir) {
  const [dragEnter, setDragEnter] = useState(false);
  const dispatch = useDispatch();

  const dragEnterHandler = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();

    setDragEnter(true);
  }, []);

  const dragLeaveHandler = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragEnter(false);
  }, []);

  const dropHandler = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    let files = [...event.dataTransfer.files];
    console.log("files", files);
    files.forEach((file) => dispatch(uploadFileOperation(file, currentDir)));
    setDragEnter(false);
  }, []);

  return {
    dragEnter,
    onDragEnter: dragEnterHandler,
    onDragLeave: dragLeaveHandler,
    onDragDrop: dropHandler,
  };
}

export default useDraAndDrop;
