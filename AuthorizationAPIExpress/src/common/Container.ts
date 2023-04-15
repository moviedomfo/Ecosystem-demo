import AuthService from "@application/Auth.service";
import AuthController from "@infra/controllers/auth.controller";
import TokenController from "@infra/controllers/token.controller";
import RedisCacheRepository from "@infra/repos/RedisCahce.repo";
import UserRepository from "@infra/repos/Users.repo";
import {createContainer, asClass, InjectionMode} from "awilix";

//Container par ase urilizado por ordersRouter (caso en el que funciona)
const container = createContainer({
  injectionMode: InjectionMode.CLASSIC,
});

container.register({
  authService: asClass(AuthService).scoped(),
  userRepository: asClass(UserRepository).scoped(),
  cacheRepository: asClass(RedisCacheRepository).scoped(),

  authController: asClass(AuthController).scoped(),
  tokenController:asClass(TokenController).scoped()
});

export const authService = container.resolve("authService");
export const userRepository = container.resolve("userRepository");
export const cacheRepository = container.resolve("cacheRepository");
export const authController = container.resolve("authController");
export const tokenController = container.resolve("authController");
export default container;
