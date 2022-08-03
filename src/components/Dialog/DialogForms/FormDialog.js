import React from "react";
import { Dialog } from "@headlessui/react";

function FormDialog({
  title = "Created Dir",
  value,
  cancelButtonRef,
  children,
  onToggle,
  onSubmit,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
        <div className="w-full sm:flex sm:items-start">
          <div className="w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-lef">
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900"
            >
              {title}
            </Dialog.Title>
            <div className="w-full mt-2">{children}</div>
          </div>
        </div>
      </div>
      <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
        <button className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">
          Create
        </button>
        <button
          type="button"
          className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={onToggle}
          ref={cancelButtonRef}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default FormDialog;
