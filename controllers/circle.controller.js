import { Router } from 'express';
import * as circleService from '../services/circle.service.js';

const router = new Router();

const getCircle = async (req, res) => {
  const { circleId } = req.params;
  res.json(await circleService.getCircleById(circleId)).send();
};

const addCircle = async (req, res) => {
  const { name, description } = req.body;
  const insertedCircleId = await circleService.addCircle(name, description);
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

const addStriversToCircle = async (req, res) => {
  const { circleId } = req.params;
  const striversId = req.body;
  await circleService.addStriversToCircle(circleId, striversId);
  res.status(200).send();
};

const setStriversToCircle = async (req, res) => {
  const { circleId } = req.params;
  const striversId = req.body;
  await circleService.setStriversToCircle(circleId, striversId);
  res.status(200).send();
};

router.get('/:circleId', getCircle);
router.post('/add', addCircle);
router.put('/edit', editCircle);
router.delete('/:circleId', deleteCircle);
router.post('/:circleId/strivers/add-many', addStriversToCircle);
router.put('/:circleId/strivers/set', setStriversToCircle);

export default router;
