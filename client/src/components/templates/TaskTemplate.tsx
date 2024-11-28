"use client";
import fetcher from "@/utils/fetcher";
import { getPriorityStyle, getStatusStyle } from "@/utils/getStyles";
import { parseDateTime } from "@/utils/parseDateTime";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Button, Loader } from "@/components/atoms";
import { Back } from "@/constant";

type TaskProps = {
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

const TaskTemplate = () => {
  const { data: session } = useSession();
  const { slug } = useParams();
  const router = useRouter();
  const [taskDetails, setTaskDetails] = useState<TaskProps>({} as TaskProps);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const task = useCallback(async () => {
    try {
      if (session) {
        setIsLoading(true);
        const response = await fetcher<{
          success: boolean;
          message: string;
          data: TaskProps;
        }>({
          url: `http://localhost:3001/api/v1/tasks/${slug}`,
          method: "GET",
          headers: {
            Authorization: `${session?.accessToken}`,
          },
        });
        if (response?.data?.success) {
          setTaskDetails(response?.data?.data);
          setIsLoading(false);
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
        setIsLoading(false);
      } else {
        console.error("Unexpected error:", error);
        setIsLoading(false);
      }
    }
  }, [slug, session]);

  useEffect(() => {
    task();
  }, [task]);

  useEffect(() => {
    if (taskDetails?.title) {
      document.title = `${taskDetails.title} | Task Nest`;
    }
  }, [taskDetails?.title]);

  return isLoading ? (
    <div className="mt-20 w-full flex justify-center items-center">
      <Loader className="border-white" />
    </div>
  ) : (
    <div className="mt-20 w-full flex flex-col gap-y-5">
      <Button
        className="flex items-center gap-x-2 cursor-pointer"
        onClick={() => router.back()}
      >
        <Back className="w-6 h-6" />
        <p className="text-white">Go Back</p>
      </Button>
      <div className="flex flex-col gap-y-10">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl italic">
            Title: <span className="not-italic">{taskDetails?.title}</span>
          </h1>
          <div className="flex gap-x-5">
            <p className="italic">
              Task Status:{" "}
              <span
                className={`${getStatusStyle(taskDetails?.status)} not-italic`}
              >
                {taskDetails?.status}
              </span>
            </p>
            <p className="italic">
              Priority Level:{" "}
              <span
                className={`${getPriorityStyle(
                  taskDetails?.priority
                )} not-italic`}
              >
                {taskDetails?.priority}
              </span>
            </p>
            <p className="italic">
              Due Date:{" "}
              <span className="not-italic text-zinc-400">
                {taskDetails?.dueDate && parseDateTime(taskDetails?.dueDate)}
              </span>
            </p>
          </div>
        </div>

        <div className="h-full">
          <p className="italic text-xl min-h-[600px]">
            Description:{" "}
            <span className="not-italic text-zinc-400">
              {taskDetails?.description}
            </span>
          </p>
          <div className="flex gap-x-5 justify-end items-center">
            <p className="italic">
              Task Created:{" "}
              <span className="not-italic text-zinc-400">
                {taskDetails?.createdAt &&
                  parseDateTime(taskDetails?.createdAt)}
              </span>
            </p>
            <p className="italic">
              Last Modified:{" "}
              <span className="not-italic text-zinc-400">
                {taskDetails?.status && parseDateTime(taskDetails?.updatedAt)}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskTemplate;
