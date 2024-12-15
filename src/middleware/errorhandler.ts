import { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  let statusMessage;
  switch (statusCode) {
    case 401:
      statusMessage = "Validation Error";
      break;
    default:
      statusMessage = "Internal Server Error";
      break;
  }
  res.json({
    statusMessage,
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
};

export default errorHandler;
