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
  getAllgroups,
  getMygroups,
  groupDelete,
  grouptUpdate,
  removeGroupmembers,
} from '../controllers/gorup.controller.js';

const router = e.Router();

router
  .route('/groups')
  .post(
    auth,
    upload.single('image'),
    ValidationMiddleware(createGroupSchema),
    creatGroup,
  )
  .get(auth, getAllgroups);
router.route('/groups/my-groups').get(auth, getMygroups);

router
  .route('/groups/update/:groupId')
  .post(
    auth,
    upload.single('image'),
    ValidationMiddleware(createGroupSchema),
    grouptUpdate,
  );

router.route('/groups/delete/:groupId').delete(auth, groupDelete);
router
  .route('/groups/addMembers/:groupId')
  .post(auth, ValidationMiddleware(addGroupmemberSchema), addMembers);
router
  .route('/groups/remove-group-member/:groupId')
  .delete(auth, ValidationMiddleware(addGroupmemberSchema), removeGroupmembers);

export default router;
