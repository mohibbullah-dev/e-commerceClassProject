import { z } from 'zod';

const createIndividualExpensSchema = z.object({
  description: z.string().optional(),
  amount: z.number(),
  category: z.string(),
  subcategory: z.string(),
  date: z.string(),
});

// ono-to-one-Schema done
const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, 'invalid objectId');
const splitSchem = z.object({
  user: objectId,
  amount: z.number().min(0, 'Amount >= 0'),
  pain: z.boolean().optional().default(false),
});

const splitsSchem = z.array(splitSchem).min(1, 'at least one split required');

const createOne_To_One_Expen_Schema = z.object({
  description: z.string().optional(),
  amount: z.number(),
  category: z.string(),
  subcategory: z.string(),
  date: z.string(),
  splits: splitsSchem,
});

export { createIndividualExpensSchema, createOne_To_One_Expen_Schema };
