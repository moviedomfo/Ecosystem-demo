import axios from 'axios';
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { AppSettings } from './AppSettings';
import { Helper } from './helper';
import { Product } from './model';

const messagesAmount = 2;
//const cron = require("node-cron");

export class Publisher {
  constructor() {}

  public async Start() {
    const publisherName = AppSettings.APP_NAME;

    setInterval(async () => {
      await this.DoWork();
    }, AppSettings.Secconds * 8500);

    Helper.LogConsole(
      `------------------Product publisher started  ${
        publisherName || ''
      } --------------------`
    );
    Helper.LogConsole(`API url ${AppSettings.BASE_URL}`);
  }

  public async DoWork(): Promise<void> {
    try {
      const product = this.generateProduct();

      Helper.LogConsole(`${product.GetFullName()}`);
      await this.SendMessage(product);
    } catch (error) {
      Helper.LogErrorFull('', error);
    }
  }

  private async SendMessage(product: Product): Promise<any> {
    const url = AppSettings.BASE_URL + '/api/products';

    const data = {
      content: product,
      origin: AppSettings.APP_NAME,
    };
    return new Promise<any>((resolve, reject) => {
      return axios
        .post<any>(url, data, { headers: AppSettings.HEADERS })
        .then((res) => {
          resolve(res.data);
        })
        .catch(function (error) {
          let e = new Error(
            'Importing finalized with errors : ' + Helper.GetError(error)
          );
          reject(e);
        });
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

  generateProduct(): Product {
    let p: Product = new Product();
    p.Id = uuidv4();
    p.Material = faker.commerce.productMaterial();
    p.Name = faker.commerce.productName();
    p.Description = faker.commerce.productDescription();
    p.Unit = faker.science.unit().name;
    p.Lab = faker.science.chemicalElement().name;
    p.GeneratedDate = new Date(); //Helper.getTime_Iso();
    p.Cost = faker.commerce.price(100, 200, 0);
    p.Department = faker.commerce.department();

    return p;
  }
}
