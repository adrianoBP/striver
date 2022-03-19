import { Router } from 'express';
import * as circleService from '../services/circle.service.js';

const router = new Router();

const getCircle = (req, res) => {
  const { circleId } = req.params;
  res.json(circleService.getCircleById(circleId)).send();
};

const addCircle = (req, res) => {
  const { name, description } = req.body;
  circleService.addCircle(name, description);
  res.status(200).send();
};

const editCircle = (req, res) => {
  const circle = req.body;
  circleService.editCircle(circle.id, circle);
  res.status(200).send();
};

const deleteCircle = (req, res) => {
  const { circleId } = req.params;
  circleService.deleteCircle(circleId);
  res.status(200).send();
};

router.get('/:circleId', getCircle);
router.post('/add', addCircle);
router.put('/edit', editCircle);
router.delete('/:circleId/delete', deleteCircle);

export default router;
