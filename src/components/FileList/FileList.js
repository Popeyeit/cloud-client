import React from "react";
import File from "./File/File";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";

function FileList({ files, fileView, onOpenDir, onPushToStack, onRemoveFile }) {
  const loader = useSelector((state) => state.loader);

  if (loader) {
    return <Loader />;
  }
  if (!files.length) {
    return (
      <div className="flex justify-center items-center  h-[calc(100vh-154px)]">
        Files weren't found
      </div>
    );
  }

  if (fileView === "list") {
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
                fileView={fileView}
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

  if (fileView === "plate") {
    return (
      <div className="grid grid-flow-col grid-rows-1 gap-4 mt-10">
        {files.map((file) => (
          <File
            key={file._id}
            fileView={fileView}
            file={file}
            onOpenDir={onOpenDir}
            onPushToStack={onPushToStack}
            onRemoveFile={onRemoveFile}
          />
        ))}
      </div>
    );
  }
}

export default React.memo(FileList);
