import AuthService from "@application/Auth.service";
import RefreshTokenService from "@application/RefreshToken.service";
import AuthController from "@infra/controllers/auth.controller";
import ResourseClientsController from "@infra/controllers/resourseClients.controller";
import TokenController from "@infra/controllers/token.controller";
import RedisCacheRepository from "@infra/repos/RedisCahce.repo";
import RSAGeneratorRepository from "@infra/repos/RSAGenerator.repo";
import UserRepository from "@infra/repos/UserMock.repo";
import {createContainer, asClass, InjectionMode} from "awilix";

//Container par ase urilizado por ordersRouter (caso en el que funciona)
const container = createContainer({
  injectionMode: InjectionMode.CLASSIC
});

container.register({
  authService: asClass(AuthService).scoped(),
  refreshTokenService: asClass(RefreshTokenService).scoped(),
  userRepository: asClass(UserRepository).scoped(),
  cacheRepository: asClass(RedisCacheRepository).scoped(),
  authController: asClass(AuthController).scoped(),
  tokenController: asClass(TokenController).scoped(),
  resourseClientsController: asClass(ResourseClientsController).scoped(),
  rsaGeneratorRepository: asClass(RSAGeneratorRepository).scoped()
});

export const authService = container.resolve("authService");
export const refreshTokenService = container.resolve("refreshTokenService");
export const userRepository = container.resolve("userRepository");
export const cacheRepository = container.resolve("cacheRepository");
export const authController = container.resolve("authController");
export const tokenController = container.resolve("tokenController");
export const rsaGeneratorRepository = container.resolve("rsaGeneratorRepository");
export const resourseClientsController = container.resolve("resourseClientsController");
export default container;
