import UserRepository from "../infra/repos/UserMock.repo";
import RefreshTokenService from "../application/RefreshToken.service";
import InMemRedisCahceRepository from "../infra/repos/InMemRedisCahce.repo";
const {createContainer} = require("awilix");
const {scopePerRequest} = require("awilix-express");
import {asClass} from "awilix";
import AuthController from "../infra/controllers/auth.controller";
import AuthService from "../application/Auth.service";
import TokenController from "../infra/controllers/token.controller";

const container = createContainer();
container.register({
  authService: asClass(AuthService).scoped(),
  refreshTokenService: asClass(RefreshTokenService).scoped(),
  userRepository: asClass(UserRepository).scoped(),
  cacheRepository: asClass(InMemRedisCahceRepository).scoped(),
  authController: asClass(AuthController).scoped(),
  tokenController: asClass(TokenController).scoped()
});

export const authService = container.resolve("authService");
export const refreshTokenService = container.resolve("refreshTokenService");
export const userRepository = container.resolve("userRepository");
export const cacheRepository = container.resolve("cacheRepository");
export const authController = container.resolve("authController");
export const tokenController = container.resolve("tokenController");
export default container;

// container.loadModules([
//   "src/application/**/*.ts",
//   "src/infra/repos/**/*.ts"
// ], {
//   formatName: "camelCase",
//   resolverOptions: {
//     register: awilix.asClass,
//     lifetime: awilix.Lifetime.SCOPED
//   }
// });
// container.register({
//   container: awilix.asValue(container),
//   scopePerRequest
// });
