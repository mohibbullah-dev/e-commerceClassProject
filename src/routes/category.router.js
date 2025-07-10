import e from 'express';
import auth from '../middlewares/auth.middleware.js';
import {
  createCategory,
  getCategories,
} from '../controllers/category.controller.js';
import { upload } from '../middlewares/fileUpload.middleware.js';
import ValidationMiddleware from '../middlewares/validation.middleware.js';
import {
  categoryImageSchema,
  createCategorySchema,
} from '../validators/category.validator.js';
const router = e.Router();

router
  .route('/categories')
  .get(auth, getCategories)
  .post(
    auth,
    upload.single('image'),
    ValidationMiddleware(createCategorySchema),
    createCategory,
  );

export default router;
