import AuthService from "@application/Auth.service";
import RefreshTokenService from "@application/RefreshToken.service";
import AuthController from "@infra/controllers/auth.controller";
import TokenController from "@infra/controllers/token.controller";
import UserRepository from "@infra/repos/UserMock.repo";
import {createContainer, asClass, InjectionMode} from "awilix";
import InMemRedisCahceRepository from "@infra/repos/InMemRedisCahce.repo";
import ResourseClientsController from "@infra/controllers/resourseClients.controller";
import RSAGeneratorRepository from "@infra/repos/RSAGenerator.repo";

const containerTest = createContainer({
  injectionMode: InjectionMode.CLASSIC,
});
containerTest.register({
  authService: asClass(AuthService).scoped(),
  refreshTokenService: asClass(RefreshTokenService).scoped(),
  userRepository: asClass(UserRepository).scoped(),
  cacheRepository: asClass(InMemRedisCahceRepository).scoped(),
  authController: asClass(AuthController).scoped(),
  tokenController: asClass(TokenController).scoped(),
  resourseClientsController: asClass(ResourseClientsController).scoped(),
  rsaGeneratorRepository: asClass(RSAGeneratorRepository).scoped()
});

export const authService = containerTest.resolve("authService");
export const refreshTokenService = containerTest.resolve("refreshTokenService");
export const userRepository = containerTest.resolve("userRepository");
export const cacheRepository = containerTest.resolve("cacheRepository");
export const authController = containerTest.resolve("authController");
export const tokenController = containerTest.resolve("tokenController");
export default containerTest;
