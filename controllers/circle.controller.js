import { Router } from 'express';
import * as circleService from '../services/circle.service.js';
import * as grindService from '../services/grind.service.js';
import * as striverService from '../services/striver.service.js';

const router = new Router();

const getCircle = async (req, res) => {
  const { circleId } = req.params;
  const circle = await circleService.getCircleById(circleId);
  circle.striversName = [];
  for (const striverId of circle.striversId) {
    const striver = await striverService.getStriverById(striverId);
    circle.striversName.push(striver.displayName);
  }

  res.json(circle).send();
};

const addCircle = async (req, res) => {
  const striverId = req.headers['striver-id'];
  const { name, description } = req.body;
  const insertedCircleId = await circleService.addCircle(name, description, striverId);

  // Add circle to striver circles
  await striverService.addCircle(striverId, {
    _id: insertedCircleId,
    name,
    description,
    owner: striverId,
    imageSrc: 'https://picsum.photos/200',
  });

  res.json(insertedCircleId).send();
};

const editCircle = async (req, res) => {
  const circle = req.body;
  await circleService.editCircle(circle._id, circle);
  res.status(200).send();
};

const deleteCircle = async (req, res) => {
  const { circleId } = req.params;
  await circleService.deleteCircle(circleId);
  res.status(200).send();
};

const addStriverToCircle = async (req, res) => {
  const striverId = req.headers['striver-id'];
  const { circleId } = req.params;
  await circleService.addStriverToCircle(circleId, striverId);
  res.status(200).send();
};

const removeStriver = async (req, res) => {
  const striverId = req.headers['striver-id'];
  const { circleId } = req.params;
  await circleService.removeStriver(circleId, striverId);
  res.status(200).send();
};

const getGrindsByCircleId = async (req, res) => {
  const { circleId } = req.params;
  const grinds = await grindService.getGrindsByCircleId(circleId);
  res.json(grinds).send();
};

const addCircleToGrind = async (req, res) => {
  const { circleId } = req.params;
  const { grindId } = req.body;
  await grindService.addCircleToGrind(grindId, circleId);
  res.status(200).send();
};

router.get('/:circleId', getCircle);
router.post('/add', addCircle);
router.put('/edit', editCircle);
router.delete('/:circleId', deleteCircle);
router.post('/:circleId/strivers/add', addStriverToCircle);
router.delete('/:circleId/strivers/:striverId', removeStriver);

router.get('/:circleId/grinds', getGrindsByCircleId);
router.post('/:circleId/grinds/add', addCircleToGrind);
export default router;
