import mongoDB from 'mongodb';
import dotenv from 'dotenv';


dotenv.config();

const DB_NAME = process.env.DB_NAME;

const getConnection = () => {
  const USER = process.env.MONGO_DB_USERNAME;
  const PASS = process.env.MONGO_DB_PASSWORD;
  const HOSTNAME = process.env.MONGO_DB_SERVER;
  const PORT = process.env.MONGO_DB_PORT;

  const uri = `mongodb://${USER}:${PASS}@${HOSTNAME}:${PORT}`;

  return new mongoDB.MongoClient(uri);
};

const insertRecord = async (connection, collectionName, record) => {
  const db = await connection.db(DB_NAME);
  const collection = db.collection(collectionName);

  return await collection.insertOne(record);
};

const getRecord = async (connection, collectionName, recordId) => {
  const db = await connection.db(DB_NAME);
  const collection = db.collection(collectionName);

  return collection.findOne({ _id: recordId });
};


const deleteRecord = async (connection, collectionName, recordId) => {
  const db = await connection.db(DB_NAME);
  const collection = db.collection(collectionName);

  return collection.deleteOne({ _id: recordId });
};


export {
  getConnection,
  insertRecord,
  getRecord,
  deleteRecord,
};
