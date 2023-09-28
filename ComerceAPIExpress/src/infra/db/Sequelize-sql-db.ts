import {AppConstants} from "../../common/CommonConstants";
import {Sequelize} from "sequelize";
const user = AppConstants.BD_USER;

const database = AppConstants.BD_DATABASE_NAME;
const password = AppConstants.BD_PWD;

const db = new Sequelize(database, user, password, {
  dialect: "mssql",
  host: AppConstants.BD_HOST,
  port: Number(AppConstants.DB_PORT),
  dialectOptions: {
    instanceName: AppConstants.BD_INSTANCE,
    encrypt: false,
    requestTimeout: 30000,
  },
});

export default db;
