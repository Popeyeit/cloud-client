import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUploadFile, showUploader } from "../../store/upload";
import UploaderFile from "./UploaderFile";

function Uploader() {
  const dispatch = useDispatch();

  const { isVisible, files } = useSelector((state) => {
    return {
      isVisible: state.upload.isVisible,
      files: state.upload.files,
    };
  });

  const closeUploaderHandler = () => {
    dispatch(showUploader(false));
    files.forEach((file) => removeUploadFileHandler(file.id));
  };
  const removeUploadFileHandler = (id) => {
    dispatch(removeUploadFile(id));
  };

  return (
    isVisible && (
      <div className="h-[300px] max-w-[300px] w-full fixed bg-[#566885] bottom-0 right-0 p-5 rounded-xl overflow-y-auto">
        <div className="flex justify-between pb-4 border-b-2 border-white">
          <div className="text-[#E9E6E6] text-xl">Uploading</div>
          <button className="text-white" onClick={closeUploaderHandler}>
            X
          </button>
        </div>
        <div className="mt-4">
          {files.map((file) => (
            <UploaderFile
              key={file.id}
              file={file}
              onRemoveFile={removeUploadFileHandler}
            />
          ))}
        </div>
      </div>
    )
  );
}

export default Uploader;
