// var colors = require("colors");
import dayjs from "dayjs";
export class DateFunctions {
  /**
   * Gets Date from string
   * @param dateString
   * @returns the Date
   */
  public static parseDate(dateString: string): Date | null {
    let f: Date;
    if (dateString) {
      f = new Date(dateString);

      return f; //new Date(dateString);
    } else {
      return null;
    }
  }
  /**
   *  Coinvierte fecha local y retorna a formato ISO
   * '2019-01-25T02:00:00.000Z'
   */
  public static getTime_Iso(): String {
    dayjs().locale("es");

    let d = dayjs().toISOString();

    return d;
  }
  /**
   * Retrive current date time  in spesific format
   * @returns DD/MM/YYYY h:mm A
   */
  public static getTime() {
    dayjs().locale("es");
    let d = dayjs().format("DD/MM/YYYY h:mm A");
    return d;
  }

  /**
   * Return prefix based on current date
   * @returns  yyyymmdd_ prefix
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
    let convertida = dayjs(date).toISOString();
    //let convertida = dayjs(date + "T13:00:00.00").format('YYYY-MM-DDTHH:mm:ssZ[Z]') ;
    return convertida;
  }
}
