import { AppConstants } from "@common/commonConstants";
import { connect } from "mongoose";

(async () => {
  const uri = `mongodb+srv://${AppConstants.BD_USER}:${AppConstants.BD_PWD}@cluster0.aa2koji.mongodb.net/?retryWrites=true&w=majority`;
  const db = await connect(uri, {});
  console.log("Database is connected to: " + db.connection.name);
})();
