"use client";
import React, { useState } from "react";
import { Actions } from "@/constant";
import { parseDateTime } from "@/utils/parseDateTime";
import { Button, Link, Loader, Message } from "@/components/atoms";
import { TaskFormData, TaskProps } from "@/libs/task.type";
import { Popover, Modal } from "@/components/molecules";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import fetcher from "@/utils/fetcher";
import { TaskModalForm } from "@/components/organisms";
import { getPriorityStyle, getStatusStyle } from "@/utils/getStyles";

const Task = ({
  _id,
  title,
  description,
  dueDate,
  status,
  createdAt,
  updatedAt,
  priority,
  fetchTasks,
}: TaskProps) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeleteModalOpen, setDeleteIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<{
    type: "success" | "error" | "default";
    message: string;
  }>({
    type: "default",
    message: "",
  });

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const response = await fetcher<{
        success: boolean;
        message: string;
        data: null;
      }>({
        url: `http://localhost:3001/api/v1/tasks/${_id}`,
        method: "DELETE",
        headers: {
          Authorization: `${session?.accessToken}`,
        },
      });
      if (response?.data?.success) {
        await fetchTasks();
        setSubmissionStatus({
          type: "success",
          message: "Task deleted successfully.",
        });
        setTimeout(() => {
          router.refresh();
        }, 1000);
      }
    } catch (error: unknown) {
      setSubmissionStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred.",
      });
    } finally {
      setIsLoading(false);
      setDeleteIsModalOpen(false);
    }
  };

  const handleEdit = async (data: TaskFormData) => {
    try {
      setIsLoading(true);
      const response = await fetcher<{
        success: boolean;
        message: string;
        data: null;
      }>({
        url: `http://localhost:3001/api/v1/tasks/${_id}`,
        method: "PUT",
        data,
        headers: {
          Authorization: `${session?.accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response?.data?.success) {
        await fetchTasks();
        setSubmissionStatus({
          type: "success",
          message: "Task updated successfully.",
        });
        setIsEditModalOpen(false);
        setTimeout(() => {
          router.refresh();
        }, 1000);
      }
    } catch (error: unknown) {
      setSubmissionStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-3 px-5 flex flex-col gap-y-2 items-start justify-center border border-zinc-700 rounded">
      <div className="flex justify-between w-full">
        <Link href={`/me/tasks/${_id}`}>
          <h1 className="text-[18px] font-semibold">{title}</h1>
        </Link>

        <Popover
          trigger={
            <Button className="hover:bg-zinc-800 rounded p-2">
              <Actions className="w-4 h-4 cursor-pointer" />
            </Button>
          }
          className="right-0 top-8 border border-zinc-800 w-[160px] shadow-xl rounded-sm"
        >
          <Button
            onClick={() => router.push(`/me/tasks/${_id}`)}
            className="w-full px-4 py-2 border-b border-zinc-800 hover:bg-zinc-900"
          >
            View
          </Button>
          <Button
            onClick={() => setIsEditModalOpen(true)}
            className="w-full px-4 py-2 border-b border-zinc-800 hover:bg-zinc-900"
          >
            Edit
          </Button>
          <Button
            onClick={() => {
              setSubmissionStatus({
                type: "default",
                message: "",
              });
              setDeleteIsModalOpen(true);
            }}
            className="w-full px-4 py-2 hover:bg-zinc-900"
          >
            Delete
          </Button>
        </Popover>
      </div>
      <div>
        <p>
          {description && description.length > 200
            ? description.slice(0, 200) + "..."
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

      <Modal
        isOpen={isDeleteModalOpen}
        title={
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Are you sure?</h1>
            <p className="text-zinc-400 text-sm">
              You want to delete this task.
            </p>
            <p className="text-zinc-400 text-sm">
              This action cannot be undone.
            </p>
          </div>
        }
        onClose={() => {
          setSubmissionStatus({
            type: "default",
            message: "",
          });
          setDeleteIsModalOpen(false);
        }}
      >
        {submissionStatus.type !== "default" && (
          <Message
            type={submissionStatus.type}
            text={submissionStatus.message}
          />
        )}
        <div className="flex gap-x-5 justify-center mt-4">
          <Button
            onClick={() => setDeleteIsModalOpen(false)}
            className="font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            className="font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-red-500 text-white h-10 px-4 py-2"
          >
            <div className="flex justify-center items-center gap-x-5">
              <p>Delete</p>
              {isLoading && <Loader className="border-white" />}
            </div>
          </Button>
        </div>
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        title="Update your task!"
        onClose={() => {
          setSubmissionStatus({
            type: "default",
            message: "",
          });
          setIsEditModalOpen(false);
        }}
      >
        {submissionStatus.type !== "default" && (
          <Message
            type={submissionStatus.type}
            text={submissionStatus.message}
          />
        )}
        <TaskModalForm
          onSubmit={handleEdit}
          onClose={() => setIsEditModalOpen(false)}
          isLoading={isLoading}
          submissionStatus={submissionStatus}
          task={{
            title,
            description,
            dueDate,
            status,
            priority,
          }}
        />
      </Modal>
    </div>
  );
};

export default Task;
