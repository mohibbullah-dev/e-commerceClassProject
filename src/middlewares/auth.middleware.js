// import { ACCESS_TOKEN_SECRET } from '../constant.js';
// import { User } from '../models/user.model.js';
// import ApiError from '../utils/apiError.js';
// import asyncHandler from '../utils/asyncHandler.js';
// import jwt from 'jsonwebtoken';

// const auth = asyncHandler(async (req, res, next) => {
//   const token = req.cookies?.accessToken;
//   // req.header('Authorization')?.replace('Bearer', '');

//   if (!token)
//     throw ApiError.unauthorized('you are not logedIn').replace('Bearer', '');

//   let decodedToken;
//   try {
//     decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET);
//   } catch (error) {
//     throw ApiError.unauthorized('invalid or expire access token.');
//   }
//   if (!decodedToken?.id)
//     throw ApiError.unauthorized('token does not container valid user info.');
//   const user = await User.findById(decodedToken.id).select(
//     '-__v -password -passwordResetToken -passwordResetExpires -createdAt -updatedAt',
//   );
//   if (!user) throw ApiError.unauthorized('user no longer exists.');
//   req.user = user;
//   next();
// });

// export default auth;

import { ACCESS_TOKEN_SECRET } from '../constant.js';
import { User } from '../models/user.model.js';
import ApiError from '../utils/apiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import jwt from 'jsonwebtoken';

const auth = asyncHandler(async (req, res, next) => {
  // Get token from cookies or Authorization header
  let token = req.cookies?.accessToken;

  // Optional: Fallback to Authorization header if cookies not found
  if (!token && req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.replace('Bearer ', '').trim();
  }

  if (!token) {
    throw ApiError.unauthorized('You are not logged in.');
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET);
  } catch (error) {
    throw ApiError.unauthorized('Invalid or expired access token.');
  }

  if (!decodedToken?.id) {
    throw ApiError.unauthorized('Token does not contain valid user info.');
  }

  const user = await User.findById(decodedToken.id).select(
    '-__v -password -passwordResetToken -passwordResetExpires -createdAt -updatedAt',
  );

  if (!user) {
    throw ApiError.unauthorized('User no longer exists.');
  }

  req.user = user;
  next();
});

export default auth;
