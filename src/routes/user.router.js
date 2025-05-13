import e from 'express';
import {
  signin,
  signOut,
  signup,
  UpdateUser,
  VerifyEmail,
} from '../controllers/user.controller.js';
import ValidationMiddleware from '../middlewares/validation.middleware.js';
import {
  userSigninSchema,
  userSignupSchema,
} from '../validators/user.validator.js';
import auth from '../middlewares/auth.middleware.js';

const router = e.Router();
router.post('/users/signup', ValidationMiddleware(userSignupSchema), signup);
router.get('/users/verify', VerifyEmail);
router.post('/users/signin', ValidationMiddleware(userSigninSchema), signin);
router.get('/users/signout', auth, signOut);
router.get('/users/user-update', auth, UpdateUser);

export default router;
