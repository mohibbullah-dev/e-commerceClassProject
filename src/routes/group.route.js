import e from 'express';
import auth from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/fileUpload.middleware.js';
import ValidationMiddleware from '../middlewares/validation.middleware.js';
import {
  addGroupmemberSchema,
  createGroupSchema,
} from '../validators/group.validator.js';
import {
  addMembers,
  creatGroup,
  grouptUpdate,
} from '../controllers/gorup.controller.js';

const router = e.Router();

router
  .route('/groups')
  .post(
    auth,
    upload.single('image'),
    ValidationMiddleware(createGroupSchema),
    creatGroup,
  );
router.route(
  '/groups/:groupId',
  auth,
  upload.single('image'),
  ValidationMiddleware(createGroupSchema),
  grouptUpdate,
);
router
  .route('/groups/update/:groupId')
  .post(
    auth,
    upload.single('image'),
    ValidationMiddleware(createGroupSchema),
    grouptUpdate,
  );

router
  .route('/groups/addMembers/:groupId')
  .post(auth, ValidationMiddleware(addGroupmemberSchema), addMembers);

export default router;
