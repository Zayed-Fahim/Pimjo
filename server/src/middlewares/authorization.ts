import { Request, Response, NextFunction } from "express";
import fs from "fs";
import jwt from "jsonwebtoken";
import envConfig from "../config/env.config";

declare module "express-serve-static-core" {
  interface Request {
    user?: string | jwt.JwtPayload;
  }
}

const authorization = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req?.headers?.authorization;

  if (!token || !token.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized access!", success: false });
    return;
  }

  try {
    // const key = fs.readFileSync(envConfig.jwtPublicKeyPath, "utf8");
    const mainToken = token.split(" ")[1];

    const decoded = jwt.verify(mainToken, envConfig.jwtSecret, {
      algorithms: ["RS512", "HS512"],
    });

    req.user = decoded;
    next();
  } catch (error: any) {
    console.error("Authorization error:", error.message);
    res.status(401).json({
      message: "Unauthorized access! Invalid token.",
      success: false,
    });
    return;
  }
};

export default authorization;
