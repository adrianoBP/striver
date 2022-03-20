import { Router } from 'express';
import * as grindService from '../services/grind.service.js';

const router = new Router();

// GRIND

const getAllUserGrinds = async (req, res) => {
  const striverId = req.headers['striver-id'];
  const grinds = await grindService.getAllGrinds(striverId);
  res.send(grinds);
};

const getGrind = async (req, res) => {
  const { grindId } = req.params;
  const grind = await grindService.getGrindById(grindId);

  const milestonesCount = grind.milestones.length;
  const activitiesCount = grind.milestones.reduce((acc, milestone) => acc + milestone.activities.length, 0);
  const completedActivitiesCount = grind.milestones.reduce((acc, milestone) => acc + milestone.activities.filter(activity => activity.completed).length, 0);

  const percentage = Math.round((completedActivitiesCount / activitiesCount) * 100);

  // Remove milestones to keep HTTP requests as light as possible
  grind.milestones = [];
  res.json({ ...grind, milestonesCount, completion: percentage }).send();
};

const addGrind = async (req, res) => {
  const striverId = req.headers['striver-id'];
  const { name, description } = req.body;
  const insertedGrindId = await grindService.addGrind(striverId, name, description);
  res.json(insertedGrindId).send();
};

const editGrind = async (req, res) => {
  const grind = req.body;
  await grindService.editGrind(grind._id, grind);
  res.status(200).send();
};

const deleteGrind = async (req, res) => {
  const { grindId } = req.params;
  await grindService.deleteGrind(grindId);
  res.status(200).send();
};

// MILESTONES

const getMilestone = async (req, res) => {
  const { grindId, milestoneId } = req.params;
  const milestone = await grindService.getMilestone(grindId, milestoneId);
  // Remove milestones to keep HTTP requests as light as possible
  milestone.activities = [];
  res.json(milestone).send();
};

const addMilestone = async (req, res) => {
  const { grindId } = req.params;
  const { name, description, dueDate } = req.body;
  const insertedMilestone = await grindService.addMilestone(grindId, name, description, dueDate);
  res.json(insertedMilestone).send();
};

const editMilestone = (req, res) => {
  const { grindId } = req.params;
  const milestone = req.body;
  grindService.editMilestone(grindId, milestone._id, milestone);
  res.status(200).send();
};

const deleteMilestone = (req, res) => {
  const { grindId, milestoneId } = req.params;
  grindService.deleteMilestone(grindId, milestoneId);
  res.status(200).send();
};

// ACTIVITIES

const getActivities = async (req, res) => {
  const { grindId, milestoneId, activityId } = req.params;
  res.json(await grindService.getActivities(grindId, milestoneId, activityId)).send();
};

const addActivity = async (req, res) => {
  const { grindId, milestoneId } = req.params;
  const { name, dueDate } = req.body;
  const insertedActivity = await grindService.addActivity(grindId, milestoneId, name, dueDate);
  res.json(insertedActivity).send();
};

const editActivity = (req, res) => {
  const { grindId, milestoneId } = req.params;
  const activity = req.body;
  grindService.editActivity(grindId, milestoneId, activity._id, activity);
  res.status(200).send();
};

const deleteActivity = (req, res) => {
  const { grindId, milestoneId, activityId } = req.params;
  grindService.deleteActivity(grindId, milestoneId, activityId);
  res.status(200).send();
};

// GRIND
router.get('/', getAllUserGrinds);
router.get('/:grindId', getGrind);
router.post('/add', addGrind);
router.put('/edit', editGrind);
router.delete('/:grindId', deleteGrind);

// MILESTONES
router.get('/:grindId/milestones/:milestoneId', getMilestone);
router.post('/:grindId/milestones/add', addMilestone);
router.put('/:grindId/milestones/edit', editMilestone);
router.delete('/:grindId/milestones/:milestoneId', deleteMilestone);

// ACTIVITIES
router.get('/:grindId/milestones/:milestoneId/activities/', getActivities);
router.post('/:grindId/milestones/:milestoneId/activities/add', addActivity);
router.put('/:grindId/milestones/:milestoneId/activities/edit', editActivity);
router.delete('/:grindId/milestones/:milestoneId/activities/:activityId', deleteActivity);

export default router;
