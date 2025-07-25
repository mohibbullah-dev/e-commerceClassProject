import { Group } from '../models/group.model.js';
import ApiError from '../utils/apiError.js';
import ApiSuccess from '../utils/apiSuccess.js';
import asyncHandler from '../utils/asyncHandler.js';
import { fileUpload } from '../utils/fileUpload.js';

const creatGroup = asyncHandler(async (req, res) => {
  const groupExist = await Group.findOne({
    $and: [{ name: req.body.name }, { createdBy: req.user._id }],
  });
  if (groupExist) throw ApiError.badrequest('group is already existed');
  const groupLogo = req.file;
  if (groupLogo) {
    const result = await fileUpload(groupLogo.path, {
      folder: 'group',
      use_filename: true,
      resource_type: 'image',
      overwrite: true,
      pulic_id: req.body.name + Date.now(),
    });
    req.body.image = {
      url: result.secure_url,
      pulic_id: result.public_id,
    };

    const group = await Group.create({ ...req.body, createdBy: req.user._id });
    return res.status(201).json(ApiSuccess.ok('Group created', group));
  }
});

const grouptUpdate = asyncHandler(async (req, res) => {
  const { groupId } = req.params;
  const existedGroup = await Group.findById(groupId);
  if (!existedGroup) throw ApiError.notFound('group is not found');

  const groupLogo = req.file;
  if (groupLogo) {
    const result = await fileUpload(groupLogo.path, {
      folder: 'group',
      use_filename: true,
      resource_type: 'image',
      overwrite: true,
      pulic_id: req.body.name + Date.now(),
    });
    console.log(result);
    req.body.image = {
      url: result.secure_url,
      pulic_id: result.public_id,
    };
    const groupName = await Group.findOne({
      $and: [{ name: req.body.name }, { createdBy: req.user._id }],
    });
    if (groupName) throw ApiError.badrequest('groupName already exists');
    const group = await Group.findOneAndUpdate(
      { _id: groupId },
      { $set: { ...req.body } },
      { new: true },
    );
    return res.status(201).json(ApiSuccess.ok('Group Updated', group));
  }
});

const addMembers = asyncHandler(async (req, res) => {
  const { groupId } = req.params;
  if (!groupId) throw ApiError.badrequest('groupId is not found!');
  const existedGroup = await Group.findById(groupId);
  const userId = req.user._id;
  const { members } = req.body;
  if (!existedGroup) throw ApiError.notFound('group is not found');

  console.log('existedGroup: ', existedGroup.createdBy);
  console.log('userId: ', userId);

  if (userId.toString() !== existedGroup.createdBy.toString()) {
    throw ApiError.unauthorized(
      'You are not authorized to add member to this group',
    );
  }
  const newMembers = members.filter((member) => {
    return existedGroup.members.includes(member) === false;
  });
  if (newMembers.length === 0) throw ApiError.badrequest('no newMember to add');

  existedGroup.members = [...existedGroup.members, ...newMembers];
  await existedGroup.save();
  return res.status(201).json(ApiSuccess.created('new members are added'));
});

export { creatGroup, addMembers, grouptUpdate };
