import axios from 'axios';
import { AppConstants } from '../utils/AppConstants';
import { CreateOrderReq, OrderDTO, OrderItemsDto, Product } from '../models';
// import OrdersRepository from './OrdersSQL.repo';
import { Helper } from '../utils/helper';

export default class OrdersService {

  /** 
   * 
  */
  public async Insert(order: OrderDTO): Promise<string> {

    //await this.repo.Insert(order);
    //console.log('Fake insert order to SQL');
    const url = AppConstants.BASE_ORDERS_URL + '/api/orders';

    const config = {
      method: 'post',
      url,
      headers: AppConstants.HEADERS,
      data: JSON.stringify(order),
    };

    try {
      const response = await axios(config);
      const orderId = response.data.OrderId;
      return orderId;

    }
    catch (error) {
      console.log(Helper.GetError(error));
    }
  };

}
