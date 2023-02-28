import axios from 'axios';
import { AppSettings } from '../utils/AppSettings';
import { Helper } from './../utils/helper';
import { Product } from '../models';

export default class ProductsService {
  public products: Product[];

  public Init(): Promise<void> {
    return new Promise<any>(async (resolve, reject) => {
      this.products = await this.GetAll();
      resolve('');
    });
  }

  // @Get("/getAll")
  async GetAll(): Promise<Product[]> {
    const url = AppSettings.BASE_COMERCE_URL + '/api/products';
    return new Promise<any>((resolve, reject) => {
      return axios
        .get<any>(url, { headers: AppSettings.HEADERS })
        .then((res) => {
          resolve(res.data);
        })
        .catch(function (error) {
          let e = new Error(
            'Getting productos errors : ' + Helper.GetError(error)
          );
          reject(e);
        });
    });
  }
  /**retrive random product */
  public async getRandom() {
    if (this.products.length === 0) {
      await this.Init();
    }
    return this.products[Math.floor(Math.random() * this.products.length - 1)];
  }

  /*  returns details quantity (items count)
   */
  public randomItemsCount(min, max): number {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
