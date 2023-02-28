import {IPersonsRepository} from "@application/interfases/IPersonsRepository";
import {PersonBE} from "@domain/Entities/PersonBE";
import {PersonsSchema} from "./../schemas/sql.schemas";
import {Op} from "sequelize";

/**Persist to mongodb Persons */
export default class ProvidersRepository implements IPersonsRepository {
  public Insert(req: PersonBE): Promise<string> {
    return new Promise<string>(async (resolve) => {
      //persist data as simple string
      const person = {
        Name: req.Name,
        Lastname: req.Lastname,
        City: req.City,
        Phone: req.Phone,
        DocNumber: req.DocNumber,
        kafka_Topic: req.kafka_Topic,
        GeneratedDate: req.GeneratedDate,
        CreatedDate: req.CreatedDate ? req.CreatedDate : new Date(),
        CloudId: "Comerce",
      };

      const person_data = await PersonsSchema.create(person, {});
      resolve(person_data.getDataValue("Id"));
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

  /**
   *
   * @param name
   * @returns
   */
  public async GetAll(name?: string): Promise<PersonBE[]> {
    return new Promise<PersonBE[]>(async (resolve) => {
      const where = {
        Name: {
          [Op.like]: name ? `${name}%` : "%",
        },
        kafka_Topic: {
          [Op.eq]: "providers",
        },
      };

      const res = await PersonsSchema.findAll({
        where,
      });

      const list = res.map((p) => {
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

      resolve(list);
    });
  }
}
