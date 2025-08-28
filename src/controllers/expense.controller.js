import { Expens } from '../models/expense.model.js';
import ApiError from '../utils/apiError.js';
import ApiSuccess from '../utils/apiSuccess.js';
import asyncHandler from '../utils/asyncHandler.js';

const createMyexpense = asyncHandler(async (req, res) => {
  const expense = await Expens.create({
    ...req.body,
    paidBy: req.user._id,
    createdBy: req.user._id,
  });
  return res.status(200).json(ApiSuccess.ok('expense created', expense));
});

const updateMyexpense = asyncHandler(async (req, res) => {
  const { expenseId } = req.params;
  const existsExpens = await Expens.findById(expenseId);
  if (!existsExpens) throw ApiError.notFound('expens is not found');

  const expens = await Expens.findByIdAndUpdate(
    { _id: expenseId, createdBy: req.user._id },
    { $set: { ...req.body } },
    { new: true },
  );
  return res.status(200).json(ApiSuccess.ok('expens update', expens));
});

const deleteMyexpens = asyncHandler(async (req, res) => {
  const { expenseId } = req.params;
  const expens = await Expens.findOneAndDelete({
    _id: expenseId,
    createdBy: req.user._id,
  });
  if (!expens) throw ApiError.notFound('expens not found');
  return res.status(200).json(ApiSuccess.ok('expens deleted', expens));
});

const getAllexpense = asyncHandler(async (req, res) => {
  const expenses = await Expens.find({ createdBy: req.user._id });
  if (expenses.length == 0) throw ApiError.notFound('expenses not found');
  return res.status(200).json(ApiSuccess.ok('expenses fitched', expenses));
});

const getAllExpensesPaidByme = asyncHandler(async (req, res) => {
  const expenses = await Expens.find({
    createdBy: req.user._id,
    paidBy: req.user._id,
  });
  if (expenses.length == 0) throw ApiError.notFound('expenses not found');
  return res
    .status(200)
    .json(ApiSuccess.ok('all expenses fitched paid By me', expenses));
});

const oneToOneExpens = asyncHandler(async (req, res) => {
  const data = await Expens.create({
    ...req.body,
    createdBy: req.user._id,
  });

  return res.status(201).json({ message: 'oneToOneExpens created', data });
});

export {
  createMyexpense,
  updateMyexpense,
  deleteMyexpens,
  getAllexpense,
  getAllExpensesPaidByme,
  oneToOneExpens,
};
