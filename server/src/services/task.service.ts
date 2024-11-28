import Task from "../models/task.model";
import User from "../models/user.model";
import { IResponse } from "../types/response.type";
import { TaskCreationProps } from "../types/task.type";
import mongoose from "mongoose";

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
    message: "Task created successfully!",
    data: newTask,
  };
};
const taskGettingService = async (data: any): Promise<IResponse> => {
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

  const tasks = await Task.find({ userId: data?._id })
    .sort({ createdAt: -1 })
    .select("-__v -userId");

  return {
    success: true,
    message: "Retrieval successfull!",
    data: tasks,
  };
};

export { taskCreationService, taskGettingService };