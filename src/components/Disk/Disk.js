import React from "react";
import { useSelector } from "react-redux";
import useDialog from "../../hooks/useDialog";
import Dialog from "../Dialog/Dialog";
import CreateDirFormDialog from "../Dialog/DialogForms/CreateDirFormDialog";

function Disk({ onCreateDir, onOpenDir, onPopFromStack }) {
  const { open, cancelButtonRef, onToggle, onSubmit } = useDialog(onCreateDir);
  const dirStack = useSelector((state) => state.file.dirStack);

  const backClickHandler = () => {
    const backDirId = [...dirStack].pop();

    onOpenDir(backDirId);
    onPopFromStack();
  };
  return (
    <>
      <div className="mt-5">
        <div className="flex">
          <button
            className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 max-w-[120px]"
            onClick={backClickHandler}
          >
            Back
          </button>
          <button
            className="w-full px-4 py-2 ml-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 max-w-[200px]"
            onClick={onToggle}
          >
            Create a folder
          </button>
        </div>
      </div>

      <Dialog open={open} cancelButtonRef={cancelButtonRef} onToggle={onToggle}>
        <CreateDirFormDialog onSubmit={onSubmit} onToggle={onToggle} />
      </Dialog>
    </>
  );
}

export default Disk;
