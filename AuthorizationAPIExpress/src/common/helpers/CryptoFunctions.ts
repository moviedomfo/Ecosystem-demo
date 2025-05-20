
import bcrypt from 'bcryptjs';
/**
 * 
 * */
export default class CryptoFunctions{

 
  /**
   * Función para generar un hash de una contraseña
   * @param password
   * @returns Hassed Passwword
   */
  public static  async HassPassword(password: string): Promise<string> {
    //  Salt length to generate or salt to use, default to 10
    const salt = await bcrypt.genSalt(10); // Generar un salt
    const hash = await bcrypt.hash(password, salt); // Generar el hash
    return hash;

  }

  /**
   *
   * @param password
   * @param hash
   * @returns
   */
  public static async VerifyPassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);

  }
}
