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

export { userSignupSchema, userSigninSchema };
