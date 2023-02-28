

import { Request, Response, NextFunction } from "express";

// you must mount the errorHandler middleware function after you have mounted all the controller functions of your application.
export const logsHandler = ( request: Request,  response: Response, next: NextFunction) => {
  console.log('---------------------------------');
  console.log('Common middleware logs');
  console.log(request.body);
  console.log('---------------------------------');
  next();
};

export const logsHandlerADN = ( request: Request,  response: Response, next: NextFunction) => {
  // console.log('---------------------------------');
  // console.log('New adn string to check');
  // console.log(request.body);
  // console.log('---------------------------------');
  next();
};