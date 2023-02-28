import { Model, DataTypes } from 'sequelize';
import sequelize from './Sequelize-sql-db';

class OrdersSchema extends Model {}

// 2. Create a Schema corresponding to the document interface.
OrdersSchema.init(
  {
    OrderId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,

      field: 'OrderId',
    },
    PersonId: { type: DataTypes.INTEGER, primaryKey: false, field: 'PersonId' },
    Department: {
      type: DataTypes.STRING,
      primaryKey: false,
      field: 'Department',
    },
    Status: { type: DataTypes.STRING, primaryKey: false, field: 'Status' },

    CreatedDate: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'CreatedDate',
    },
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    tableName: 'Orders',
  }
);

class OrderDetailsSchema extends Model {}
OrderDetailsSchema.init(
  {
    OrderId: { type: DataTypes.INTEGER, primaryKey: true, field: 'OrderId' },
    ProductId: { type: DataTypes.INTEGER, allowNull: true, field: 'ProductId' },
    Quantity: { type: DataTypes.STRING, allowNull: false, field: 'Quantity' },

    Unit: { type: DataTypes.STRING, allowNull: true, field: 'Unit' },
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    tableName: 'OrderDetails',
  }
);

OrderDetailsSchema.belongsTo(OrdersSchema, {
  foreignKey: 'OrderId',
  as: 'OrderDetails',
});

export { OrdersSchema, OrderDetailsSchema };
