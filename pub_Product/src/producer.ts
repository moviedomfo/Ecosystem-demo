import axios from 'axios';
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { AppSettings } from './AppSettings';
import { Helper } from './helper';
import { Product } from './model';
import { AuthenticationReq, AuthenticationRes } from './AuthorizationDto';
import SecurityService from './security.service';

const messagesAmount = 2;

export class Publisher {

  private readonly securityService: SecurityService;

  constructor() {
    this.securityService = new SecurityService()
  }
  public async Start() {
    const publisherName = AppSettings.APP_NAME;

    setInterval(async () => {
      SecurityService.currentLogin = await this.securityService.Auth('davendra', '1234');

      await this.DoWork();
    }, AppSettings.Secconds * 8500);

    Helper.LogConsole(
      `------------------Product publisher started  ${publisherName || ''
      } --------------------`
    );

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
    const url = `${AppSettings.BASE_URL}/api/products`;

    const data = {
      content: product,
      origin: AppSettings.APP_NAME,
    };
    const headers = {
      ...AppSettings.HEADERS,
      Authorization: SecurityService.currentLogin
        ? `Bearer ${SecurityService.currentLogin.token}`
        : undefined,
    };
    try {
      const response = await axios.post<any>(url, data, { headers });
      return response.data;
    } catch (error) {
      throw new Error(
        `Importing finalized with errors: ${Helper.GetError(error)}`
      );
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

  generateProduct(): Product {
    let p: Product = new Product();
    p.Id = uuidv4();
    p.Material = faker.commerce.productMaterial();
    p.Name = faker.commerce.productName();
    p.Description = faker.commerce.productDescription();
    p.Unit = faker.science.unit().name;
    p.Lab = faker.science.chemicalElement().name;
    p.GeneratedDate = new Date(); //Helper.getTime_Iso();


    p.Cost = faker.commerce.price({ min: 10, max: 200, dec: 2, symbol: '' });
    p.Department = faker.commerce.department();

    return p;
  }

}
