import e from 'express';
import auth from '../middlewares/auth.middleware.js';
import {
  createMyexpense,
  deleteMyexpens,
  getAllexpense,
  getAllExpensesPaidByme,
  updateMyexpense,
} from '../controllers/expense.controller.js';
import ValidationMiddleware from '../middlewares/validation.middleware.js';
import { createIndividualExpensSchema } from '../validators/expens.validator.js';
const router = e.Router();

router
  .route('/expenses/individual')
  .post(
    auth,
    ValidationMiddleware(createIndividualExpensSchema),
    createMyexpense,
  )
  .get(auth, getAllexpense);

router.route('/expenses/individual/paidByme').get(auth, getAllExpensesPaidByme);
router
  .route('/expenses/individual/update/:expenseId')
  .post(
    auth,
    ValidationMiddleware(createIndividualExpensSchema),
    updateMyexpense,
  );
router
  .route('/expenses/individual/delete/:expenseId')
  .delete(auth, deleteMyexpens);

export default router;
