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
  
  if (typeof AppError === error) appError = error as AppError;
  else appError = GetAppError(error);

  const err = {
    message: appError.message,
    originalMessage: appError.originalMessage,
    type: error.type,
    errorCode: appError.errorCode,
    status: appError.statusCode,
  };
  response.status(appError.statusCode).send(err);
};

const GetAppError = (error: any): AppError => {
  let appError: AppError;
  if ((error.name as string).startsWith("Sequelize")) {
    appError = ExeptionFunctions.Parse_SequelizeError(error);
  }
  if ((error.name as string).startsWith("Kafka")) {
    appError = ExeptionFunctions.Parse_KafkaError(error);
  }

  //Redis authentication required
  if (error.message && error.message.startsWith("REDIS->")) {
    appError = ExeptionFunctions.Parse_Redis(error);
  }
  if (error.response) appError.message = appError.message.concat(error.response.data.Message, "\n");

  appError.statusCode = error.statusCode || appError.statusCode;

  return appError;
};
