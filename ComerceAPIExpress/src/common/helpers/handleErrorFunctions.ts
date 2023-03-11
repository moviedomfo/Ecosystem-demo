import {AppError} from "@common/ErrorHandle/AppError";
import {ErrorStatusCodeEnum, ErrorTypeEnum} from "@common/ErrorHandle/ErrorEnums";

export class ExeptionFunctions {
  /**
   *
   * @param error
   * @returns
   */
  public static GetAppError(error): AppError {
    let appError: AppError;
    if ((error.name as string).startsWith("Sequelize")) {
      appError = ExeptionFunctions.Parse_SequelizeError(error);
    }
    if ((error.name as string).startsWith("Kafka")) {
      appError = ExeptionFunctions.Parse_KafkaError(error);
    }
    if (error.response) appError.message = appError.message.concat(error.response.data.Message, "\n");

    return appError;
  }

  public static Parse_SequelizeError = (error: any): AppError => {
    // let message = ExeptionFunctions.GetMessageError(error);
    let message = undefined;
    let errorCode = undefined;
    /** */
    if (error.name === "SequelizeConnectionError") {
      if (error.original?.code === "ETIMEOUT") {
        message = "Error de conexión al servidor de base de datos .-";
        errorCode = ErrorStatusCodeEnum.SEQUALIZE_TIMEOUT;
      }

      errorCode = ErrorStatusCodeEnum.SEQUALIZE_DATA;
      message = error.message;
    }

    if (!message && error.name === "SequelizeDatabaseError") {
      message = error.message;

      const errors: [String] = error.parent.errors as [String];
      errors.forEach((element) => {
        message += element;
      });
    }

    let err: AppError = new AppError(500, errorCode, message, ErrorTypeEnum.TecnicalException);

    err.originalMessage = error.message;
    err.name = error.name;
    err.stack = err.stack;
    return err;
  };

  public static Parse_KafkaError = (error: any): AppError => {
    // let message = ExeptionFunctions.GetMessageError(error);
    let message = undefined;
    let errorCode = undefined;
    if (error.cause.code === "ECONNREFUSED") {
      message = "Error de conexión al buss de eventos Kafka .-";
      errorCode = ErrorStatusCodeEnum.KAFKA_TIMEOUT;
    }
    if (!message) {
      message = error.message;
    }

    let err: AppError = new AppError(500, errorCode, message, ErrorTypeEnum.TecnicalException);

    err.originalMessage = error.message;
    err.name = error.name;
    err.stack = err.stack;
    return err;
  };
}
