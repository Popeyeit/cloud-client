import React from "react";
import File from "./File/File";

function FileList({ files, onOpenDir, onPushToStack }) {
  return (
    <div className="mx-0 my-5">
      <div className="grid grid-cols-4">
        <div className="col-start-2 text-lg font-bold md:text-xl">Name</div>
        <div className="col-start-4 text-lg font-bold justify-self-center md:text-xl">
          Date
        </div>
        <div className="col-start-6 text-lg font-bold justify-self-center md:text-xl">
          Size
        </div>
      </div>
      {files.map((file) => (
        <File
          key={file._id}
          file={file}
          onOpenDir={onOpenDir}
          onPushToStack={onPushToStack}
        />
      ))}
    </div>
  );
}

export default FileList;
