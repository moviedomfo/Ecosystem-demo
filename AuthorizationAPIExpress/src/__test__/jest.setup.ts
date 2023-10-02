import UserRepository from "../infra/repos/UserMock.repo";
import RefreshTokenService from "../application/RefreshToken.service";
import InMemCahceRepository from "../infra/repos/InMemCahceRepository.repo";
import {createContainer, asClass, InjectionMode} from "awilix";
import AuthController from "../infra/controllers/auth.controller";
import AuthService from "../application/Auth.service";
import TokenController from "../infra/controllers/token.controller";
import RSAGeneratorRepository from "../infra/repos/RSAGenerator.repo";

const container = createContainer({
  injectionMode: InjectionMode.CLASSIC
});

container.register({
  authService: asClass(AuthService).scoped(),
  userRepository: asClass(UserRepository).scoped(),
  cacheRepository: asClass(InMemCahceRepository).scoped(),
  refreshTokenService: asClass(RefreshTokenService).scoped(),
  authController: asClass(AuthController).scoped(),
  tokenController: asClass(TokenController).scoped(),
  rsaGeneratorRepository: asClass(RSAGeneratorRepository).scoped()
});

export const authService = container.resolve("authService");
export const refreshTokenService = container.resolve("refreshTokenService");
export const userRepository = container.resolve("userRepository");
export const cacheRepository = container.resolve("cacheRepository");
export const authController = container.resolve("authController");
export const tokenController = container.resolve("tokenController");
export const rsaGeneratorRepository = container.resolve("rsaGeneratorRepository");
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
