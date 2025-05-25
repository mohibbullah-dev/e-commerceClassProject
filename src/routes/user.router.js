import e from 'express';
import {
  avatarUpload,
  forgotPassword,
  GoogleCallback,
  me,
  resetPassword,
  signin,
  signingWithGoogle,
  signOut,
  signup,
  UpdateUser,
  userPasswordUpadate,
  validateOtp,
  VerifyEmail,
} from '../controllers/user.controller.js';
import ValidationMiddleware from '../middlewares/validation.middleware.js';
import {
  userForgotPasswordOtpSchema,
  userForgotPasswordSchema,
  userPasswordUpadateSchema,
  userRestpasswordSchema,
  userSigninSchema,
  userSignupSchema,
  userUpdateSchema,
} from '../validators/user.validator.js';
import auth from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/fileUpload.middleware.js';

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
router.post(
  '/users/forgot-password',
  auth,
  ValidationMiddleware(userForgotPasswordSchema),
  forgotPassword,
);

router.post(
  '/users/verify-otp',
  auth,
  ValidationMiddleware(userForgotPasswordOtpSchema),
  validateOtp,
);

router.post(
  '/users/reset-password',
  auth,
  ValidationMiddleware(userRestpasswordSchema),
  resetPassword,
);
router.get('/users/google-signing', signingWithGoogle);
router.get('/users/google/callback', GoogleCallback);
router.post('/users/file-upload', auth, upload.single('avatar'), avatarUpload);
router.get('/users/me', auth, me);
export default router;
