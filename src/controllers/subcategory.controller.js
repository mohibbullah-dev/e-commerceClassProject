import { Subcategory } from '../models/subcategory.model.js';
import ApiSuccess from '../utils/apiSuccess.js';
import asyncHandler from '../utils/asyncHandler.js';

const subCategories = asyncHandler(async (req, res) => {
  const subcategories = await Subcategory.find();

  if (subcategories.length === 0) {
    res.status(200).json(ApiSuccess.ok('subcategory not found', subcategories));
  }
  res.status(200).json(ApiSuccess.ok('subcategory fitshed', subcategories));
});

export { subCategories };
