export class ExeptionFunctions {
  public static GetMessageError(error): string {
    let message = error.message;

    if (error.name === "SequelizeDatabaseError") {
      if (error.message) return error.message;

      const errors: [String] = error.parent.errors as [String];
      errors.forEach((element) => {
        message += element;
      });
      return message;
    }

    if (error.response) message = message.concat(error.response.data.Message, "\n");
    return message;
  }
}
