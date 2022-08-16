import React from "react";
import File from "./File/File";
import { TransitionGroup, CSSTransition } from "react-transition-group";

function FileList({ files, onOpenDir, onPushToStack, onRemoveFile }) {
  return (
    <div className="mx-0 my-5">
      <div className="grid grid-cols-file">
        <div className="col-start-2 text-lg font-bold md:text-xl">Name</div>
        <div className="col-start-5 text-lg font-bold justify-self-center md:text-xl">
          Date
        </div>
        <div className="col-start-6 text-lg font-bold justify-self-center md:text-xl">
          Size
        </div>
      </div>
      <TransitionGroup>
        {files.map((file) => (
          <CSSTransition
            key={file._id}
            timeout={400}
            classNames={"file"}
            exit={false}
          >
            <File
              file={file}
              onOpenDir={onOpenDir}
              onPushToStack={onPushToStack}
              onRemoveFile={onRemoveFile}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
}

export default React.memo(FileList);
