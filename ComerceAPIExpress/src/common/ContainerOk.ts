import {createContainer, asClass, InjectionMode} from "awilix";
import PersonsPubController from "../infra/controllers/PersonsPub.controller";
import ProductPubController from "../infra/controllers/ProductPub.controller";
import PersonsService from "../application/Persons.service";
import KafkaEventBusRepository from "../infra/repos/EventBus.repo";
import CustomersRepository from "../infra/repos/CustomersSQL.repo";
import ProvidersRepository from "../infra/repos/ProvidersSQL.repo";
import ProductService from "../application/Product.service";
import ProductMongoRepository from "../infra/repos/ProductSQL.repo";
import SecuritySettingsController from "@infra/controllers/securitySettings.controller";
/**
 * Dependency Injection (DI) Container implemented with awilix 
 */
const Container = createContainer({
  injectionMode: InjectionMode.CLASSIC,
});


Container.register({
  customersRepo: asClass(CustomersRepository).scoped(),
  providersRepo: asClass(ProvidersRepository).scoped(),
  productRepo: asClass(ProductMongoRepository).scoped(),
  productService: asClass(ProductService).scoped(),
  productPubController: asClass(ProductPubController).scoped(),
  personsService: asClass(PersonsService).scoped(),
  personsPubController: asClass(PersonsPubController).scoped(),
  evetBusRepo: asClass(KafkaEventBusRepository).scoped(),  
  securitySettingsController: asClass(SecuritySettingsController).scoped(),

});

export const personsService = Container.resolve("personsService");
export const evetBusRepo = Container.resolve("evetBusRepo");
export const productPubController = Container.resolve("productPubController");
export const productService = Container.resolve("productService");

export const personsPubController = Container.resolve("personsPubController");

export const providersRepo = Container.resolve("providersRepo");
export const customersRepo = Container.resolve("customersRepo");
export const productRepo = Container.resolve("productRepo");

export default Container;
