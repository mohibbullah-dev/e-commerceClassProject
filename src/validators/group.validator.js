import { z } from 'zod';
const createGroupSchema = z.object({
  name: z.string(),
  //   description: z.string(),
  //   image: z.any(),
});

const addGroupmemberSchema = z.object({
  members: z.array(z.string()).min(1),
});

export { createGroupSchema, addGroupmemberSchema };
