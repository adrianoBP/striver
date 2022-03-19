import { Router } from 'express';
import * as striverService from '../services/striver.service.js';

const router = new Router();

const getUserByGoogleId = (req, res) => {
  const { googleId } = req.body;

  res.json(striverService.getUserByGoogleId(googleId)).send();
};

router.get('/get-by-id', getUserByGoogleId);

export default router;
