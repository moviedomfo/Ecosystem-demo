// import axios from 'axios';
import { AppConstants } from '../utils/AppConstants';
import { CreateOrderReq, OrderDTO, OrderItemsDto, Product } from '../models';
import OrdersRepository from './OrdersSQL.repo';
import { Console } from 'console';

export default class OrdersService {
  private readonly repo: OrdersRepository;
  constructor() {
    this.repo = new OrdersRepository();
  }
  /** */
  public async Insert(order: OrderDTO): Promise<any> {

    //await this.repo.Insert(order);
    console.log('Fake insert order to SQL');
    // const url = AppConstants.BASE_ORDERS_URL + '/api/orders';

    // const data: CreateOrderReq = {
    //   Content: order,
    //   Origin: AppConstants.APP_NAME,
    // };
    // const config = {
    //   method: 'post',
    //   url,
    //   headers: AppConstants.HEADERS,
    //   data: JSON.stringify(data),
    // };

    // return new Promise<any>((resolve, reject) => {
    //   axios(config)
    //     .then(function (response) {
    //       console.log(JSON.stringify(response.data));
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // });
  }
}
