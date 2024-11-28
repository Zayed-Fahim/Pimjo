import React from "react";
import { TaskProps } from "../organisms/Tasks";
import { Actions } from "@/constant";
import { parseDateTime } from "@/utils/parseDateTime";
import { Button, Link } from "../atoms";

const Task = ({
  _id,
  title,
  description,
  dueDate,
  status,
  createdAt,
  updatedAt,
  priority,
}: TaskProps) => {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Pending":
        return "text-orange-500 font-bold";
      case "In Progress":
        return "text-blue-500 font-bold";
      case "Completed":
        return "text-green-500 font-bold";
      default:
        return "";
    }
  };

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case "Low":
        return "text-gray-500";
      case "Medium":
        return "text-yellow-500";
      case "High":
        return "text-red-500";
      default:
        return "";
    }
  };

  return (
    <div className="py-3 px-5 flex flex-col gap-y-2 items-start justify-center border border-zinc-700 rounded">
      <div className="flex justify-between w-full">
        <Link href={`/me/tasks/${_id}`}>
          <h1 className="text-[18px] font-semibold">{title}</h1>
        </Link>
        <Button className="hover:bg-zinc-800 rounded p-2">
          <Actions className="w-4 h-4 cursor-pointer" />
        </Button>
      </div>
      <div>
        <p>
          {description && description.length > 200
            ? description.slice(0, 300) + "..."
            : description}
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-between w-full text-sm">
        <h1 className="italic">
          Created:{" "}
          <span className="not-italic text-zinc-400">
            {parseDateTime(createdAt)}
          </span>
        </h1>
        <h1 className="italic">
          Updated:{" "}
          <span className="not-italic text-zinc-400">
            {parseDateTime(updatedAt)}
          </span>
        </h1>

        <h1 className="italic">
          Status:{" "}
          <span className={`${getStatusStyle(status)} not-italic`}>
            {status}
          </span>
        </h1>
        <h1 className="italic">
          Priority:{" "}
          <span className={`${getPriorityStyle(priority)} not-italic`}>
            {priority}
          </span>
        </h1>
        <h1 className="italic">
          Due:{" "}
          <span className="not-italic text-zinc-400">
            {parseDateTime(dueDate)}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default Task;
