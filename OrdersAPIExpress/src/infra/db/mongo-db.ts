import {AppConstants} from "@common/commonConstants";
import {connect} from "mongoose";
import "./../db/mongo-db";
/**
this code will execute only once */
(async () => {
  const uri =
    "mongodb+srv://pelsoft:lince21++@cluster0.aa2koji.mongodb.net/ecosystem?retryWrites=true&w=majority";
  const uri_ = `mongodb+srv://${AppConstants.BD_USER}:${AppConstants.BD_PWD}@cluster0.aa2koji.mongodb.net/?retryWrites=true&w=majority`;

  const db = await connect(uri, {});
  console.log("Database is connected to: " + db.connection.name);
})();
