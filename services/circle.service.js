import * as dbService from './db.service.js';
import * as striverService from './striver.service.js';
import { v4 as uuidv4 } from 'uuid';

const client = dbService.getConnection();
const DB_NAME = 'striver';
const COLLECTION_NAME = 'circles';

const getCircleById = async (circleId) => {
  await client.connect();
  const db = client.db(DB_NAME);
  const circle = await dbService.getRecord(db, COLLECTION_NAME, circleId);
  return { ...circle, imageSrc: 'https://picsum.photos/200' };
};

const addCircle = async (name, description, striverId) => {
  await client.connect();
  const db = client.db(DB_NAME);

  return dbService.insertRecord(db, COLLECTION_NAME, {
    name,
    description,
    striversId: [striverId],
    sharingCode: uuidv4(),
    owner: striverId,
  });
};

const editCircle = async (circleId, circle) => {
  await client.connect();
  const db = client.db(DB_NAME);

  const oldCircle = await getCircleById(circleId);
  const newCircle = { ...oldCircle, ...circle };

  // TODO: we also need to update the reference in all the strivers circles

  await dbService.updateRecord(db, COLLECTION_NAME, circleId, newCircle);
};

const deleteCircle = async (circleId) => {
  await client.connect();
  const db = client.db(DB_NAME);

  // Make sure to delete the circle id from the strivers circles
  (await getCircleById(circleId)).striversId.forEach(async striverId => {
    await striverService.removeCircle(striverId, circleId);
  });

  await dbService.deleteRecord(db, COLLECTION_NAME, circleId);
};

const addStriverToCircle = async (circleId, striverId) => {
  await client.connect();
  const db = client.db(DB_NAME);
  const circle = await getCircleById(circleId);
  circle.striversId.push(striverId);

  // Add circle to striver circles
  await striverService.addCircle(striverId, {
    _id: circle._id,
    name: circle.name,
    description: circle.description,
    owner: circle.owner,
  });

  await dbService.updateRecord(db, COLLECTION_NAME, circleId, circle);
};

const removeStriver = async (circleId, striverId) => {
  await client.connect();
  const db = client.db(DB_NAME);
  const circle = await getCircleById(circleId);
  circle.striversId = circle.striversId.filter((id) => id !== striverId);

  await striverService.removeCircle(striverId, circleId);

  await dbService.updateRecord(db, COLLECTION_NAME, circleId, circle);
};

export {
  getCircleById,
  addCircle,
  editCircle,
  deleteCircle,

  addStriverToCircle,
  removeStriver,
};
