import { ACCESS_TOKEN_SECRET } from '../constant.js';
import { User } from '../models/user.model.js';
import ApiError from '../utils/apiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import jwt from 'jsonwebtoken';

const auth = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.accessToken;
  //  ||
  // req.header('Authorization')?.replace('Bearer', '');

  if (!token)
    throw ApiError.unauthorized('you are not logedIn').replace('Bearer', '');

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET);
  } catch (error) {
    throw ApiError.unauthorized('invalid or expire access token.');
  }
  if (!decodedToken?.id)
    throw ApiError.unauthorized('token does not container valid user info.');
  const user = await User.findById(decodedToken.id).select(
    '-__v -password -passwordResetToken -passwordResetExpires -createdAt -updatedAt',
  );
  if (!user) throw ApiError.unauthorized('user no longer exists.');
  req.user = user;
  next();
});

export default auth;
