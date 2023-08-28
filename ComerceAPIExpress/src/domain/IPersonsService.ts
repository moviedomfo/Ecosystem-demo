import {PersonBE} from "./Entities/PersonBE";

export interface IPersonsService {
  /**
   * registro de nuevo cliente online
   */
  ArriveNew_Customer: (req: PersonBE, origin: string) => Promise<void>;

  /**
   *
   * @req : Person BE
   * @memberof IPersonsService
   */
  ArriveNew_Provider: (req: PersonBE,origin: string ) => Promise<void>;

  /** */
  GetCustomerById: (id: string) => Promise<PersonBE>;
  GetProviderById: (id: string) => Promise<PersonBE>;
  GetAllCustomers: (name?: string,page:number,limit:number) => Promise<PersonBE[]>;
  GetAllProviders: (page:number,limit:number) => Promise<PersonBE[]>;
  ClearAll: () => Promise<void>;
}
