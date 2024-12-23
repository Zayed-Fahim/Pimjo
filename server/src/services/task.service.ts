import Task from "../models/task.model";
import User from "../models/user.model";
import { IResponse } from "../types/response.type";
import { TaskCreationProps } from "../types/task.type";
import mongoose, { SortOrder } from "mongoose";

const taskCreationService = async (
  data: TaskCreationProps
): Promise<IResponse> => {
  const isExist = await Task.exists({ title: data.title });
  if (isExist) {
    return {
      success: false,
      message: "Task already exist!",
      data: null,
    };
  }
  const newTask = await Task.create(data);
  return {
    success: true,
    message: "Task creation successful!",
    data: newTask,
  };
};
const taskGettingService = async (
  data: any,
  filtersOrSorting: any
): Promise<IResponse> => {
  const { ObjectId } = mongoose.Types;

  if (!ObjectId.isValid(data?._id)) {
    return {
      success: false,
      message: "Invalid user ID format!",
      data: null,
    };
  }

  const isUserExist = await User.exists({ _id: data?._id });

  if (!isUserExist) {
    return {
      success: false,
      message: "Invalid user! Please try again.",
      data: null,
    };
  }

  const { status, dueDate, priority, sortBy } = filtersOrSorting;

  let query: Record<string, any> = { userId: data?._id };
  let sort: { [key: string]: SortOrder } = { createdAt: -1 };

  if (status) {
    query.status = status;
  }

  if (dueDate) {
    query.dueDate = { $eq: new Date(dueDate) };
  }
  if (priority) {
    query.priority = priority;
  }

  if (sortBy && sortBy === "newest") {
    sort = {
      createdAt: -1,
    };
  } else if (sortBy && sortBy === "oldest") {
    sort = {
      createdAt: 1,
    };
  }

  const tasks = await Task.find(query).sort(sort).select("-__v -userId");

  return {
    success: true,
    message: "Retrieval successful!",
    data: tasks,
  };
};

const gettingSingleTaskService = async (
  id: string,
  user: any
): Promise<IResponse> => {
  const isTaskExist = await Task.exists({
    $and: [{ _id: id }, { userId: user?._id }],
  });

  if (!isTaskExist) {
    return {
      success: false,
      message: "Unauthorized task access!",
      data: null,
    };
  }

  const task = await Task.findById(id).select("-__v -userId");

  return {
    success: true,
    message: "Retrieval successful!",
    data: task,
  };
};

const taskUpdatiingService = async (
  data: any,
  user: any,
  id: string
): Promise<IResponse> => {
  const isTaskExist = await Task.exists({
    $and: [{ _id: id }, { userId: user?._id }],
  });

  if (!isTaskExist) {
    return {
      success: false,
      message: "Unauthorized task access!",
      data: null,
    };
  }

  const updatedTask = await Task.findByIdAndUpdate(id, data, {
    new: true,
  }).select("-__v -userId");

  return {
    success: true,
    message: "Task updated successfully!",
    data: updatedTask,
  };
};

const taskDeletingService = async (
  id: string,
  user: any
): Promise<IResponse> => {
  const isTaskExist = await Task.exists({
    $and: [{ _id: id }, { userId: user?._id }],
  });

  if (!isTaskExist) {
    return {
      success: false,
      message: "Unauthorized task access!",
      data: null,
    };
  }

  await Task.findByIdAndDelete(id);

  return {
    success: true,
    message: "Task deletion successful!",
    data: null,
  };
};

export {
  taskCreationService,
  taskGettingService,
  gettingSingleTaskService,
  taskUpdatiingService,
  taskDeletingService,
};
