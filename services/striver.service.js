import * as dbService from './db.service.js';

const client = dbService.getConnection();
const DB_NAME = 'striver';
const COLLECTION_NAME = 'strivers';

const getStriverById = async (striverId) => {
  await client.connect();
  const db = client.db(DB_NAME);
  return await dbService.getRecordsByProperty(db, COLLECTION_NAME, '_id', striverId);
};

const getOrCreate = async (striverId, striverName) => {
  await client.connect();
  const db = client.db(DB_NAME);
  let striver = await dbService.getRecord(db, COLLECTION_NAME, striverId);

  if (!striver) {
    striver = {
      _id: striverId,
      circles: [],
      displayName: striverName,
    };

    await dbService.insertRecord(db, COLLECTION_NAME, striver);
  }
  return striver;
};

const updateStriver = async (striver) => {
  await client.connect();
  const db = client.db(DB_NAME);
  await dbService.updateRecordByProperty(db, COLLECTION_NAME, '_id', striver._id, striver);
};

const addCircle = async (striverId, circle) => {
  const striver = await getStriverById(striverId);
  if (!striver.circles.some((c) => c._id.toString() === circle._id)) {
    striver.circles.push({
      _id: circle._id,
      name: circle.name,
      description: circle.description,
      owner: circle.isOwner,
    });
    await updateStriver(striver);
  }
};

const removeCircle = async (striverId, circleId) => {
  const striver = await getStriverById(striverId);
  striver.circles = striver.circles.filter((c) => c._id.toString() !== circleId);
  await updateStriver(striver);
};

export {
  getStriverById,
  getOrCreate,

  addCircle,
  removeCircle,
};
