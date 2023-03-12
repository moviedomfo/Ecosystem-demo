import {rejects} from "assert";
import {IProductRepository} from "./../../application/interfases/IProductRepository";
import {CreateProductDto} from "./../../domain/DTOs/ProductDto";
import {ProductBE} from "./../../domain/Entities/ProductBE";
import {ProductsSchema} from "./../../infra/schemas/sql.schemas";
import {Op, UUIDV4} from "sequelize";
import {ExeptionFunctions} from "@common/helpers/ExeptionFunctions";
import dayjs from "dayjs";

/** read products from mongodb, but not insert any record. this API is for Orders only */
export default class ProductMongoRepository implements IProductRepository {
  public Create(req: CreateProductDto): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      req.GeneratedDate = new Date(req.GeneratedDate);

      // Format to string data with is accepted by SQL server column data type datetime -
      const generatedDateString = dayjs(req.GeneratedDate).format("YYYY-MM-DD HH:mm:ss.SSS");

      //persist data as simple string
      const product = {
        // Id: UUIDV4(),
        Name: req.Name,
        Cost: req.Cost,
        Material: req.Material,
        Unit: req.Unit,
        Lab: req.Lab,
        GeneratedDate: req.GeneratedDate,
        Description: req.Description,
        Department: req.Department,
        kafka_topic: "products",
        FechaSequalize: generatedDateString,
      };

      try {
        const product_db = await ProductsSchema.create(product, {});

        resolve(product_db.getDataValue("Id"));
      } catch (error) {
        reject(error);
      }
    });
  }
  public GetById(id: string): Promise<ProductBE> {
    return new Promise<ProductBE>(async (resolve, reject) => {
      try {
        const res = await ProductsSchema.findByPk(id);

        const product: ProductBE = {
          Id: res.getDataValue("Id"),
          Name: res.getDataValue("Name"),
          Cost: res.getDataValue("Cost"),
          Count: res.getDataValue("Count"),
          Material: res.getDataValue("Material"),
          Unit: res.getDataValue("Unit"),
          Lab: res.getDataValue("Lab"),
          Description: res.getDataValue("Description"),
          Department: res.getDataValue("Department"),
          GeneratedDate: res.getDataValue("GeneratedDate"),
          // CreatedDate: res.getDataValue("CreatedDate"),
        };
        resolve(product);
      } catch (error) {
        reject(error);
      }
    });
  }

  public async ClearAll(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      // ProductSchema.collection.deleteMany({});
      resolve();
    });
  }

  public async GetAll(name?: string): Promise<ProductBE[]> {
    return new Promise<ProductBE[]>(async (resolve, reject) => {
      const where = {
        Name: {
          [Op.like]: name ? `${name}%` : "%",
        },
      };
      try {
        const res = await ProductsSchema.findAll({
          where,
        });

        const list = res.map((p) => {
          const item: ProductBE = {
            Id: p.getDataValue("Id"),
            Name: p.getDataValue("Name"),
            Cost: p.getDataValue("Cost"),
            Count: p.getDataValue("Count"),
            Material: p.getDataValue("Material"),
            Unit: p.getDataValue("Unit"),
            Lab: p.getDataValue("Lab"),
            Description: p.getDataValue("Description"),
            Department: p.getDataValue("Department"),
            GeneratedDate: p.getDataValue("GeneratedDate"),
          };
          return item;
        });
        resolve(list);
      } catch (error) {
        reject(error);
      }
    });
  }
}
