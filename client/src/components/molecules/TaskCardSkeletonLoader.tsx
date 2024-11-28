import React from "react";

const TaskCardSkeletonLoader = () => {
  return (
    <div className="py-3 px-5 flex flex-col gap-y-2 items-start justify-center border border-zinc-700 rounded">
      <div className="flex justify-between w-full h-5 animate-pulse">
        <div className="h-5 bg-zinc-800 rounded w-1/2"></div>
        <div className="h-5 w-5 bg-zinc-800 rounded"></div>
      </div>
      <div className="h-12 bg-zinc-800 rounded w-full mt-2 animate-pulse"></div>
      <div className="flex items-center justify-between w-full gap-x-3 text-sm mt-1 animate-pulse">
        <div className="h-4 bg-zinc-800 rounded w-1/5"></div>
        <div className="h-4 bg-zinc-800 rounded w-1/5"></div>
        <div className="h-4 bg-zinc-800 rounded w-1/5"></div>
        <div className="h-4 bg-zinc-800 rounded w-1/5"></div>
        <div className="h-4 bg-zinc-800 rounded w-1/5"></div>
      </div>
    </div>
  );
};

export default TaskCardSkeletonLoader;
