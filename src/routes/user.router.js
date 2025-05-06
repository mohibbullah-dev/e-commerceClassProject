import e from 'express';
import signup from '../controllers/user.controller.js';
import ValidationMiddleware from '../middlewares/validation.middleware.js';
import { userSignupSchema } from '../validators/user.validator.js';

const router = e.Router();
router.post('/users/signup', ValidationMiddleware(userSignupSchema), signup);

export default router;
