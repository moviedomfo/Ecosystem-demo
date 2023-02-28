import { PersonBE } from '../models';
import axios from 'axios';
import { AppSettings } from '../utils/AppSettings';
import { Helper } from '../utils/helper';


export default class CustomersService {
  public persons: PersonBE[];

  public Init(): Promise<void> {
    return new Promise<any>(async (resolve, reject) => {
      this.persons = await this.GetAll();
      resolve('');
    });
  }

  // @Get("/getAll")
  async GetAll(): Promise<PersonBE[]> {
    const url = AppSettings.BASE_COMERCE_URL + '/api/persons/customers';
    return new Promise<any>((resolve, reject) => {
      return axios
        .get<any>(url, { headers: AppSettings.HEADERS })
        .then((res) => {
          resolve(res.data);
        })
        .catch(function (error) {
          let e = new Error(
            'Getting PersonBE errors : ' + Helper.GetError(error)
          );
          reject(e);
        });
    });
  }

  /**get reamdom person from cache */
  public async getRandom() {
    if (!this.persons) {
      await this.Init();
    }
    const index = Math.floor(Math.random() * this.persons.length - 1);
    return this.persons[index];
  }
}
