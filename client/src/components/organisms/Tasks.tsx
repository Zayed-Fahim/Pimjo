"use client";
import fetcher from "@/utils/fetcher";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../atoms";
import Task from "../molecules/Task";

export type TaskProps = {
  _id: string;
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: string;
  priority: string;
  createdAt: string;
  updatedAt: string;
};

const Tasks = () => {
  const { data: session } = useSession();
  const [tasks, setTasks] = useState<TaskProps[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetcher<{
        success: boolean;
        message: string;
        data: TaskProps[];
      }>({
        url: "http://localhost:3001/api/v1/tasks",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${session?.accessToken}`,
        },
      });

      setTasks(response?.data?.data);
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
  }, [session?.accessToken]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="pt-20 flex flex-col gap-y-8">
      <h1 className="text-3xl font-semibold">Tasks List</h1>
      <div className="flex items-start gap-x-10">
        <div className="w-full">
          {tasks?.map((task) => (
            <Task {...task} key={task?.id} />
          ))}
        </div>
        <Button
          className="font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2 w-auto text-nowrap"
          onClick={() => {}}
        >
          Add New Task
        </Button>
      </div>
    </div>
  );
};

export default Tasks;
