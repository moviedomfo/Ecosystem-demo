import {AppConstants} from "@common/commonConstants";
import { LogFunctions } from "@common/helpers";
import {ExeptionFunctions} from "@common/helpers/ExeptionFunctions";
import {connect} from "mongoose";
import "./../db/mongo-db";
/**
this code will execute only once */
(async () => {
  // const uri =
  //   "mongodb+srv://pelsoft:lince21++@cluster0.aa2koji.mongodb.net/ecosystem?retryWrites=true&w=majority";
  const uri = `mongodb+srv://${AppConstants.BD_USER}:${AppConstants.BD_PWD}@cluster0.aa2koji.mongodb.net/?retryWrites=true&w=majority`;
  try {
    const db = await connect(uri, {});

    console.log("Mongo database is connected to: " + db.connection.name);
  } catch (err) {
    const appError = ExeptionFunctions.Parse_MongoError(err);
    //console.log(JSON.stringify(appError));
    LogFunctions.LogError(appError.message);
    process.exit(0);
  }
})();
