import { DateTime } from '../node_modules/luxon';
import dayjs from 'dayjs';
var colors = require('colors');

import * as fs from 'fs';
import { readFileSync } from 'fs';
import * as path from 'path';
import { AxiosError } from 'axios';

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
      var json = fs.readFileSync(fileName, 'utf8');
      console.log(json);
      resolve(json);
    });
  }

  public static saveFile = (fileName: string, content: string) => ({});

  /* 
    Coinvierte fecha local y retorna a formato ISO  
  */
  public static getTime_Iso(): DateTime {
    let dt_local = DateTime.local();
    const d = DateTime.fromISO(dt_local.toString()).toFormat(
      'yyyy-MM-dd HH-mm-ss'
    );
    return d;
  }
  public static getIso(): DateTime {
    const currentDate = dayjs(new Date().toString()).toDate();
    //let dt_local = DateTime.local();
    //const d = DateTime.fromISO(dt_local.toString());
    return currentDate;
  }
  /* 
   returns yyyymmdd_ prefix
   */
  public static getFileNamePrefix(): String {
    var dt_local = DateTime.local();

    var d = DateTime.fromISO(dt_local.toString()).toFormat('yyyyMMdd_');
    return d;
  }

  /* Retorna 01MMYYYY */
  public static getPeriodo(): String {
    const dt_local = DateTime.local();
    //return 01032020-
    return DateTime.fromISO(dt_local.toString()).toFormat('01MMyyyy');
  }

  public static getMonth_MM(): String {
    const dt_local = DateTime.local();
    return DateTime.fromISO(dt_local.toString()).toFormat('MM');
  }

  public static getDay_dd(): String {
    const dt_local = DateTime.local();
    //return 01032020-
    return DateTime.fromISO(dt_local.toString()).toFormat('dd');
  }

  public static getDateFromt_yyymmyyy(date: string): Date {
    const fecha = DateTime.fromISO(date.replace(/\//g, '-'));
    return fecha;
    //return  DateTime.fromISO(dt_local.toString()).toFormat("dd");
  }
  public static getDateFromt_yyymmyyy_toSQLDate(date: string): Date {
    const convertida = DateTime.fromISO(date + 'T13:00:00.00');

    return convertida.toSQLDate();
    //return  DateTime.fromISO(dt_local.toString()).toFormat("dd");
  }

  public static Log(message: string): void {
    try {
      let logFileName = Helper.getFileNamePrefix() + 'logs.txt';
      let log = Helper.getTime_Iso() + ' INFO ';
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
  public static LogConsoleCyan(message: string): void {
    console.log(colors.cyan(Helper.getTime_Iso() + ' ' + message));
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

  // public static GetError(error): string {
  //   let message = error.message;
  //   if (error.response)
  //     message = message.concat(error.response.data.message, '\n');
  //   return message;
  // }

  // public static Log = (message: string) => ({

  //   Helper.catFacturas.info(() => message);
  //   Helper.catFacturas.info(() => "Performing magic once more: " + name);
  // });
}
