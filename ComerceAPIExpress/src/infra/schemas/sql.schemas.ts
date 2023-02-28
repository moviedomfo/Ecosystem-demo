import {Model, DataTypes} from "sequelize";
import sequelize from "../db/Sequelize-sql-db";

class PersonsSchema extends Model {}

// 2. Create a Schema corresponding to the document interface.
PersonsSchema.init(
  {
    Id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.STRING, allowNull: false},
    Lastname: {type: DataTypes.STRING, allowNull: false},
    City: {type: DataTypes.STRING, allowNull: false},
    Phone: {type: DataTypes.STRING, allowNull: false},
    CloudId: {type: DataTypes.STRING, allowNull: false, field: "CloudId"},
    DocNumber: {type: DataTypes.STRING, allowNull: false, field: "DocNumber"},
    kafka_Topic: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "kafka_Topic",
    },
    GeneratedDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "GeneratedDate",
    },
    CreatedDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, //Date.now(),
      field: "CreatedDate",
    },
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    tableName: "Persons",
  }
);
class ProductsSchema extends Model {}
ProductsSchema.init(
  {
    Id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.STRING, allowNull: false},
    Department: {type: DataTypes.STRING, allowNull: false},
    Material: {type: DataTypes.STRING, allowNull: false},
    Lab: {type: DataTypes.STRING, allowNull: false},
    Cost: {type: DataTypes.DECIMAL, allowNull: false},
    kafka_topic: {type: DataTypes.STRING, allowNull: true},
    
    FechaSequalize: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "FechaSequalize",
    },
    GeneratedDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "GeneratedDate",
    },
    CreatedDate: {
      type: DataTypes.DATE,
      allowNull: true,
      // defaultValue: Date.now(),
      field: "CreatedDate",
    },
    Unit: {type: DataTypes.STRING, allowNull: true},
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    tableName: "Products",
  }
);

export {PersonsSchema, ProductsSchema};
