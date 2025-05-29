import { AxiosError } from 'axios';
import { DateFunctions } from './dateFunctions';
const colors = require("colors");

import * as fs from 'fs';
import { readFileSync } from 'fs';
import * as path from 'path';

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
      var json = fs.readFileSync(fileName, "utf8");
      console.log(json);
      resolve(json);

    });
  }

  public static saveFile = (fileName: string, content: string) => ({

  });



  public static LogConsole(message: string): void {

    console.log(
      colors.blue(DateFunctions.getTime_Iso() + " " + message)
    );
  }
  public static LogError(message: string): void {
    //let logFileName = DateFunctions.getFileNamePrefix() + "logs.txt";
    let log = DateFunctions.getTime_Iso() + " ERROR ";
    log = log.concat(message, "\n");
    console.log(colors.red(log));

  }

  public static LogErrorFull(message: string, error: any): void {
    this.LogError(this.GetError(error));

    console.log(colors.red(DateFunctions.getTime_Iso() + " " + message + "  " + this.GetError(error)));
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
      if (customMessage || originalMessage) {
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
