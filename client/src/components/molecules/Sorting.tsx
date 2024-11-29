import React from "react";
import { Popover } from "@/components/molecules";
import { Sort } from "@/constant";
import { Button } from "@/components/atoms";

interface SortingProps {
  onSortChange: (sort: string) => void;
}

const Sorting: React.FC<SortingProps> = ({ onSortChange }) => {
  const handleSort = (sort: string) => {
    onSortChange(sort);
  };

  return (
    <Popover
      trigger={
        <Button className="hover:bg-zinc-800 rounded p-2 flex items-center justify-center gap-x-2">
          <h1 className="text-sm font-semibold">Sort</h1>
          <Sort className="w-5 h-5" />
        </Button>
      }
      className="right-0 top-10 border border-zinc-800 w-[160px] shadow-xl rounded-sm"
    >
      <Button
        className="w-full px-4 py-2 border-b border-zinc-800 hover:bg-zinc-900"
        onClick={() => handleSort("newest")}
      >
        Newest
      </Button>
      <Button
        className="w-full px-4 py-2 border-b border-zinc-800 hover:bg-zinc-900"
        onClick={() => handleSort("oldest")}
      >
        Oldest
      </Button>
    </Popover>
  );
};

export default Sorting;
