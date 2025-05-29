import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/Sequelize-sql-db';
import { ProductsSchema } from './sql.schemas';


/* ======= Orders ======= */
class OrdersSchema extends Model { }

OrdersSchema.init(
    {
        OrderId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            field: 'OrderId',

        },
        ExternalOrderId: {
            type: DataTypes.UUID,
            allowNull: true,
            defaultValue: DataTypes.UUIDV4, // si querés que Sequelize lo genere solo
            field: 'ExternalOrderId',
        },
        PersonId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Persons',
                key: 'Id',
            },
            field: 'PersonId',

        },
        CreatedDate: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: 'CreatedDate',

        },
        Department: {
            type: DataTypes.STRING(50),
            allowNull: false,
            field: 'Department',

        },
        Status: {
            type: DataTypes.STRING(10),
            allowNull: true,
            field: 'Status',

        },

    },
    {
        sequelize,
        timestamps: false,
        // underscored: true,
        tableName: 'Orders',
    }
);

/* ======= OrderDetails ======= */
class OrderDetailsSchema extends Model { }

OrderDetailsSchema.init(
    {
        OrderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Orders',
                key: 'OrderId',
            },
            onDelete: 'CASCADE',
        },


        ProductId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Products',
                key: 'Id',
            },
            field: 'ProductId',

        },
        Quantity: {
            type: DataTypes.DECIMAL(18, 0),
            allowNull: false,
            field: 'Quantity',
        },
        Unit: {
            type: DataTypes.STRING(10),
            allowNull: true,
            field: 'Unit',
        },
    },
    {
        sequelize,
        timestamps: false,
        // underscored: true,
        tableName: 'OrderDetails',
    }
);

/* ======= Associations ======= */
OrdersSchema.hasMany(OrderDetailsSchema, {
    foreignKey: 'OrderId',
    as: 'Details',
});
OrderDetailsSchema.belongsTo(OrdersSchema, {
    foreignKey: 'OrderId',
    as: 'Order',
});


OrderDetailsSchema.belongsTo(ProductsSchema, {
    foreignKey: 'ProductId',
    as: 'Product',
});
export { OrderDetailsSchema, OrdersSchema };
