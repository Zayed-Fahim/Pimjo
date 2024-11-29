import rateLimit, { Options } from "express-rate-limit";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

interface RateLimiterOptions extends Partial<Options> {
  windowMs?: number;
  max?: number | ((req: Request) => number);
  message?: { success: boolean; message: string };
  keyGenerator?: (req: Request) => string;
  skipSuccessfulRequests?: boolean;
  handler?: (
    req: Request<ParamsDictionary, any, any, ParsedQs>,
    res: Response,
    next: NextFunction,
    optionsUsed: Options
  ) => void;
}

// general rate limiter
export const createRateLimiter = ({
  windowMs = 60 * 60 * 1000,
  max = 100,
  message = {
    success: false,
    message: "Too many requests. Please try again after 1 hour.",
  },
  keyGenerator = (req: Request) => {
    const ip = req?.ip;
    return ip || "unknown";
  },
  skipSuccessfulRequests = false,
  handler = (
    req: Request<ParamsDictionary, any, any, ParsedQs>,
    res: Response,
    next: NextFunction,
    optionsUsed: Options
  ) => {
    res.status(429).json({
      success: false,
      message:
        typeof optionsUsed.message === "string"
          ? optionsUsed.message
          : "Too many requests.",
    });

    console.warn(`Rate limit exceeded for IP: ${req?.ip}`);
  },
}: RateLimiterOptions = {}): RequestHandler => {
  return rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    message: message.message,
    keyGenerator,
    skipSuccessfulRequests,
    handler,
  });
};

// task related limiter
export const rateLimiterForTaskCreation = createRateLimiter({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: "Too many requests to task endpoints. Please try again in 1 hour.",
  },
});
export const rateLimiterForTaskGetting = createRateLimiter({
  windowMs: 60 * 60 * 1000,
  max: 60,
  message: {
    success: false,
    message: "Too many requests to task endpoints. Please try again in 1 hour.",
  },
});
export const rateLimiterForGlobalTask = createRateLimiter({
  windowMs: 60 * 60 * 1000,
  max: 20,
  message: {
    success: false,
    message: "Too many requests to task endpoints. Please try again in 1 hour.",
  },
});

// auth realted limiter
export const authRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message:
      "Too many login/register attempts. Please try again in 15 minutes.",
  },
});
