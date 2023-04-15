import {ExeptionFunctions} from "@common/helpers/ExeptionFunctions";
import {Request, Response, NextFunction} from "express";
import {AppError} from "./AppError";

/*
 //These error-handling middleware functions are attached to the app instance after the route handler functions have been defined.
*/
// Error handling Middleware function reads the error message
// and sends back a response in JSON format
export const ExpressErrorHandler = (error: any, request: Request, response: Response, next: NextFunction) => {
  response.header("Content-Type", "application/json");

  let appError: AppError;

  if (error instanceof AppError) {
    appError = error as AppError;
  } else {
    appError = ExeptionFunctions.GetAppError(error);
  }

  const err = {
    message: appError.message,
    originalMessage: appError.originalMessage,
    type: error.type,
    errorCode: appError.errorCode,
    status: appError.statusCode
  };
  response.status(appError.statusCode).send(err);
};
