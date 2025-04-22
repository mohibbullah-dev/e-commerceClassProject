import e from 'express';
import { healthCheck } from '../controllers/healthCheck.controller.js';
const router = e.Router();
router.get('/hello', healthCheck);

export default router;
