import e from 'express';
import signup from '../controllers/user.controller.js';

const router = e.Router();
router.post('/users/signup', signup);

export default router;
