import { LogFunctions } from './../../common/helpers/logFunctions';
import {PersonsSchema} from "@infra/schemas/sql.schemas";
import {IPersonsRepository} from "@application/interfases/IPersonsRepository";

import {PersonBE} from "@domain/Entities/PersonBE";
import {Op} from "sequelize";
import {DateFunctions} from "@common/helpers/dateFunctions";
import { ExeptionFunctions } from '@common/helpers/handleErrorFunctions';

/**Persist to mongodb Persons */
export default class CustomersRepository implements IPersonsRepository {
  public Insert(req: PersonBE): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      //req.CreatedDate = dayjs(req.CreatedDate.toString()).toDate();

      // const f2 = dayjs(req.GeneratedDate).toISOString();
      // const f3 = dayjs(req.GeneratedDate).format("YYYY-MM-DD HH:mm:ss.SSS");
      // const f4 = dayjs(req.GeneratedDate.toString()).toDate();

      // const fechas = {
      //   Name: req.Name,
      //   f1: req.GeneratedDate,
      //   f2,
      //   f3,
      //   f4,
      // };
      // console.log(fechas);
      const person = {
        Name: req.Name,
        Lastname: req.Lastname,
        City: req.City,
        Phone: req.Phone,
        DocNumber: req.DocNumber,
        kafka_Topic: "Customers", //req.kafka_Topic,
        GeneratedDate: req.GeneratedDate,
        CreatedDate: req.CreatedDate ? req.CreatedDate : new Date(),
        CloudId: "Comerce",
      };

      try {
        const cp = await PersonsSchema.create(person, {});

        resolve(cp.getDataValue("Id"));
      } catch (error) {
        let e = new Error("Insert into SQL errors : " + ExeptionFunctions.GetMessageError(error));
        reject(e);
      }
    });
  }

  public GetById(id: string): Promise<PersonBE> {
    return new Promise<PersonBE>(async (resolve) => {
      const res = await PersonsSchema.findByPk(id);
      const person: PersonBE = {
        Id: res.getDataValue("Id"),
        Name: res.getDataValue("Name"),
        Lastname: res.getDataValue("LastName"),
        City: res.getDataValue("LastName"),
        Phone: res.getDataValue("Phone"),
        kafka_Topic: res.getDataValue("kafka_Topic"),
        DocNumber: res.getDataValue("DocNumber"),
        GeneratedDate: res.getDataValue("GeneratedDate"),
        CreatedDate: res.getDataValue("CreatedDate"),
      };
      resolve(person);
    });
  }

  public async ClearAll(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      //PersonsSchema.cl.deleteMany({});
      resolve();
    });
  }

  public async GetAll(name?: string): Promise<PersonBE[]> {
    return new Promise<PersonBE[]>(async (resolve) => {
      const where = {
        Name: {
          [Op.like]: name ? `${name}%` : "%",
        },
        kafka_Topic: {
          [Op.eq]: "customers",
        },
      };

      const res = await PersonsSchema.findAll({
        where,
      });

      const persons = res.map((p, index) => {
        const person: PersonBE = {
          Id: p.getDataValue("Id"),
          Name: p.getDataValue("Name"),
          Lastname: p.getDataValue("LastName"),
          City: p.getDataValue("LastName"),
          Phone: p.getDataValue("Phone"),
          kafka_Topic: p.getDataValue("kafka_Topic"),
          DocNumber: p.getDataValue("DocNumber"),
          GeneratedDate: p.getDataValue("GeneratedDate"),
          CreatedDate: p.getDataValue("CreatedDate"),
        };

        return person;
      });

      resolve(persons);
    });
  }
}
