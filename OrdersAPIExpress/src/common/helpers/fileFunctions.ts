
import * as fs from 'fs';
import { readFileSync } from 'fs';
import * as path from 'path';

export class FileFunctions {
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
    return new Promise<string>((resolve, _reject) => {
      const json = fs.readFileSync(fileName, 'utf8');
      console.log(json);
      resolve(json);
    });
  }

  public static saveFile = (_fileName: string, _content: string) => ({});

}
