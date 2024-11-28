import { NextFunction, Request, Response } from "express";
import {
  gettingSingleTaskService,
  taskCreationService,
  taskDeletingService,
  taskGettingService,
  taskUpdatiingService,
} from "../services/task.service";

const taskCreationController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await taskCreationService(req.body);

    res.status(result.success ? 201 : 400).json({
      message: result.message,
      success: result.success,
      data: result.data,
    });
  } catch (error) {
    next(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      data: null,
    });
  }
};
const taskGettingController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await taskGettingService(req?.user);

    res.status(result.success ? 200 : 400).json({
      message: result.message,
      success: result.success,
      data: result.data,
    });
  } catch (error) {
    next(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      data: null,
    });
  }
};

const gettingSingleTaskController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await gettingSingleTaskService(req?.params.id, req?.user);

    res.status(result.success ? 200 : 400).json({
      message: result.message,
      success: result.success,
      data: result.data,
    });
  } catch (error) {
    next(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      data: null,
    });
  }
};

const taskUpdatingController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await taskUpdatiingService(
      req?.body,
      req?.user,
      req?.params?.id
    );

    res.status(result?.success ? 200 : 400).json({
      message: result?.message,
      success: result?.success,
      data: result?.data,
    });
  } catch (error) {
    next(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      data: null,
    });
  }
};

const taskDeletingController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await taskDeletingService(req?.params.id, req?.user);
    res.status(result.success ? 200 : 400).json({
      message: result.message,
      success: result.success,
      data: result.data,
    });
  } catch (error) {
    next(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      data: null,
    });
  }
};

export {
  taskCreationController,
  taskGettingController,
  gettingSingleTaskController,
  taskUpdatingController,
  taskDeletingController,
};
