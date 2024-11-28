"use client";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { TaskFormData, TaskModalProps } from "@/libs/task.type";
import { Button, Loader, Message } from "../atoms";
import {
  InputFormField,
  TextareaFormField,
  SelectFormField,
} from "@/components/molecules";
import { useEffect } from "react";
import { formatDateForInput } from "@/utils/parseDateTime";

const taskSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "Title is required.",
  }),

  description: Joi.string().required().messages({
    "string.empty": "Description is required.",
  }),

  dueDate: Joi.date().required().messages({
    "date.base": "Due Date must be a valid date.",
    "any.required": "Due Date is required.",
  }),

  status: Joi.string()
    .valid("Pending", "In Progress", "Completed")
    .required()
    .messages({
      "any.only":
        "Status must be one of 'Pending', 'In Progress', or 'Completed'.",
      "string.empty": "Status is required.",
    }),

  priority: Joi.string().valid("Low", "Medium", "High").required().messages({
    "any.only": "Priority must be one of 'Low', 'Medium', or 'High'.",
    "string.empty": "Priority is required.",
  }),
});

const TaskModalForm = ({
  onSubmit,
  onClose,
  isLoading,
  submissionStatus,
  task,
}: TaskModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: joiResolver(taskSchema),
    defaultValues: task
      ? {
          title: task.title,
          description: task.description,
          dueDate: formatDateForInput(task.dueDate),
          status: task.status,
          priority: task.priority,
        }
      : undefined,
  });

  useEffect(() => {
    if (task)
      if (task) {
        reset({
          title: task.title,
          description: task.description,
          dueDate: formatDateForInput(task.dueDate),
          status: task.status,
          priority: task.priority,
        });
      }
  }, [task, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-[500px]"
    >
      <div>
        <InputFormField
          htmlFor="title"
          text="Title"
          name="title"
          type="text"
          id="title"
          register={register}
        />
        {errors.title && (
          <Message
            className="mt-1"
            type="error"
            text={errors.title.message as string}
          />
        )}
      </div>
      <div>
        <TextareaFormField
          htmlFor="description"
          text="Description"
          name="description"
          id="description"
          register={register}
        />
        {errors.description && (
          <Message
            className="mt-1"
            type="error"
            text={errors.description.message as string}
          />
        )}
      </div>
      <div>
        <InputFormField
          htmlFor="dueDate"
          text="Due Date"
          name="dueDate"
          type="datetime-local"
          id="dueDate"
          register={register}
        />
        {errors.dueDate && (
          <Message
            className="mt-1"
            type="error"
            text={errors.dueDate.message as string}
          />
        )}
      </div>
      <div>
        <SelectFormField
          htmlFor="status"
          text="Status"
          name="status"
          id="status"
          register={register}
          placeholder="Select task status"
          options={[
            { value: "Pending", label: "Pending" },
            { value: "In Progress", label: "In Progress" },
            { value: "Completed", label: "Completed" },
          ]}
        />
        {errors.status && (
          <Message
            className="mt-1"
            type="error"
            text={errors.status.message as string}
          />
        )}
      </div>
      <div>
        <SelectFormField
          htmlFor="priority"
          text="Priority"
          name="priority"
          id="priority"
          placeholder="Select task priority"
          register={register}
          options={[
            { value: "Low", label: "Low" },
            { value: "Medium", label: "Medium" },
            { value: "High", label: "High" },
          ]}
        />
        {errors.priority && (
          <Message
            className="mt-1"
            type="error"
            text={errors.priority.message as string}
          />
        )}
      </div>
      <div className="w-full flex justify-between items-center">
        <div className="w-full flex justify-between items-center">
          <div className="flex justify-start">
            {submissionStatus.type !== "default" && (
              <Message
                className="mt-5"
                type={submissionStatus.type}
                text={submissionStatus.message}
              />
            )}
          </div>

          <div className="flex gap-x-2 justify-end">
            <Button
              onClick={onClose}
              className="font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2"
            >
              <div className="flex justify-center items-center gap-x-5">
                <p>{task ? "Update" : "Create"}</p>
                {isLoading && <Loader className="border-black" />}
              </div>
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default TaskModalForm;
