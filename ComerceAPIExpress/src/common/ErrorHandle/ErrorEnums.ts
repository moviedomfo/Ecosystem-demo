export enum ErrorTypeEnum {
    FunctionalException = "FunctionalException",
    TecnicalException = "TecnicalException",
  }

  export enum ErrorStatusCodeEnum {
    SEQUALIZE_TIMEOUT = "5000",
    /**SequelizeDatabaseError */
    SEQUALIZE_DATA = "5001",
    KAFKA_TIMEOUT = "5100",
    KAFKA_TOPIC_NOT_EXIST = "5101",
  }