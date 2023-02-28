import { DateTime } from "../../node_modules/luxon";
var colors = require("colors");

import * as fs from 'fs';
import { readFileSync } from 'fs';
import * as path from 'path';


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
  
  /* 
    Coinvierte fecha local y retorna a formato ISO  
  */
  public static getTime_Iso(): DateTime {
    let dt_local = DateTime.local();
    const d = DateTime.fromISO(dt_local.toString()).toFormat(
      "yyyy-MM-dd HH-mm-ss"
    );
    return d;
  }
  public static getIso(): DateTime {
    let dt_local = DateTime.local();
    const d = DateTime.fromISO(dt_local.toString());
    return d;
  }
  /* 
   returns yyyymmdd_ prefix
   */
  public static getFileNamePrefix(): String {

    var dt_local = DateTime.local();
  
     var d = DateTime.fromISO(dt_local.toString()).toFormat(
      "yyyyMMdd_"
    );
    return d;
  }

  /* Retorna 01MMYYYY */
  public static getPeriodo(): String {

    var dt_local = DateTime.local();
    //return 01032020-
    return  DateTime.fromISO(dt_local.toString()).toFormat("01MMyyyy");
  }

  public static getMonth_MM(): String {

    var dt_local = DateTime.local();
    return  DateTime.fromISO(dt_local.toString()).toFormat("MM");
     
  }
  
  public static getDay_dd(): String {

    var dt_local = DateTime.local();
    //return 01032020-
     return  DateTime.fromISO(dt_local.toString()).toFormat("dd");
  }
  
  
  public static getDateFromt_yyymmyyy(date: string): Date {

    let fecha = DateTime.fromISO(date.replace(/\//g, '-'));
    return fecha;
     //return  DateTime.fromISO(dt_local.toString()).toFormat("dd");
  }
  public static getDateFromt_yyymmyyy_toSQLDate(date: string): Date {

    let convertida =  DateTime.fromISO(date+'T13:00:00.00');
    
    return convertida.toSQLDate() ;
     //return  DateTime.fromISO(dt_local.toString()).toFormat("dd");
  }


  public static Log(message: string): void {
    try{
      let logFileName = Helper.getFileNamePrefix() + "logs.txt";
      let log = Helper.getTime_Iso() + ' INFO ';
      log = log.concat( message , '\n');
      Helper.AppendFile(logFileName, log);
      console.log( colors.yellow(log));
    }catch (error) {
      console.error(`Got an error trying to write to a file: ${error.message}`);
    } 
    
  }

  public static LogError(message: string): void {
    let logFileName = Helper.getFileNamePrefix() + "logs.txt";
    let log = Helper.getTime_Iso() + ' ERROR ';
    log = log.concat( message , '\n');
    console.log( colors.red(log));
    Helper.AppendFile(logFileName, log);
  }


  public static LogErrorFull(message :string, error: any): void {

    Helper.LogError( Helper.GetError(error));
    
    console.log(
      colors.red(
        Helper.getTime_Iso() + " " + message     + "  "    +
          Helper.GetError(error)
      )
    );
  }

  public static LogConsole(message :string): void {

    console.log(
      colors.blue(Helper.getTime_Iso() + " " + message)
    );
  }


  public static GetError(error): string {
    let message = error.message;
    if(error.response)
      message = message.concat(error.response.data.Message, '\n');
    return message;
  }


  // public static Log = (message: string) => ({

  //   Helper.catFacturas.info(() => message);
  //   Helper.catFacturas.info(() => "Performing magic once more: " + name);
  // });
  
}
