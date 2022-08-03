import React from "react";
import dirImg from "../../../../assets/img/dir.svg";
import fileImg from "../../../../assets/img/file.svg";

function File({ file, onOpenDir, onPushToStack }) {
  return (
    <div
      className="cursor-pointer my-2.5 border-b-2 border-color-[#566885] grid grid-cols-4 items-center "
      onClick={
        file.type === "dir"
          ? () => {
              onOpenDir(file._id);
              onPushToStack(file._id);
            }
          : ""
      }
    >
      <img
        src={file.type === "dir" ? dirImg : fileImg}
        alt=""
        className="justify-self-center hover:scale-110"
      />
      <div className="text-lg md:text-xl">{file.name}</div>
      <div className="col-start-4 text-lg justify-self-center md:text-xl">
        {file.date.slice(0, 10)}
      </div>
      <div className="col-start-6 text-lg justify-self-center md:text-xl">
        {file.size}
      </div>
    </div>
  );
}

export default File;
