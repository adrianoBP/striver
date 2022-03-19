import * as dbService from './db.service.js';

const client = dbService.getConnection();
const DB_NAME = 'striver';
const COLLECTION_NAME = 'circles';

const getCircleById = async (circleId) => {
  await client.connect();
  const db = client.db(DB_NAME);
  const circle = await dbService.getRecord(db, COLLECTION_NAME, circleId);
  return circle;
};

const addCircle = async (name, description) => {
  await client.connect();
  const db = client.db(DB_NAME);
  return dbService.insertRecord(db, COLLECTION_NAME, {
    name,
    description,
    striversId: [],
  });
};

const editCircle = async (circleId, circle) => {
  await client.connect();
  const db = client.db(DB_NAME);

  const oldCircle = await getCircleById(circleId);
  const newCircle = { ...oldCircle, ...circle };

  await dbService.updateRecord(db, COLLECTION_NAME, circleId, newCircle);
};

const deleteCircle = async (circleId) => {
  await client.connect();
  const db = client.db(DB_NAME);
  await dbService.deleteRecord(db, COLLECTION_NAME, circleId);
};

const addStriversToCircle = async (circleId, striversId) => {
  await client.connect();
  const db = client.db(DB_NAME);
  const circle = await getCircleById(circleId);
  const newCircle = { ...circle, striversId };
  await dbService.updateRecord(db, COLLECTION_NAME, circleId, newCircle);
};

const setStriversToCircle = async (circleId, striversId) => {
  await client.connect();
  const db = client.db(DB_NAME);
  const circle = await getCircleById(circleId);
  circle.striversId = striversId;
  await dbService.updateRecord(db, COLLECTION_NAME, circleId, circle);
};

export {
  getCircleById,
  addCircle,
  editCircle,
  deleteCircle,

  addStriversToCircle,
  setStriversToCircle,
};
