import mongoDB, { ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const getConnection = () => {
  const USER = process.env.MONGO_DB_USERNAME;
  const PASS = process.env.MONGO_DB_PASSWORD;
  const HOSTNAME = process.env.MONGO_DB_SERVER;
  const PORT = process.env.MONGO_DB_PORT;

  const uri = `mongodb://${USER}:${PASS}@${HOSTNAME}:${PORT}`;

  return new mongoDB.MongoClient(uri);
};

const insertRecord = async (db, collectionName, record) => {
  const collection = db.collection(collectionName);
  const result = await collection.insertOne(record);
  return result.insertedId;
};

const getRecord = async (db, collectionName, recordId) => {
  const collection = db.collection(collectionName);
  return await collection.findOne({ _id: ObjectId(recordId) });
};

const getRecordsByProperty = async (db, collectionName, property, value) => {
  const collection = db.collection(collectionName);
  return (await collection.find({ [property]: value })).toArray();
};

const getRecordsByValueInProperty = async (db, collectionName, property, value) => {
  // TODO: TEST
  const collection = db.collection(collectionName);
  return (await collection.find({ [property]: value })).toArray();
};

const updateRecord = (db, collectionName, recordId, record) => {
  record._id = ObjectId(record._id);
  const collection = db.collection(collectionName);
  return collection.updateOne({ _id: ObjectId(recordId) }, { $set: record });
};

const updateRecordByProperty = (db, collectionName, property, value, record) => {
  const collection = db.collection(collectionName);
  return collection.updateOne({ [property]: value }, { $set: record });
};

const deleteRecord = (db, collectionName, recordId) => {
  const collection = db.collection(collectionName);
  return collection.deleteOne({ _id: ObjectId(recordId) });
};


export {
  getConnection,

  insertRecord,
  getRecord,
  getRecordsByProperty,
  getRecordsByValueInProperty,
  updateRecord,
  updateRecordByProperty,
  deleteRecord,
};
