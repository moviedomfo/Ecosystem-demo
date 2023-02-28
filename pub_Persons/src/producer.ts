import axios from 'axios';
import { faker } from '@faker-js/faker';

const colors = require('colors');
import { v4 as uuidv4 } from 'uuid';
import { AppSettings } from './AppSettings';
import { Helper } from './helper';
import { Person } from './model';
const https = require('https');
const messagesAmount = 2;
const cron = require('node-cron');

export class Publisher {
  constructor() {}

  public async Start() {
    const publisherName = AppSettings.APP_NAME;
    //at every minute
    cron.schedule('8 * * * *', async () => {
      await this.DoWork_Providers_Arrivements();
    });

    setInterval(async () => {
      await this.DoWork_Custommers_Arrivements();
    }, AppSettings.Secconds * 1000);

    Helper.LogConsole(
      `------------------Publisher started  ${
        publisherName || ''
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

  private async SendCustomer(person: Person): Promise<any> {
    const url = AppSettings.BASE_URL + '/api/persons/customer';

    const data = {
      key: person.Id,
      content: person,
      type: 8000,
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
            'Importing customers finalized with errors : ' +
              Helper.GetError(error)
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

  generatePerson(): Person {
    let p: Person = new Person();
    p.Id = uuidv4();
    p.Name = faker.name.firstName();
    p.Lastname = faker.name.lastName();
    p.City = faker.address.city();
    p.Phone = faker.phone.number();
    p.GeneratedDate = new Date(); // Helper.getIso();
    p.DocNumber = faker.random.numeric(8);
    return p;
  }
}
