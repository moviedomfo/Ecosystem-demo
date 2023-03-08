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

      return f;
    } else {
      return null;
    }
  }

  /**
   * Convert current local date to ISO
   * @returns '2019-01-25T02:00:00.000Z'
   */
  public static getTime_Iso(): string {
    const d = dayjs().toISOString();

    return d;
  }

  /**
   * Retrive current date time  in spesific format
   * @returns DD/MM/YYYY h:mm A
   */
  public static getTime() {
    const d = dayjs().format("DD/MM/YYYY h:mm A");
    return d;
  }

  /**
   * Return prefix based on current date
   * @returns  yyyymmdd_ prefix
   */
  public static getFileNamePrefix(): string {
    const d = dayjs().format("YYYYMMDD_");
    return d;
  }

  /**
   * Get current date formatted to '01MMyyyy' pattern.
   * Generally used when we put prefixed in monthly files
   * @returns   e.g.  '2023/06/10' --> 010610
   */
  public static getPeriodo_01MMyyyy(): string {
    const dt = dayjs().format("01MMyyyy");

    return dt;
  }
  /* Retorna 2021_04 */

  /**
   * Get the formatted date according to the 'YYYY_MM' pattern.
   * @returns e.g.  '2023/06/10' --> 06
   */
  public static getPeriodo_YYYY_MM(): string {
    const dt = dayjs().format("YYYY_MM");
    return dt;
  }

  /**
   *  Get the formatted date according to the 'MM' pattern.
   * @returns e.g.  '2023/06/10' --> 06
   */
  public static getMonth_MM(): string {
    const dt = dayjs().format("MM");
    return dt;
  }

  /**
   * Get the formatted date according to the 'dd' pattern.
   * @returns e.g.  '2023/06/10' --> 10
   */
  public static getDay_dd(): string {
    const dt = dayjs().format("DD");
    return dt;
  }

  /**
   * Get ISO 8601 string fromm  date pased as string
   */
  public static getDateFrom_yyymmyyy_toSQLDate(date: string): string {
    const convertida = dayjs(date).toISOString();
    return convertida;
  }
}
