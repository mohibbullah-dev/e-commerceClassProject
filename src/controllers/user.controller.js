import { User } from '../models/user.model.js';
import asyncHandler from '../utils/asyncHandler.js';

const signup = asyncHandler(async (req, res) => {
  const user = await User.create(req.body);
  res.send({ user });
});

export default signup;
