import { Router } from 'express';
import * as striverService from '../services/striver.service.js';

const router = new Router();

const getOrCreateStriver = async (req, res) => {
  const striverId = req.headers['striver-id'];
  const { striverName } = req.body;

  res.json(await striverService.getOrCreate(striverId, striverName)).send();
};

router.post('/get-create', getOrCreateStriver);

export default router;
