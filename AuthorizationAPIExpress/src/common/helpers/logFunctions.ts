import { FileFunctions, DateFunctions } from "./";
const colors = require("colors");
export class LogFunctions {
  public static Log(message: string): void {
    try {
      let logFileName = DateFunctions.getFileNamePrefix() + "logs.txt";
      let log = DateFunctions.getTime() + " INFO ";
      log = log.concat(message, "\n");
      FileFunctions.AppendFile(logFileName, log);
      console.log(colors.yellow(log));
    } catch (error) {
      console.error(`Got an error trying to write to a file: ${error.message}`);
    }
  }

  public static LogError(message: string): void {
    let logFileName = DateFunctions.getFileNamePrefix() + "logs.txt";
    let log = DateFunctions.getTime_Iso() + " ERROR ";
    log = log.concat(message, "\n");
    console.log(colors.red(log));
    FileFunctions.AppendFile(logFileName, log);
  }

  public static LogErrorFull(message: string, error: any): void {
    this.LogError(this.GetError(error));

    console.log(colors.red(DateFunctions.getTime_Iso() + " " + message + "  " + this.GetError(error)));
  }

  public static LogConsole(message: string): void {
    console.log(colors.blue(DateFunctions.getTime_Iso() + " " + message));
  }

  public static GetError(error: any): string {
    if (!error) return 'Error desconocido';

    if (error.code === 'ECONNREFUSED') {
      const addressInfo = error.errors?.map((e: any) => `${e.address}:${e.port}`).join(' o ');
      return `No se pudo conectar al servidor en ${addressInfo}. Asegurate de que esté iniciado.`;
    }

    if (error.code === 'ETIMEDOUT') {
      return 'La conexión tardó demasiado en responder. Verifica tu red o el servidor.';
    }

    if (error.response) {
      return `El servidor respondió con el código ${error.response.status}: ${error.response.statusText}`;
    }

    if (error.request) {
      return 'La solicitud fue enviada pero no se recibió respuesta del servidor.';
    }

    return error.message || 'Ocurrió un error desconocido durante la solicitud HTTP.';
  }
}
