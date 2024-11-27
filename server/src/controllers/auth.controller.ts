import { NextFunction, Request, Response } from "express";
import { loginService, registerService } from "../services/auth.service";

const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await registerService(req?.body);

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

const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await loginService(req.body);

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

export { registerController, loginController };
