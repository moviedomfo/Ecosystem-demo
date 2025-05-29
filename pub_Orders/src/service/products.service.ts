import axios from 'axios';
import { AppSettings } from '../utils/AppSettings';
import { Helper } from './../utils/helper';
import { Product } from '../models';
import SecurityService from './security.service';

export default class ProductsService {
  public products: Product[]=[];


  public async Init(): Promise<void> {

    this.products = await this.GetAll();
  }
  // 
  async GetAll(): Promise<Product[]> {

    const url = `${AppSettings.BASE_COMERCE_URL}/api/products`;
    const headers = {
      ...AppSettings.HEADERS,
      Authorization: SecurityService.currentLogin
        ? `Bearer ${SecurityService.currentLogin.token}`
        : undefined,
    };
    try {
      const response = await axios.get<any>(url, { headers });
      return response.data;
    } catch (error) {
      throw new Error(
        `Getting productos errors: ${Helper.GetError(error)}`
      );
    }
  }
  /**retrive random product */
  public async getRandom() {
    if (this.products.length === 0) {
      await this.Init();
    }
    if (this.products.length === 0) {
      throw new Error('No products available to select from.');
    }

    return this.products[Math.floor(Math.random() * this.products.length)];

  }

  /*  returns details quantity (items count)
   */
  public randomItemsCount(min, max): number {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
