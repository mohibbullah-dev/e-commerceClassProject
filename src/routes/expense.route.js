import e from 'express';
import auth from '../middlewares/auth.middleware.js';
import {
  createMyexpense,
  deleteMyexpens,
  getAllexpense,
  getAllExpensesPaidByme,
  oneToOneExpens,
  updateMyexpense,
} from '../controllers/expense.controller.js';
import ValidationMiddleware from '../middlewares/validation.middleware.js';
import {
  createIndividualExpensSchema,
  createOne_To_One_Expen_Schema,
} from '../validators/expens.validator.js';
const router = e.Router();

router
  .route('/expenses/on-to-one-expen')
  .post(
    auth,
    ValidationMiddleware(createOne_To_One_Expen_Schema),
    oneToOneExpens,
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
