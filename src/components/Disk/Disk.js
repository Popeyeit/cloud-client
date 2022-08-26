import React from "react";
import { useSelector } from "react-redux";
import useDialog from "../../hooks/useDialog";
import Dialog from "../Dialog/Dialog";
import CreateDirFormDialog from "../Dialog/DialogForms/CreateDirFormDialog";
import Sort from "../Sort/Sort";
import Uploader from "../Uploader/Uploader";
//TODO: Change text in btns to icons
function Disk({
  sort,
  onSortFiles,
  onCreateDir,
  onOpenDir,
  onUploadFile,
  onPopFromStack,
  onSetView,
}) {
  const { open, cancelButtonRef, onToggle, onSubmit } = useDialog(onCreateDir);
  const dirStack = useSelector((state) => state.file.dirStack);

  const backClickHandler = () => {
    const backDirId = [...dirStack].pop();

    onOpenDir(backDirId);
    onPopFromStack();
  };

  const fileUploadHandler = (event) => {
    const files = [...event.target.files];
    files.forEach((file) => onUploadFile(file));
  };

  // TODO: Find and set icons for btn.
  return (
    <>
      <div className="mt-5">
        <div className="flex justify-between">
          <div className="flex items-center">
            {!!dirStack.length && (
              <button
                className="w-full px-4 py-2 text-sm font-medium text-white bg-center bg-no-repeat bg-contain border border-transparent rounded-md bg-back group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-[24px] h-[13px]"
                onClick={backClickHandler}
              ></button>
            )}
            <button
              className="w-[200px] px-4 py-2 ml-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 max-w-[200px]"
              onClick={onToggle}
            >
              Create a folder
            </button>
            <label
              htmlFor="disk__upload-input"
              className="cursor-pointer text-center w-full px-4 py-2 ml-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 max-w-[120px]"
            >
              Upload file
            </label>
            <input
              multiple={true}
              onChange={fileUploadHandler}
              type="file"
              id="disk__upload-input"
              className="hidden"
            />
          </div>
          <div className="flex items-center">
            <Sort sort={sort} onSortFiles={onSortFiles} />
            <div className="flex items-center ml-6">
              <button
                className="w-5 h-5 mr-5 bg-center bg-no-repeat bg-contain b-none bg-multiple_square"
                onClick={() => onSetView("plate")}
              ></button>
              <button
                className="w-5 h-5 bg-center bg-no-repeat bg-contain b-none bg-list"
                onClick={() => onSetView("list")}
              ></button>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={open} cancelButtonRef={cancelButtonRef} onToggle={onToggle}>
        <CreateDirFormDialog onSubmit={onSubmit} onToggle={onToggle} />
      </Dialog>
      <Uploader />
    </>
  );
}

export default Disk;
