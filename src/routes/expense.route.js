import e from 'express';
import auth from '../middlewares/auth.middleware.js';
import { createMyexpense } from '../controllers/expense.controller.js';
import ValidationMiddleware from '../middlewares/validation.middleware.js';
import { createIndividualExpensSchema } from '../validators/expens.validator.js';
const router = e.Router();

router
  .route('/expenses/individual')
  .post(
    auth,
    ValidationMiddleware(createIndividualExpensSchema),
    createMyexpense,
  );

export default router;
