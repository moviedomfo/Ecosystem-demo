import  { Request, Response, NextFunction } from 'express'


/*
 //These error-handling middleware functions are attached to the app instance after the route handler functions have been defined.
*/
  // Error handling Middleware function reads the error message 
  // and sends back a response in JSON format  
 export const errorHandler = (
    error: AppError, 
    request: Request, 
    response: Response, 
    next: NextFunction) => {
        response.header("Content-Type", 'application/json')
          
        const status = error.statusCode || 500
        
        const err = {
          message:error.message,
          type:error.type,
        }
        response.status(status).send(err);
  }




  // Error object used in error handling middleware function
  export class AppError extends Error{
    statusCode: number;
    type: ErrorTypeEnum  ;
    //code?: string;

    constructor(statusCode: number, message: string,type:ErrorTypeEnum=ErrorTypeEnum.TecnicalException) {
      super(message);
  
      Object.setPrototypeOf(this, new.target.prototype);
      this.name = Error.name;
      this.statusCode = statusCode;
      this.type = type;
      this.message = message;
      Error.captureStackTrace(this);
    }
   
}

export enum  ErrorTypeEnum {
  FunctionalException ='FunctionalException', 
  TecnicalException='TecnicalException'
}
