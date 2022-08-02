import React from "react";

const Container = ({ className, children }) => {
  return (
    <div
      className={
        "container px-[13px] lg:px-[13px] lgx:px-[13px] xl:px-0 mx-auto " +
        className
      }
    >
      {children}
    </div>
  );
};

export default Container;
