import React from "react";

function UploaderFile({ file, onRemoveFile }) {
  return (
    <div className="bg-[#E9E6E6] rounded-lg my-1 py-1 px-2.5">
      <div className="flex justify-between">
        <div className="text-base">{file.name}</div>
        <button
          onClick={() => {
            onRemoveFile(file.id);
          }}
        >
          X
        </button>
      </div>
      <div className="h-6 rounded-lg bg-[#566885] flex my-1">
        <div
          className={`rounded-lg ${
            file.error ? "bg-red-600 !w-full" : "bg-green-600"
          }`}
          style={{ width: file.progress + "%" }}
        />
        <div className="text-[#E9E6E6] left-[50%] absolute">
          {file.progress}%
        </div>
      </div>
    </div>
  );
}

export default UploaderFile;
