import axios from 'axios';
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { AppSettings } from '../utils/AppSettings';

import { CreateOrderReq, OrderDTO, OrderItemsDto, Product } from '../models';
import CustomersService from './customers.service';
import ProductsService from './products.service';
import { Helper } from '../utils/helper';

const messagesAmount = 2;
//const cron = require("node-cron");

export class OrderPublisher {
  private readonly customersService: CustomersService;
  private readonly productsService: ProductsService;
  constructor() {
    this.customersService = new CustomersService();
    this.productsService = new ProductsService();
  }

  public async Start() {
    const publisherName = AppSettings.APP_NAME;
    await this.customersService.Init();
    await this.productsService.Init();

    setInterval(async () => {
      await this.DoWork();
    }, AppSettings.SECONDS * 2000);

    Helper.LogConsole(
      `------------------${AppSettings.APP_NAME} started  ${
        publisherName || ''
      } --------------------`
    );
    //Helper.LogConsole(`API url ${AppSettings.BASE_ORDERS_URL}`);
  }

  public async DoWork(): Promise<void> {
    try {
      const order = await this.generateOrder();

      //Helper.LogConsole(`${order.GetFullName()}`);
      await this.publish(order);
    } catch (error) {
      Helper.LogErrorFull('', error);
    }
  }
  private async publish(order: OrderDTO): Promise<any> {
    let url: string = AppSettings.BASE_ORDERS_URL + '/api/orders/';

    const data: CreateOrderReq = {
      Content: order,
      Origin: AppSettings.APP_NAME,
    };
    const config = {
      method: 'post',
      url,
      headers: AppSettings.HEADERS,
      data: JSON.stringify(data),
    };

    return new Promise<any>((resolve, reject) => {
      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  }
  private async publish3(order: OrderDTO): Promise<any> {
    const url = AppSettings.BASE_ORDERS_URL + '/api/orders';

    const data: CreateOrderReq = {
      Content: order,
      Origin: AppSettings.APP_NAME,
    };

    return new Promise<any>((resolve, reject) => {
      return (
        axios
          //.post<any>(url, JSON.stringify(data), {
          .post<any>(url, data, {
            headers: AppSettings.HEADERS,
            proxy: false,
          })
          .then((res) => {
            resolve(res.data);
          })
          .catch(function (error) {
            let e = new Error(
              'Importing finalized with errors : ' +
                Helper.GetError(error.stack)
            );
            reject(e);
          })
      );
    });
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

    const person = await this.customersService.getRandom();

    let itemsCount = this.productsService.randomItemsCount(1, 10);
    while (itemsCount >= 1) {
      const prod = await this.productsService.getRandom();
      let item: OrderItemsDto = new OrderItemsDto();
      item.Quantity = this.productsService.randomItemsCount(1, 13);
      item.ProductId = prod.Id;
      item.Unit = prod.Unit;
      order.OrderDetail.push(item);
      itemsCount--;
    }
    order.Department = faker.commerce.department();
    order.GeneratedDate = Helper.getIso();
    order.PersonId = person.Id;

    return order;
  }
}
