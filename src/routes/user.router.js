import e from 'express';
import { signin, signup, VerifyEmail } from '../controllers/user.controller.js';
import ValidationMiddleware from '../middlewares/validation.middleware.js';
import {
  userSigninSchema,
  userSignupSchema,
} from '../validators/user.validator.js';

const router = e.Router();
router.post('/users/signup', ValidationMiddleware(userSignupSchema), signup);
router.get('/users/verify', VerifyEmail);
router.post('/users/signin', ValidationMiddleware(userSigninSchema), signin);

export default router;
