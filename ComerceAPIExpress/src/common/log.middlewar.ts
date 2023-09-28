import {Request, Response, NextFunction} from "express";

// you must mount the errorHandler middleware function after you have mounted all the controller functions of your application.
export const logsMiddle = (request: Request, _response: Response, next: NextFunction) => {
  console.log("--------------logs middleware-------------------");
  console.log(request.headers);
  // const ip = request.headers["x-forwarded-for"];
  //const seccontext = request.headers["seccontext"];
  //console.log(`seccontext ${seccontext}`);
  console.log("---------------------------------");

  next();
};
