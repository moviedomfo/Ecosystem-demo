import {Request, Response, NextFunction} from "express";

// you must mount the errorHandler middleware function after you have mounted all the controller functions of your application.
export const logsMiddle = (request: Request, response: Response, next: NextFunction) => {
  console.log("--------------logs middleware-------------------");
  console.log(request.headers);
  // const ip = request.headers["x-forwarded-for"];
  // console.log(`cliente ${ip}`);
  console.log("---------------------------------");

  next();
};
