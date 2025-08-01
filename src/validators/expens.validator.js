import { z } from 'zod';

const createIndividualExpensSchema = z.object({
  description: z.string().optional(),
  amount: z.number(),
  category: z.string(),
  subcategory: z.string(),
  date: z.string(),
});

export { createIndividualExpensSchema };
