import { PersonBE } from '../models';
import axios from 'axios';
import { AppSettings } from '../utils/AppSettings';
import { Helper } from '../utils/helper';
import SecurityService from './security.service';


export default class CustomersService {
  public persons: PersonBE[] = [];


  public async Init(): Promise<void> {

    this.persons = await this.GetAll();
  }

  async GetAll(): Promise<PersonBE[]> {
    const url = `${AppSettings.BASE_COMERCE_URL}/api/persons/customers`;
    const headers = {
      ...AppSettings.HEADERS,
      Authorization: SecurityService.currentLogin
        ? `Bearer ${SecurityService.currentLogin.token}`
        : undefined,
    };
    try {
      const res = await axios.get<any>(url, { headers });
      return res.data;
    } catch (error) {
      throw new Error(`Getting PersonBE errors: ${Helper.GetError(error)}`);
    }
  }

  /**get reamdom person from cache */
  public async getRandom() {
    if (!this.persons) {
      await this.Init();
    }
    if (this.persons.length === 0) {
      throw new Error('No persons available to select from.');
    }

    const index = Math.floor(Math.random() * this.persons.length);

    const person = this.persons[index];

    return person;
  }
}
