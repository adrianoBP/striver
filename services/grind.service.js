import * as dbService from './db.service.js';

const client = dbService.getConnection();
const DB_NAME = 'striver';
const COLLECTION_NAME = 'grinds';
// GRIND

const getGrindById = async (grindId) => {
  await client.connect();
  const db = client.db(DB_NAME);
  return dbService.getRecord(db, COLLECTION_NAME, grindId);
};

const addGrind = async (striverId, name, description) => {
  await client.connect();
  const db = client.db(DB_NAME);
  return dbService.insertRecord(db, COLLECTION_NAME, {
    striverId,
    circlesId: [],
    milestones: [],
    name,
    description,
    dueDate: null,
  });
};

const editGrind = async (grindId, grind) => {
  await client.connect();
  const db = client.db(DB_NAME);
  await dbService.updateRecord(db, COLLECTION_NAME, grindId, grind);
};

const deleteGrind = async (grindId) => {
  await client.connect();
  const db = client.db(DB_NAME);
  await dbService.deleteRecord(db, COLLECTION_NAME, grindId);
};

// MILESTONE

const getMilestone = async (grindId, milestoneId) => {
  // TODO: Implement
  return {};
};

const addMilestone = async (grindId, name, description, dueDate) => {
  // TODO: Implement
};

const editMilestone = async (grindId, milestoneId, milestone) => {
  // TODO: Implement
};

const deleteMilestone = async (grindId, milestoneId) => {
  // TODO: Implement
};

// ACTIVITY

const getActivities = async (grindId, milestoneId, activityId) => {
  // TODO: Implement
  return [];
};

const addActivity = async (grindId, milestoneId, name, dueDate) => {
  // TODO: Implement
};

const editActivity = async (grindId, milestoneId, activityId, activity) => {
  // TODO: Implement
};

const deleteActivity = async (grindId, milestoneId, activityId) => {
  // TODO: Implement
};


export {
  getGrindById,
  addGrind,
  editGrind,
  deleteGrind,

  getMilestone,
  addMilestone,
  editMilestone,
  deleteMilestone,

  getActivities,
  addActivity,
  editActivity,
  deleteActivity,
};
