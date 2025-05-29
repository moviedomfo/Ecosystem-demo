import axios from 'axios';
import { el, faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { AppSettings } from '../utils/AppSettings';

import { CreateOrderReq, OrderDTO, OrderItemsDto } from '../models';
import CustomersService from './customers.service';
import ProductsService from './products.service';
import { Helper } from '../utils/helper';
import { AuthenticationReq, AuthenticationRes } from '../models/AuthorizationDto';
import SecurityService from './security.service';

const messagesAmount = 2;
//const cron = require("node-cron");

export class OrderPublisher {

  private readonly customersService: CustomersService;
  private readonly productsService: ProductsService;
  private readonly securityService: SecurityService;

  constructor() {
    this.customersService = new CustomersService();
    this.productsService = new ProductsService();
    this.securityService = new SecurityService();

  }

  public async Start() {
    const publisherName = AppSettings.APP_NAME;
    let initialized = false;
    while (!initialized) {
      try {
        SecurityService.currentLogin = await this.securityService.Auth('davendra', '1234')

        await this.customersService.Init();
        await this.productsService.Init();
        initialized = true; // solo se setea si no hubo excepción
      } catch (error) {
        console.error("Error al inicializar servicios, reintentando en 5 segundos...");
        console.error(Helper.GetError(error));
        await new Promise(resolve => setTimeout(resolve, 5000)); // espera 5 segundos antes de reintentar
      }
    }



    setInterval(async () => {
      await this.DoWork();
    }, AppSettings.SECONDS * 2000);

    Helper.LogConsole(
      `------------------${AppSettings.APP_NAME} started  ${publisherName || ''
      } --------------------`
    );
  }

  public async DoWork(): Promise<void> {

    let order;
    try {
      order = await this.generateOrder();


    } catch (error) {
      Helper.LogErrorFull('-------------------------------ERROR Generar orden -----------------------------------------------------', null);
      //Helper.LogErrorFull(JSON.stringify(order), null);
      Helper.LogErrorFull('', error);
      Helper.LogErrorFull('------------------------------------------------------------------------------------', null);
    }

    try {

      if (order && order.OrderId) {
        await this.publish(order);
      }
      else {
        Helper.LogErrorFull('Order is not valid', null);

      }

    } catch (error) {
      Helper.LogErrorFull('-------------------------------ERROR ON ORDER publish-----------------------------------------------------', null);
      //Helper.LogErrorFull(JSON.stringify(order), null);
      Helper.LogErrorFull('', error);
      Helper.LogErrorFull('------------------------------------------------------------------------------------', null);
    }
  }

  async publish(order: OrderDTO): Promise<void> {
    const url: string = AppSettings.BASE_ORDERS_URL + '/api/orders';
    order.Status = 'created';
    const data: CreateOrderReq = {
      Content: order,
      Origin: AppSettings.APP_NAME,
    };
    const headers = {
      ...AppSettings.HEADERS,
      Authorization: SecurityService.currentLogin
        ? `Bearer ${SecurityService.currentLogin.token}`
        : undefined,
    };
    const config = {
      method: 'post',
      url,
      headers,
      data: JSON.stringify(data),
    };
    try {

      const res = await axios(config);

      if (res.status === 200 || res.status === 201) {
        console.log(`Order published successfully: ${order.OrderId}`);
      }
    } catch (error) {
      //throw new Error(`Publish to persons API finalized with errors: ${Helper.GetError(error)}`);
      console.log(`Publish to persons API finalized with errors: ${Helper.GetError(error)}`);
    }

  }




  static async exitAfterSend() {
    console.log(`Exit After Send`);
    await this.sleep(messagesAmount * 500 * 1.2);

    process.exit(0);
  }

  static sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  async generateOrder(): Promise<OrderDTO> {
    let order: OrderDTO = new OrderDTO();
    order.OrderId = uuidv4();
    order.OrderDetail = [];
    const person = await this.customersService.getRandom();
    if (!person || !person._id) throw new Error("No se pudo obtener un cliente válido");

    const maxItems = this.productsService.randomItemsCount(1, 10);
    const usedProductIds = new Set<string>();

    while (order.OrderDetail.length < maxItems) {
      const prod = await this.productsService.getRandom();

      if (!usedProductIds.has(prod._id)) {
        usedProductIds.add(prod._id);

        const item: OrderItemsDto = new OrderItemsDto();
        item.Quantity = this.productsService.randomItemsCount(1, 13);
        item.ProductId = prod._id;
        item.Unit = prod.Unit;

        order.OrderDetail.push(item);
      }
    }

    order.Department = faker.commerce.department();
    order.GeneratedDate = Helper.getIso();
    order.PersonId = person._id;

    return order;
  }

  async _generateOrder(): Promise<OrderDTO> {
    let order: OrderDTO = new OrderDTO();
    order.OrderId = uuidv4();

    const person = await this.customersService.getRandom();

    let itemsCount = this.productsService.randomItemsCount(1, 10);
    while (itemsCount >= 1) {
      const prod = await this.productsService.getRandom();
      let item: OrderItemsDto = new OrderItemsDto();
      item.Quantity = this.productsService.randomItemsCount(1, 13);
      item.ProductId = prod._id;
      item.Unit = prod.Unit;
      order.OrderDetail.push(item);
      itemsCount--;
    }
    order.Department = faker.commerce.department();
    order.GeneratedDate = Helper.getIso();
    order.PersonId = person._id;

    return order;
  }
}
