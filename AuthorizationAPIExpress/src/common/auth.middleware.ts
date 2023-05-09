import HttpStatusCode from "@common/Enums//HttpStatusCode";
import {Token} from "@domain/Entities/token";
import {JWTFunctions} from "./helpers/jwtFunctions";
import {Request, Response, NextFunction} from "express";
import { ExeptionFunctions } from "./helpers/ExeptionFunctions";

/**
 * Middleware function to check the validity of a JSON Web Token (JWT).
 * The JWT should be provided in the "Authorization" header using the Bearer scheme.
 * If the token is valid, it is decoded and its payload is added to the request object.
 * If the token is not valid, a 401 Unauthorized response is sent.
 *
 * @param request - The Express request object.
 * @param response - The Express response object.
 * @param next  - The next middleware function in the chain.
 * @returns
 */
const checkTokenMeddeware = (request: Request, response: Response, next: NextFunction) => {
  const authHeader = extractToken(request.headers.authorization);
  if (authHeader) {
    const token = extractToken(request.headers.authorization);
    const tk: Token = new Token();
    tk.jwt = token;
    try {
      JWTFunctions.Verify(tk);
      next();
    } catch (err) {
      const e = ExeptionFunctions.CreateAppError(HttpStatusCode.UNAUTHORIZED, "Invalid token " + err.message, HttpStatusCode.UNAUTHORIZED.toString());

      response.status(HttpStatusCode.UNAUTHORIZED).send(e);    }
  } else {
    const e = ExeptionFunctions.CreateAppError(HttpStatusCode.UNAUTHORIZED, "Authorization header invalid", HttpStatusCode.UNAUTHORIZED.toString());

    response.status(HttpStatusCode.UNAUTHORIZED).send(e);
  }
};
function extractToken(authHeader: string): string | null {
  const tokenRegex = /^Bearer (.+)/;
  const match = authHeader.match(tokenRegex);
  return match ? match[1] : null;
}
export default checkTokenMeddeware;
