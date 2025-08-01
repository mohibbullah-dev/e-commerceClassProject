import { Expens } from '../models/expense.model.js';
import ApiSuccess from '../utils/apiSuccess.js';
import asyncHandler from '../utils/asyncHandler.js';

const createMyexpense = asyncHandler(async (req, res) => {
  const expense = await Expens.create({ ...req.body, createdBy: req.user._id });
  return res.status(200).json(ApiSuccess.ok('expense created', expense));
});

export { createMyexpense };
