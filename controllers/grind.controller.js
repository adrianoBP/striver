import { Router } from 'express';
import * as grindService from '../services/grind.service.js';

const router = new Router();

// GRIND

const getGrind = async (req, res) => {
  const { grindId } = req.params;
  const grind = await grindService.getGrindById(grindId);
  res.json(grind).send();
};

const addGrind = async (req, res) => {
  const { striverId, name, description } = req.body;
  const insertedGrindId = await grindService.addGrind(striverId, name, description);
  res.json(insertedGrindId).send();
};

const editGrind = (req, res) => {
  const grind = req.body;
  grindService.editGrind(grind._id, grind);
  res.status(200).send();
};

const deleteGrind = (req, res) => {
  const { grindId } = req.params;
  grindService.deleteGrind(grindId);
  res.status(200).send();
};

// MILESTONES

const getMilestone = (req, res) => {
  const { grindId, milestoneId } = req.params;
  res.json(grindService.getMilestone(grindId, milestoneId)).send();
};

const addMilestone = (req, res) => {
  const { grindId, name, description, dueDate } = req.body;
  grindService.addMilestone(grindId, name, description, dueDate);
  res.status(200).send();
};

const editMilestone = (req, res) => {
  const { grindId } = req.params;
  const milestone = req.body;
  grindService.editMilestone(grindId, milestone.id, milestone);
  res.status(200).send();
};

const deleteMilestone = (req, res) => {
  const { grindId, milestoneId } = req.params;
  grindService.deleteMilestone(grindId, milestoneId);
  res.status(200).send();
};

// ACTIVITIES

const getActivities = (req, res) => {
  const { grindId, milestoneId, activityId } = req.params;
  res.json(grindService.getActivities(grindId, milestoneId, activityId)).send();
};

const addActivity = (req, res) => {
  const { grindId, milestoneId, name, dueDate } = req.body;
  grindService.addActivity(grindId, milestoneId, name, dueDate);
  res.status(200).send();
};

const editActivity = (req, res) => {
  const { grindId, milestoneId } = req.params;
  const activity = req.body;
  grindService.editActivity(grindId, milestoneId, activity.id, activity);
  res.status(200).send();
};

const deleteActivity = (req, res) => {
  const { grindId, milestoneId, activityId } = req.params;
  grindService.deleteActivity(grindId, milestoneId, activityId);
  res.status(200).send();
};

// GRIND
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
