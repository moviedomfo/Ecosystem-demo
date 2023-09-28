import {AppConstants} from "@common/CommonConstants";
import {NextFunction, Request, Response} from "express";
import {POST, route} from "awilix-express";
import SavePublicKeyDto from "@domain/DTOs/SavePublicKeyDto";
import {JWTFunctions} from "@common/helpers/jwtFunctions";

/**
 * This controlles has the responsability of manage and localize the publick key used to verify jwt
 *
 */
@route("/api/securitySettings")
export default class SecuritySettingsController {
  constructor() {}
  @route("/")
  @POST()
  public Create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reqBody: SavePublicKeyDto = req.body as SavePublicKeyDto;

      JWTFunctions.SavePublicKey(reqBody.publicKey, AppConstants.APP_CLIENT_ID);
      res.status(200).send();
    } catch (e) {
      next(e);
    }
  };
}
