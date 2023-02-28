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
  GetAllCustomers: () => Promise<PersonBE[]>;
  GetAllProviders: () => Promise<PersonBE[]>;
  ClearAll: () => Promise<void>;
}
