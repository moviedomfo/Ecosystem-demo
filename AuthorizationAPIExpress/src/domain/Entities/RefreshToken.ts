/**
 * Encapsulate refress token extra data to store it
 */
export class RefreshToken {
  /**ToBase64String token */
  Token: string;
  /**exipration date */
  Expires: any;
  /**creation date */
  Created: any;
  /**The token gives from this ip */
  CreatedByIp: string;
  /**the token belongs to this userid
   */
  UserID: string;
}
