import e from 'express';
import auth from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/fileUpload.middleware.js';
import ValidationMiddleware from '../middlewares/validation.middleware.js';
import {
  createSubcategory,
  deleteSubcategory,
  getSubcategories,
  getSubcategory,
  updatesubcategory,
} from '../controllers/subcategory.controller.js';
import { createSubcategorySchema } from '../validators/subcategory.validator.js';

const router = e.Router();

router
  .route('/subcategories')
  .get(auth, getSubcategories)
  .post(
    auth,
    upload.single('image'),
    ValidationMiddleware(createSubcategorySchema),
    createSubcategory,
  );

router
  .get('/subcategory/:slug', auth, getSubcategory)
  .put(
    '/subcategory/:slugParam',
    auth,
    upload.single('image'),
    ValidationMiddleware(createSubcategorySchema),
    updatesubcategory,
  );

router.delete('/subcategory/:slugParam', auth, deleteSubcategory);

export default router;
