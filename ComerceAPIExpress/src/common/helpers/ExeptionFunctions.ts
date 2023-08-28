import {AppErrorToSent} from "./../ErrorHandle/AppError";
import HttpStatusCode from "@common/Enums/HttpStatusCode";
import {AppError} from "@common/ErrorHandle/AppError";
import {ErrorCodeEnum, ErrorTypeEnum} from "@common/ErrorHandle/ErrorEnums";
export class ExeptionFunctions {
  /**
   *
   * @param statusCode
   * @param message
   * @param errorCode
   * @param exType
   * @returns
   */
  public static CreateAppError = (statusCode: HttpStatusCode, message: string, errorCode: string, exType: ErrorTypeEnum = ErrorTypeEnum.TecnicalException): AppErrorToSent => {
    return new AppErrorToSent(statusCode, errorCode, message, exType);
  };

  /**
   *
   * @param error
   * @returns
   */
  public static GetAppError = (error: any): AppError => {
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

    // By default http status 500
    let statusCode = error.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR;
    if (appError?.statusCode) statusCode = appError.statusCode;

    if (!appError) {
      appError = new AppError(statusCode, ErrorCodeEnum.UNKNOWED, error.message, ErrorTypeEnum.TecnicalException);
    }

    if (error.response) appError.message = appError.message.concat(error.response.data.Message, "\n");

    return appError;
  };

  public static Parse_SequelizeError = (error: any): AppError => {
    // let message = ExeptionFunctions.GetMessageError(error);
    let message;
    let errorCode;
    /** */
    if (error.name === "SequelizeConnectionError") {
      if (error.original?.code === "ETIMEOUT") {
        message = "Error de conexión al servidor de base de datos .-";
        errorCode = ErrorCodeEnum.SEQUALIZE_TIMEOUT;
      }
    }
    if (!message && error.name === "SequelizeAccessDeniedError") {
      if (error.original?.code === "ELOGIN") {
        message = "Error de conexión de permisos contra el servidor de base de datos .-";
        errorCode = ErrorCodeEnum.SEQUALIZE_ELOGIN;
      }
    }

    if (!message && error.name === "SequelizeDatabaseError") {
      errorCode = ErrorCodeEnum.SEQUALIZE_DATA;
      message = error.message;
      const errors: [String] = error.parent.errors as [String];
      if (errors) {
        errors.forEach((element) => {
          message += element;
        });
      }
    }

    const err: AppError = new AppError(500, errorCode, message, ErrorTypeEnum.TecnicalException);

    err.originalMessage = error.message;
    err.name = error.name;
    err.stack = err.stack;
    return err;
  };

  public static Parse_KafkaError = (error: any): AppError => {
    //name:'KafkaJSNumberOfRetriesExceeded'
    let message;
    let errorCode;
    if (error.cause.code === "ECONNREFUSED") {
      message = "Error de conexión al buss de eventos Kafka .-";
      errorCode = ErrorCodeEnum.KAFKA_TIMEOUT;
    }
    if (!message) {
      message = error.message;
    }

    const err: AppError = new AppError(500, errorCode, message, ErrorTypeEnum.TecnicalException);

    err.originalMessage = error.message;
    err.name = error.name;
    err.stack = err.stack;
    return err;
  };

  public static Parse_MongoError = (error: any): AppError => {
    //name:'KafkaJSNumberOfRetriesExceeded'
    let message;
    let errorCode;
    if (error.codeName === "AtlasError") {
      message = "Error de conexión al la base de datos mongo.-";
      errorCode = ErrorCodeEnum.MONGO_TIMEOUT;
    }
    if (!message) {
      message = error.message;
    }

    const err: AppError = new AppError(500, errorCode, message, ErrorTypeEnum.TecnicalException);

    err.originalMessage = error.message;
    err.name = error.name;
    err.stack = err.stack;
    return err;
  };

  public static Parse_Redis = (error: any): AppError => {
    let message;
    let errorCode = ErrorCodeEnum.REDIS;
    error.message = error.message.slice(7);
    if (error.message.startsWith("NOAUTH")) {
      message = "The Redis noauth authentication required";
      errorCode = ErrorCodeEnum.REDIS_NOAUTH;
    }
    if (!message) {
      message = error.message;
      message = message.slice(7); // remove REDIS->
    }

    const err: AppError = new AppError(500, errorCode, message, ErrorTypeEnum.TecnicalException);

    err.originalMessage = error.message;
    err.name = ErrorCodeEnum.REDIS;

    return err;
  };
}
