import { Router } from 'express';
import * as circleService from '../services/circle.service.js';
import * as striverService from '../services/striver.service.js';

const router = new Router();

const getCircle = async (req, res) => {
  const { circleId } = req.params;
  res.json(await circleService.getCircleById(circleId)).send();
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
    isOwner: true,
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
  const { circleId, striverId } = req.params;
  await circleService.removeStriver(circleId, striverId);
  res.status(200).send();
};

router.get('/:circleId', getCircle);
router.post('/add', addCircle);
router.put('/edit', editCircle);
router.delete('/:circleId', deleteCircle);
router.post('/:circleId/strivers/add', addStriverToCircle);
router.delete('/:circleId/strivers/:striverId', removeStriver);

export default router;
