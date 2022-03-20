import { Router } from 'express';

// Controllers
import testingController from './testing.controller.js';
import circleController from './circle.controller.js';
import grindController from './grind.controller.js';
import striverController from './striver.controller.js';

const router = new Router();

router.use('/testing', testingController);

router.use('/circles', circleController);
router.use('/grinds', grindController);
router.use('/strivers', striverController);

export default router;
