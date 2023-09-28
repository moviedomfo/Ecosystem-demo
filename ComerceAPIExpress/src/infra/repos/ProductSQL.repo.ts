import {rejects} from "assert";
import {IProductRepository} from "@application/interfases/IProductRepository";
import {CreateProductDto} from "@domain/DTOs/ProductDto";
import {ProductBE} from "@domain/Entities/ProductBE";
import {ProductsSchema} from "@infra/schemas/sql.schemas";
import {Op, UUIDV4} from "sequelize";
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

        const object = {
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
        const product = ProductBE.Create(object);
        resolve(product);
      } catch (error) {
        reject(error);
      }
    });
  }

  public async ClearAll(): Promise<void> {
    return new Promise<void>((resolve, _reject) => {
      // ProductSchema.collection.deleteMany({});
      resolve();
    });
  }
  /**
   *
   * @param name filter
   * @param page requested page
   * @param pageSize limit  or page size
   * @returns
   */
  public async GetAll(name?: string, page: number = 1, pageSize: number = 10): Promise<ProductBE[]> {
    const offset = (page - 1) * pageSize;

    return new Promise<ProductBE[]>(async (resolve, reject) => {
      const where = {
        Name: {
          [Op.like]: name ? `${name}%` : "%",
        },
      };
      try {
        const res = await ProductsSchema.findAll({
          where,
          limit: pageSize,
          offset,
        });

        const list = res.map((p) => {
          const object = {
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
          const item = ProductBE.Create(object);
          return item;
        });
        resolve(list);
      } catch (error) {
        reject(error);
      }
    });
  }
}
