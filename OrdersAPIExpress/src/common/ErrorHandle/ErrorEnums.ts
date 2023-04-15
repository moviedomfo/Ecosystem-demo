export enum ErrorTypeEnum {
  FunctionalException = "FunctionalException",
  TecnicalException = "TecnicalException",
}

export enum ErrorCodeEnum {
  SEQUALIZE_TIMEOUT = "5000",
  SEQUALIZE_ELOGIN = "5001",

  /**SequelizeDatabaseError */
  SEQUALIZE_DATA = "5001",
  KAFKA_TIMEOUT = "5100",
  KAFKA_TOPIC_NOT_EXIST = "5101",


  MONGO_TIMEOUT = "5200",
}
