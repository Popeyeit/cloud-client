import React from "react";

function Loader() {
  return (
    <div className="flex justify-center items-center  h-[calc(100vh-154px)]">
      <div className="lds-dual-ring"></div>
    </div>
  );
}

export default Loader;
