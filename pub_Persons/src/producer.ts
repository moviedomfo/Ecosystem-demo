import axios from 'axios';
import { faker } from '@faker-js/faker';

const colors = require('colors');
import { v4 as uuidv4 } from 'uuid';
import { AppSettings } from './AppSettings';
import { Helper } from './helper';
import { Person } from './model';
import SecurityService from './security.service';
const https = require('https');
const messagesAmount = 2;
const cron = require('node-cron');

export class Publisher {
  private readonly securityService: SecurityService;

  constructor() {
    this.securityService = new SecurityService()
  }

  public async Start() {
    SecurityService.currentLogin = await this.securityService.Auth('davendra', '1234');

    const publisherName = AppSettings.APP_NAME;
    //at every minute
    // cron.schedule('8 * * * *', async () => {
    //   await this.DoWork_Providers_Arrivements();
    // });
    setInterval(async () => {
      await this.DoWork_Providers_Arrivements();
    }, AppSettings.Secconds * 1350);
    setInterval(async () => {
      await this.DoWork_Custommers_Arrivements();
    }, AppSettings.Secconds * 1000);

    Helper.LogConsole(
      `------------------Publisher started  ${publisherName || ''
      } --------------------`
    );
    Helper.LogConsole(`API url ${AppSettings.BASE_URL}`);
  }

  public async DoWork_Providers_Arrivements(): Promise<void> {
    try {
      const person = this.generatePerson();

      Helper.LogConsoleCyan(`Provider --> ${person.GetFullName()}`);
      await this.SendProvider(person);
    } catch (error) {
      Helper.LogErrorFull('', error);
    }
  }
  public async DoWork_Custommers_Arrivements(): Promise<void> {
    try {
      const person = this.generatePerson();

      Helper.LogConsole(`Customer -> ${person.GetFullName()}`);
      await this.SendCustomer(person);
    } catch (error) {
      Helper.LogErrorFull('', error);
    }
  }

  private async SendProvider(person: Person): Promise<any> {
    const url = AppSettings.BASE_URL + '/api/persons/provider';

    const data = {
      key: person.Id,
      content: person,
      type: 9000,
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
      throw new Error(`Importing finalized with errors: ${Helper.GetError(error)}`);
    }

  }
  /**
   * 
   * @param person 
   * @returns 
   */
  private async SendCustomer(person: Person): Promise<any> {
    const url = AppSettings.BASE_URL + '/api/persons/customer';

    const data = {
      key: person.Id,
      content: person,
      type: 8000,
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
        'Publish to persons API finalized with errors: ' + Helper.GetError(error)
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

  generatePerson(): Person {
    let p: Person = new Person();
    p.Id = uuidv4();
    p.Name = faker.person.firstName();
    p.Lastname = faker.person.lastName();
    p.City = faker.location.city();
    p.Phone = faker.phone.number();
    p.GeneratedDate = new Date(); // Helper.getIso();
    p.DocNumber = faker.number.int({ min: 1000000, max: 9999999 }).toString();
    // p.DocType = faker.helpers.arrayElement(['DNI', 'Passport']);
    return p;
  }
}
