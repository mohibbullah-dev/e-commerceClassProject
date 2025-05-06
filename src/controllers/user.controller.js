import { User } from '../models/user.model.js';
import ApiError from '../utils/apiError.js';
import ApiSuccess from '../utils/apiSuccess.js';
import asyncHandler from '../utils/asyncHandler.js';

const signup = asyncHandler(async (req, res) => {
  const { username, name, email, password } = req.body;
  const usernameExists = await User.findOne({ username });
  if (usernameExists) {
    throw ApiError.badrequest('username already exists!');
  }
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw ApiError.badrequest('email already exists');
  }

  const createdUser = await User.create({ username, name, email, password });
  const user = await User.findById(createdUser._id).select(
    '-password -passwordResetToken -passwordResetExpires -createdAt -updatedAt',
  );

  res.status(200).json(ApiSuccess.created('user created', user));
});

export default signup;
