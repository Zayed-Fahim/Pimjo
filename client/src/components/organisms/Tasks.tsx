"use client";
import { Button } from "@/components/atoms";
import {
  EmptyState,
  Modal,
  Task,
  TaskCardSkeletonLoader,
} from "@/components/molecules";
import { TaskModalForm } from "@/components/organisms";
import { TaskFormData, TaskProps } from "@/libs/task.type";
import fetcher from "@/utils/fetcher";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import Filtering from "../molecules/Filtering";
import Sorting from "../molecules/Sorting";

const Tasks = () => {
  const { data: session } = useSession();
  const [tasks, setTasks] = useState<TaskProps[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOption, setSortOption] = useState<string>("");
  const [filterOption, setFilterOption] = useState<{
    status?: string;
    dueDate?: string;
    priority?: string;
  } | null>({
    status: "",
    dueDate: "",
    priority: "",
  });
  const [submissionStatus, setSubmissionStatus] = useState<{
    type: "success" | "error" | "default";
    message: string;
  }>({
    type: "default",
    message: "",
  });

  const fetchTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      if (session?.accessToken) {
        const queryParams = new URLSearchParams({
          ...(sortOption && { sortBy: sortOption }),
          ...(filterOption?.status && { status: filterOption.status }),
          ...(filterOption?.dueDate && { dueDate: filterOption.dueDate }),
          ...(filterOption?.priority && { priority: filterOption.priority }),
        }).toString();

        const response = await fetcher<{
          success: boolean;
          message: string;
          data: TaskProps[];
        }>({
          url: `http://localhost:3001/api/v1/tasks?${queryParams}`,
          method: "GET",
          headers: {
            Authorization: `${session?.accessToken}`,
          },
        });
        setTasks(response?.data?.data);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
        setIsLoading(false);
      } else {
        console.error("Unexpected error:", error);
        setIsLoading(false);
      }
    } finally {
      setIsLoading(false);
    }
  }, [session?.accessToken, sortOption, filterOption]);

  const handleCreateTask = async (data: TaskFormData) => {
    try {
      setIsLoading(true);
      const newData = { ...data, userId: session?.user?.id };
      const result = await fetcher<{
        success: boolean;
        message: string;
        data: TaskProps;
      }>({
        url: "http://localhost:3001/api/v1/tasks",
        method: "POST",
        data: newData,
        headers: {
          Authorization: `${session?.accessToken}`,
        },
      });

      await fetchTasks();
      setIsLoading(false);
      setSubmissionStatus({
        type: "success",
        message: result?.data?.message,
      });
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmissionStatus({ type: "default", message: "" });
      }, 1000);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
        setSubmissionStatus({
          type: "error",
          message: error.message,
        });
        setIsLoading(false);
      } else {
        console.error("Unexpected error:", error);
        setSubmissionStatus({
          type: "error",
          message: "An unexpected error occurred.",
        });
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="pt-20 flex flex-col gap-y-8">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Tasks List</h1>
        <div className="flex items-center gap-x-3 ">
          <Sorting onSortChange={setSortOption} />
          <Filtering onFilterChange={setFilterOption} isLoading={isLoading} />
        </div>
      </div>
      <div className="flex items-start gap-x-3 md:gap-x-10">
        <div className="w-full flex flex-col gap-y-4">
          {isLoading ? (
            Array(3)
              .fill(null)
              .map((_, index) => <TaskCardSkeletonLoader key={index} />)
          ) : tasks?.length === 0 ? (
            <EmptyState
              message={
                !filterOption
                  ? "No tasks found! Create a new task."
                  : `No tasks found for ${filterOption?.status} and ${filterOption?.dueDate} which has priority ${filterOption?.priority}!`
              }
            />
          ) : (
            tasks?.map((task) => (
              <Task {...task} key={task?.id} fetchTasks={fetchTasks} />
            ))
          )}
        </div>

        <Button
          className="font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2 text-nowrap"
          onClick={() => setIsModalOpen(true)}
        >
          Add New Task
        </Button>
      </div>
      <Modal
        isOpen={isModalOpen}
        title="Create New Task"
        onClose={() => setIsModalOpen(false)}
      >
        <TaskModalForm
          isLoading={isLoading}
          submissionStatus={submissionStatus}
          onSubmit={handleCreateTask}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default Tasks;
