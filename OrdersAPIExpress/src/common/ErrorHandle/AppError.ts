import {ErrorTypeEnum} from "./ErrorEnums";

// Error object used in error handling middleware function
export class AppError extends Error {
  originalMessage: string;
  //**This is the status code generally returned by thirt party
  // https://www.rfc-editor.org/rfc/rfc7231#section-6 */
  statusCode: number;
  /**El código de error canónico para las API. Códigos que deberian estar documentados y detallados en un dns compartido para la todo
   * el desarrollo en comun. */
  errorCode: string;

  type: ErrorTypeEnum;

  /**
   *
   * @param statusCode This is the status code generally returned by thirt party
   * @param errorCode El código de error canónico para las API. Códigos que deberian estar documentados y detallados en un dns compartido para la todo
   * el desarrollo en comun.
   * @param message
   * @param type
   */
  constructor(statusCode: number, errorCode: string, message: string, type: ErrorTypeEnum = ErrorTypeEnum.TecnicalException) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = Error.name;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.type = type;
    this.message = message;
    Error.captureStackTrace(this);
  }
}

export class AppErrorToSent {
  originalMessage: string;
  //**This is the status code generally returned by thirt party
  // https://www.rfc-editor.org/rfc/rfc7231#section-6 */
  statusCode: number;
  /**El código de error canónico para las API. Códigos que deberian estar documentados y detallados en un dns compartido para la todo
   * el desarrollo en comun. */
  errorCode: string;
  message: string;
  type: ErrorTypeEnum;

  /**
   *
   * @param statusCode This is the status code generally returned by thirt party
   * @param errorCode El código de error canónico para las API. Códigos que deberian estar documentados y detallados en un dns compartido para la todo
   * el desarrollo en comun.
   * @param message
   * @param type
   */
  constructor(statusCode: number, errorCode: string, message: string, type: ErrorTypeEnum = ErrorTypeEnum.TecnicalException) {
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.type = type;
    this.message = message;
    Error.captureStackTrace(this);
  }
}
