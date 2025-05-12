import { ACCESS_TOKEN_SECRET } from '../constant.js';
import { User } from '../models/user.model.js';
import ApiError from '../utils/apiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import jwt from 'jsonwebtoken';

const auth = asyncHandler(async (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token)
    throw ApiError.unauthorized('you are not logedIn').replace('Bearer', '');

  const decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET);
  if (!decodedToken) throw ApiError.unauthorized('you are not logedIn');
  const user = await User.findById(decodedToken.id);
  if (!user) throw ApiError.unauthorized('you are not logedIn');
  req.user = user;
  next();
});

export default auth;
