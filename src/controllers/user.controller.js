import asyncHandler from '../utils/asyncHandler.js';

const signup = asyncHandler(async (req, res) => {
  res.send(req.body);
});

export default signup;
