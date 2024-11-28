import React from "react";

const Loader = ({ className }: { className: string }) => {
  return (
    <div
      className={`${className} w-5 h-5 border-[3px] border-b-transparent rounded-full animate-loader-spin-rotation`}
    />
  );
};

export default Loader;
