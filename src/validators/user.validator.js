import { z } from 'zod';
const userSignupSchema = z.object({
  username: z.string().min(3),
  name: z.string().min(5),
  email: z.string().email(),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
      'Password must contain at least one lowercase letter, one upercase letter, one number and be at least 8 characters longer',
    ),
});

const userSigninSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const userUpdateSchema = z.object({
  username: z.string().min(3),
  name: z.string().min(5),
  email: z.string().email(),
});

const userPasswordUpadateSchema = z.object({
  oldPassword: z.string(),
  newPassword: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
      'Password must contain at least one lowercase letter, one upercase letter, one number and be at least 8 characters longer',
    ),
});

const userForgotPasswordSchema = z.object({
  email: z.string().email(),
});

const userForgotPasswordOtpSchema = z.object({
  otp: z.number(),
});
const userRestpasswordSchema = z.object({
  otp: z.number(),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
      'Password must contain at least one lowercase letter, one upercase letter, one number and be at least 8 characters longer',
    ),
});

const avatarUploadSchema = z.object({
  avatar: z.any(),
});

export {
  userSignupSchema,
  userSigninSchema,
  userUpdateSchema,
  userPasswordUpadateSchema,
  userForgotPasswordSchema,
  userForgotPasswordOtpSchema,
  userRestpasswordSchema,
  avatarUploadSchema,
};
