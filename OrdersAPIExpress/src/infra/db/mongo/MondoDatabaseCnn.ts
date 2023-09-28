import mongoose, { connect } from 'mongoose';

export interface MongoOptions {
  uri: string;
  dbName: string;
}

export class MongoDatabaseCnn {
  static async connect(options: MongoOptions) {
    const { dbName, uri } = options;
    try {
      // const db = await connect(uri, { dbName });
      const db = await connect(uri, { dbName });
      console.log('Mongodb database is connected to: ' + db.connection.name);
      return true;
    } catch (err) {
      console.log('Mongodb connection error: ' + err);
    }
  }
}
