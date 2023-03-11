import {GetVerificationKey} from "express-jwt";
import {PersonBE} from "@domain/Entities/PersonBE";
import {IKafkaMessageDto, ImessageDto} from "@domain/DTOs/MessageDto";
import {IEventBusRepository} from "./interfases/IEventBusRepository";
import {IPersonsRepository} from "./interfases/IPersonsRepository";
import {IPersonsService} from "./../domain/IPersonsService";
import CustomersRepository from "@infra/repos/CustomersSQL.repo";
import PersonWasCreatedEvent from "./events/PersonWasCreatedEvents";
import {or} from "sequelize";

// @Route("PersonsService")
export default class PersonsService implements IPersonsService {
  private readonly _customersRepository: IPersonsRepository;
  private readonly _providersRepository: IPersonsRepository;
  private readonly _EventBusRepo: IEventBusRepository;

  constructor(private readonly customersRepo: IPersonsRepository, private readonly providersRepo: IPersonsRepository, private readonly evetBusRepo: IEventBusRepository) {
    this._customersRepository = customersRepo;
    this._providersRepository = providersRepo;
    this._EventBusRepo = evetBusRepo;
  }

  /**
   * New customme is registered online
   * 1) persist to database
   * 2) send to Queue (rabit or kafka)
   * @param person
   * @origin Api app caller
   */
  public async ArriveNew_Customer(person: PersonBE, origin: string): Promise<void> {
    try {
      // person.CreatedDate = new Date(person.CreatedDate);
      // person.GeneratedDate = new Date(person.GeneratedDate);

      const id = await this._customersRepository.Insert(person);
      person.Id = id;
      // const msg: IKafkaMessageDto = {
      //   key: person.Id.toString(),
      //   command: "CreateCustomerEvent",
      //   content: JSON.stringify(person),
      //   origin: origin,
      // };

      /** send to Event Buss */
      //await this._EventBusRepo.PushToQueue(msg, "customers");
      const event: PersonWasCreatedEvent = new PersonWasCreatedEvent(person, origin);
      await event.Emit();
    } catch (err) {
      //console.log("push err  " + JSON.stringify(err));
      throw err;
    }
  }
  /**
   * New provider is registered online
   * 1) persist to database eg:sql server
   * 2) send to Queue (rabit or kafka)
   * @param person
   * @origin this params can be changed if you need to set other topic type for kafka
   */
  public async ArriveNew_Provider(person: PersonBE, origin: string): Promise<void> {
    try {
      await this._providersRepository.Insert(person);

      const msg: IKafkaMessageDto = {
        key: person.Id.toString(),
        command: "CreateProviderEvent",
        content: JSON.stringify(person),
        origin: origin,
      };

      /** send to Event Buss */
      await this._EventBusRepo.PushToQueue(msg, "providers");
    } catch (err) {
      throw err;
    }
  }
  // @Get("/getById")
  public async GetCustomerById(id: string): Promise<PersonBE> {
    return this._customersRepository.GetById(id);
  }

  // @Get("/getAll")
  public async GetAllCustomers(name?: string): Promise<PersonBE[]> {
    return await this._customersRepository.GetAll(name);
  }
  // @Get("/getById")
  public async GetProviderById(id: string): Promise<PersonBE> {
    //try {
    return await this._providersRepository.GetById(id);
    // } catch (err) {
    //   throw err;
    // }
  }

  // @Get("/getAll")
  public async GetAllProviders(): Promise<PersonBE[]> {
    return this._providersRepository.GetAll();
  }
  // @Get("/clearAll")j
  public async ClearAll(): Promise<void> {
    return this._customersRepository.ClearAll();
  }
}
