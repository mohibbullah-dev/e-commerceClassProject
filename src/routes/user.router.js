import e from 'express';
import {
  signin,
  signOut,
  signup,
  UpdateUser,
  userPasswordUpadate,
  VerifyEmail,
} from '../controllers/user.controller.js';
import ValidationMiddleware from '../middlewares/validation.middleware.js';
import {
  userPasswordUpadateSchema,
  userSigninSchema,
  userSignupSchema,
  userUpdateSchema,
} from '../validators/user.validator.js';
import auth from '../middlewares/auth.middleware.js';

const router = e.Router();
router.post('/users/signup', ValidationMiddleware(userSignupSchema), signup);
router.get('/users/verify', VerifyEmail);
router.post('/users/signin', ValidationMiddleware(userSigninSchema), signin);
router.get('/users/signout', auth, signOut);
router.post(
  '/users/user-update',
  auth,
  ValidationMiddleware(userUpdateSchema),
  UpdateUser,
);
router.post(
  '/users/password-update',
  auth,
  ValidationMiddleware(userPasswordUpadateSchema),
  userPasswordUpadate,
);

export default router;
