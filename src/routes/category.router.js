import e from 'express';
import auth from '../middlewares/auth.middleware.js';
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
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

router.get('/categories/:slugParam', auth, getCategory);
router.put(
  '/categories/:slugParam',
  auth,
  upload.single('image'),
  ValidationMiddleware(createCategorySchema),
  updateCategory,
);

router.delete('/categories/:slugParam', auth, deleteCategory);

export default router;
