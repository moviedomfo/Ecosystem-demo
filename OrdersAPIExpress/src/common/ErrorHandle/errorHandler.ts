import {ExeptionFunctions} from "@common/helpers/ExeptionFunctions";
import {Request, Response, NextFunction} from "express";
import {AppError} from "./AppError";

/*
 //These error-handling middleware functions are attached to the app instance after the route handler functions have been defined.
*/
// Error handling Middleware function reads the error message
// and sends back a response in JSON format
export const errorHandler = (error: any, _request: Request, response: Response, _next: NextFunction) => {
  response.header("Content-Type", "application/json");

  let appError: AppError;
  if ((error.name as string).startsWith("Sequelize")) {
    appError = ExeptionFunctions.Parse_SequelizeError(error);
  }
  if ((error.name as string).startsWith("Kafka")) {
    appError = ExeptionFunctions.Parse_KafkaError(error);
  }
  if(error.message){
    appError  = ExeptionFunctions.Parse_Error(error);
  }
  if (error.response) appError.message = appError.message.concat(error.response.data.Message, "\n");

  const status = error.statusCode || appError.statusCode;

  const err = {
    message: appError.message,
    type: error.type,
    errorCode: appError.errorCode,
    status,
  };
  response.status(status).send(err);
};
