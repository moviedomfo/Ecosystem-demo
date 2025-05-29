const colors = require('colors');
import 'dayjs/locale/es';
import * as fs from 'fs';
import dayjs from 'dayjs';
import { AxiosError } from 'axios';

interface ErrorResponseData {
  message?: string;
  originalMessage?: string;
  errorCode?: string;
  status?: number;
}

export class Helper {
  public static WriteFile(fileName, data): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      fs.writeFile(fileName, data, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
  public static AppendFile(fileName, data): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      fs.appendFile(fileName, data, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  public static OpenFile(fileName: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const json = fs.readFileSync(fileName, 'utf8');
      console.log(json);
      resolve(json);
    });
  }

  public static saveFile = (fileName: string, content: string) => ({});

  public static getTime_Iso(): String {
    dayjs().locale('es');

    let d = dayjs().toISOString();

    return d;
  }
  public static getTime() {
    dayjs().locale('es');

    let d = dayjs().format('DD/MM/YYYY h:mm A');

    return d;
  }
  /* 
  returns YYYYMMDD_ prefix
  */
  public static getFileNamePrefix(): String {
    const d = dayjs().format("YYYYMMDD_");
    return d;
  }

  /* Retorna 01MMYYYY */
  public static getPeriodo_01MMyyyy(): String {
    const dt = dayjs().format("01MMyyyy");
    //return 01032020-
    return dt;
  }
  /* Retorna 2021_04 */
  public static getPeriodo_YYYY_MM(): string {
    const dt = dayjs().format("YYYY_MM");
    return dt;
  }
  public static getMonth_MM(): String {
    const dt = dayjs().format("MM");
    return dt;
  }

  public static getDay_dd(): String {
    let dt = dayjs().format("d");
    return dt;
  }

  public static getDateFromt_yyymmyyy_toSQLDate(date: string): string {
    let convertida = dayjs(date).toISOString()
    //let convertida = dayjs(date + "T13:00:00.00").format('YYYY-MM-DDTHH:mm:ssZ[Z]') ;
    return convertida;
  }

  public static Log(message: string): void {
    try {
      let logFileName = Helper.getFileNamePrefix() + 'logs.txt';
      let log = Helper.getTime() + ' INFO ';
      log = log.concat(message, '\n');
      Helper.AppendFile(logFileName, log);
      console.log(colors.yellow(log));
    } catch (error) {
      console.error(`Got an error trying to write to a file: ${error.message}`);
    }
  }

  public static LogError(message: string): void {
    let logFileName = Helper.getFileNamePrefix() + 'logs.txt';
    let log = Helper.getTime_Iso() + ' ERROR ';
    log = log.concat(message, '\n');
    console.log(colors.red(log));
    Helper.AppendFile(logFileName, log);
  }

  public static LogErrorFull(message: string, error: any): void {
    Helper.LogError(Helper.GetError(error));

    console.log(
      colors.red(
        Helper.getTime_Iso() + ' ' + message + '  ' + Helper.GetError(error)
      )
    );
  }

  public static LogConsole(message: string): void {
    console.log(colors.blue(Helper.getTime_Iso() + ' ' + message));
  }



  public static GetError(error: any): string {
    if (!error) return '❌ Error desconocido';

    // ⚠️ Errores de red conocidos
    switch (error.code) {
      case 'ECONNREFUSED':
        return '❌ No se pudo conectar al servidor. Verificá que esté activo y que el puerto sea accesible.';
      case 'ENOTFOUND':
        return '🌐 No se pudo encontrar el servidor. Verificá la URL o tu conexión a internet.';
      case 'ECONNABORTED':
      case 'ETIMEDOUT':
        return '⏳ El servidor tardó demasiado en responder. Reintentá más tarde.';
      case 'EAI_AGAIN':
      case 'ERR_NETWORK':
        return '📴 Problema de red o conexión intermitente. Verificá tu acceso a internet.';
    }

    const axiosErr = error as AxiosError;

    // ✅ El servidor respondió con un error HTTP (4xx, 5xx)
    if (axiosErr.response) {
      const status = axiosErr.response.status;
      const statusText = axiosErr.response.statusText;
      const data = axiosErr.response?.data as ErrorResponseData;

      const customMessage = data?.message;
      const originalMessage = data?.originalMessage;
      // Si viene un mensaje del backend, lo usamos
      if (customMessage) {
        return `🛑 Error del servidor (${status}): ${customMessage}, ${originalMessage}`;
      }

      // Si no viene mensaje del backend, usamos el genérico
      return `🛑 Error del servidor (${status} ${statusText}): ${axiosErr.message}`;
    }

    // 📨 La solicitud fue enviada pero no hubo respuesta (corte de red, etc)
    if (axiosErr.request) {
      return '❗ Se envió la solicitud pero no se recibió respuesta del servidor. Puede estar caído.';
    }

    // 🧨 Otro error desconocido
    return `⚠️ ${axiosErr.message || 'Ocurrió un error desconocido durante la solicitud HTTP.'}`;
  }
}
