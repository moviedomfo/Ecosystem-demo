import { DateFunctions } from './dateFunctions';
const colors = require("colors");

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
  
  

  public static LogConsole(message :string): void {

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

  public static GetError(error): string {
    let message = error.message;
    if(error.response)
      message = message.concat(error.response.data.Message, '\n');
    return message;
  }


 
  
}
