import { Router } from 'express';
import * as dbService from '../services/db.service.js';
import { v4 as uuidv4 } from 'uuid';

const router = new Router();

const test = (req, res) => {
  res.send('Hello world!');
};

const insertRecord = async (req, res) => {
  const dbClient = dbService.getConnection();
  await dbClient.connect();
  dbService.insertRecord(dbClient, 'test', { name: 'test', _id: uuidv4() });

  res.send('Inserted record');
};

const getRecords = async (req, res) => {
  const { recordId } = req.body;

  const dbClient = dbService.getConnection();
  await dbClient.connect();
  const records = await dbService.getRecord(dbClient, 'test', recordId);

  res.send(records);
};

router.get('/', test);
router.post('/insert', insertRecord);
router.post('/get', getRecords);

export default router;
