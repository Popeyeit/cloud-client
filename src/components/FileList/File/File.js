import React from "react";
import dirImg from "../../../assets/img/dir.svg";
import fileImg from "../../../assets/img/file.svg";
import { downloadFileOperation } from "../../../store/file";
import { sizeFormat } from "../../../utils/functions";
import "./styles.css";
//TODO: Change text in btns to icons
function File({ file, fileView, onOpenDir, onPushToStack, onRemoveFile }) {
  const handleClick = () => {
    if (file.type === "dir") {
      onOpenDir(file._id);
      onPushToStack(file._id);
    }
  };

  const downloadClickHandler = (e) => {
    e.stopPropagation();
    downloadFileOperation(file);
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    onRemoveFile(file);
  };

  if (fileView === "list") {
    return (
      <div
        className="cursor-pointer my-2.5 border-b-2 border-color-[#566885] grid grid-cols-file items-center file"
        onClick={handleClick}
      >
        <img
          src={file.type === "dir" ? dirImg : fileImg}
          alt=""
          className="justify-self-center hover:scale-110"
        />
        <div className="col-start-2 text-lg md:text-xl">{file.name}</div>
        <div className="col-start-5 text-lg justify-self-center md:text-xl file__date">
          {file.date.slice(0, 10)}
        </div>
        <div className="col-start-6 text-lg justify-self-center md:text-xl file__size">
          {sizeFormat(file.size)}
        </div>
        {file.type !== "dir" && (
          <button
            onClick={downloadClickHandler}
            className="file__btn file__download w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 max-w-[120px]"
          >
            Download
          </button>
        )}
        <button
          onClick={handleRemoveFile}
          className="file__btn file__delete w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 max-w-[120px]"
        >
          Delete
        </button>
      </div>
    );
  }

  if (fileView === "plate") {
    return (
      <div
        className="cursor-pointer truncate w-[150px] flex items-center  flex-col"
        onClick={handleClick}
      >
        <img
          src={file.type === "dir" ? dirImg : fileImg}
          alt=""
          className="mx-auto hover:scale-110 h-[100px] w-[100px]"
        />
        <div className="text-lg truncate md:text-xl line-clamp-1">
          {file.name}
        </div>
        <div className="flex flex-wrap justify-center">
          {file.type !== "dir" && (
            <button
              onClick={downloadClickHandler}
              className="w-full px-4 py-2 mb-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
            >
              Download
            </button>
          )}
          <button
            onClick={handleRemoveFile}
            className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

export default File;