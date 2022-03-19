import { Router } from 'express';

// Controllers
import testingController from './testing.controller.js';

const router = new Router();

router.use('/testing', testingController);

export default router;
