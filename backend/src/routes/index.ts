import { Router } from 'express';
import statusesRouter from './statuses';
import transitionsRouter from './transitions';
import configRouter from './config';

const router = Router();

router.use('/statuses', statusesRouter);
router.use('/transitions', transitionsRouter);
router.use('/config', configRouter);

export default router;