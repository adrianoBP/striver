import * as dbService from './db.service.js';
import * as striverService from './striver.service.js';
import { ObjectId } from 'mongodb';

const client = dbService.getConnection();
const DB_NAME = 'striver';
const COLLECTION_NAME = 'grinds';

// GRIND

const getAllGrinds = async (striverId) => {
  await client.connect();
  const db = client.db(DB_NAME);
  return dbService.getRecordsByProperty(db, COLLECTION_NAME, 'striverId', striverId);
};

const getGrindById = async (grindId) => {
  await client.connect();
  const db = client.db(DB_NAME);
  const grind = await dbService.getRecord(db, COLLECTION_NAME, grindId);

  const milestonesCount = grind.milestones.length;
  const activitiesCount = grind.milestones.reduce((acc, milestone) => acc + milestone.activities.length, 0);
  const completedActivitiesCount = grind.milestones.reduce((acc, milestone) => acc + milestone.activities.filter(activity => activity.completed).length, 0);

  const percentage = Math.round((completedActivitiesCount / activitiesCount) * 100);

  return { ...grind, milestonesCount, completion: percentage || 0 };
};

const addGrind = async (striverId, name, description, dueDate) => {
  await client.connect();
  const db = client.db(DB_NAME);
  return dbService.insertRecord(db, COLLECTION_NAME, {
    striverId,
    circlesId: [],
    milestones: [],
    name,
    description,
    dueDate,
  });
};

const editGrind = async (grindId, grind) => {
  await client.connect();
  const db = client.db(DB_NAME);

  const oldGrind = await getGrindById(grindId);
  const newGrind = { ...oldGrind, ...grind };

  await dbService.updateRecord(db, COLLECTION_NAME, grindId, newGrind);
};

const deleteGrind = async (grindId) => {
  await client.connect();
  const db = client.db(DB_NAME);
  await dbService.deleteRecord(db, COLLECTION_NAME, grindId);
};

// MILESTONE

const getMilestone = async (grindId, milestoneId) => {
  const grind = await getGrindById(grindId);
  return grind.milestones.find((milestone) => milestone._id.toString() === milestoneId);
};

const addMilestone = async (grindId, name, description, dueDate) => {
  await client.connect();
  const db = client.db(DB_NAME);

  const grind = await getGrindById(grindId);

  const milestoneId = ObjectId();
  grind.milestones.push({
    _id: milestoneId,
    activities: [],
    name,
    description,
    dueDate,
  });

  await dbService.updateRecord(db, COLLECTION_NAME, grindId, grind);

  return milestoneId;
};

const editMilestone = async (grindId, milestoneId, milestone) => {
  await client.connect();
  const db = client.db(DB_NAME);

  const grind = await getGrindById(grindId);
  const oldMilestone = grind.milestones.find(
    (milestone) => milestone._id.toString() === milestoneId,
  );
  const newMilestone = { ...oldMilestone, ...milestone };

  const index = grind.milestones.findIndex(
    (milestone) => milestone._id.toString() === milestoneId,
  );

  grind.milestones[index] = newMilestone;

  await dbService.updateRecord(db, COLLECTION_NAME, grindId, grind);
};

const deleteMilestone = async (grindId, milestoneId) => {
  await client.connect();
  const db = client.db(DB_NAME);

  const grind = await getGrindById(grindId);
  grind.milestones = grind.milestones.filter(
    (milestone) => milestone._id.toString() !== milestoneId,
  );

  await dbService.updateRecord(db, COLLECTION_NAME, grindId, grind);
};

// ACTIVITY

const getActivities = async (grindId, milestoneId) => {
  const milestone = await getMilestone(grindId, milestoneId);
  return milestone.activities;
};

const addActivity = async (grindId, milestoneId, name, dueDate) => {
  await client.connect();
  const db = client.db(DB_NAME);

  const grind = await getGrindById(grindId);

  const activityId = ObjectId();

  grind.milestones
    .find((milestone) => milestone._id.toString() === milestoneId)
    .activities
    .push({
      _id: activityId,
      name,
      dueDate,
      completed: false,
    });

  await dbService.updateRecord(db, COLLECTION_NAME, grindId, grind);

  return activityId;
};

const editActivity = async (grindId, milestoneId, activityId, activity) => {
  await client.connect();
  const db = client.db(DB_NAME);

  const grind = await getGrindById(grindId);

  const milestone = grind.milestones.find(
    (milestone) => milestone._id.toString() === milestoneId,
  );

  const oldActivity = milestone.activities.find(
    (activity) => activity._id.toString() === activityId,
  );

  const newActivity = { ...oldActivity, ...activity };

  const index = milestone.activities.findIndex(
    (activity) => activity._id.toString() === activityId,
  );

  milestone.activities[index] = newActivity;

  await dbService.updateRecord(db, COLLECTION_NAME, grindId, grind);
};

const deleteActivity = async (grindId, milestoneId, activityId) => {
  await client.connect();
  const db = client.db(DB_NAME);

  const grind = await getGrindById(grindId);

  const milestone = grind.milestones.find(
    (milestone) => milestone._id.toString() === milestoneId,
  );

  milestone.activities = milestone.activities.filter(
    (activity) => activity._id.toString() !== activityId,
  );

  await dbService.updateRecord(db, COLLECTION_NAME, grindId, grind);
};

const getGrindsByCircleId = async (circleId) => {
  await client.connect();
  const db = client.db(DB_NAME);

  const grinds = await dbService.getRecordsByValueInProperty(db, COLLECTION_NAME, 'circlesId', circleId);

  for (const grind of grinds) {
    const milestonesCount = grind.milestones.length;
    const activitiesCount = grind.milestones.reduce((acc, milestone) => acc + milestone.activities.length, 0);
    const completedActivitiesCount = grind.milestones.reduce((acc, milestone) => acc + milestone.activities.filter(activity => activity.completed).length, 0);

    const percentage = Math.round((completedActivitiesCount / activitiesCount) * 100);

    const striver = await striverService.getStriverById(grind.striverId);
    grind.displayName = striver.displayName;

    grind.milestonesCount = milestonesCount;
    grind.completion = percentage || 0;
    // Remove milestones to keep HTTP requests as light as possible
    grind.milestones = [];
  }

  return grinds;
};

const addCircleToGrind = async (grindId, circleId) => {
  await client.connect();
  const db = client.db(DB_NAME);

  const grind = await getGrindById(grindId);

  if (!grind.circlesId.includes(circleId)) {
    grind.circlesId.push(circleId);
  }

  await dbService.updateRecord(db, COLLECTION_NAME, grindId, grind);
};

export {
  getAllGrinds,
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

  addCircleToGrind,
  getGrindsByCircleId,
};
