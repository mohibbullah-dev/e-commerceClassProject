import { Category } from '../models/category.model.js';
import ApiError from '../utils/apiError.js';
import ApiSuccess from '../utils/apiSuccess.js';
import asyncHandler from '../utils/asyncHandler.js';
import { fileUpload } from '../utils/fileUpload.js';
import { categoryImageSchema } from '../validators/category.validator.js';
import { Subcategory } from '../models/subcategory.model.js';

const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().populate('subcategories');
  if (categories.length === 0) {
    return res
      .status(200)
      .json(ApiSuccess.ok('categories not found.', categories));
  }
  return res.status(200).json(ApiSuccess.ok('Categories fetched', categories));
});

const createCategory = asyncHandler(async (req, res) => {
  const image = req.file;
  const categoryImageValidation = categoryImageSchema.parse(image);
  if (categoryImageValidation.error)
    throw ApiError.badrequest('image is required');
  let { name, slug } = req.body;
  const isNameExist = await Category.findOne({ name });
  if (isNameExist) throw ApiError.badrequest('name is already exist');
  const isSlugExsits = await Category.findOne({ slug });
  if (isSlugExsits) throw ApiError.badrequest('slug is already exist');
  if (!slug) {
    slug = name.toLowerCase().replaceAll(' ', '-');
  }
  const result = await fileUpload(image.path, {
    folder: 'categories',
    use_filenames: true,
    // unique_filename: true,
    overwrite: true,
    resource_type: 'image',
    // transformation: [
    //   { width: 300, height: 300, crop: 'fill', gravity: 'face' },
    //   { radius: 'max' },
    // ],
    public_id: name,
  });

  const category = await Category.create({
    name,
    slug,
    image: {
      url: result.secure_url,
      public_id: result.public_id,
    },
  });
  return res.status(201).json(ApiSuccess.ok('category created', category));
});

const getCategory = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const category = await Category.findOne({ slug }).populate('subcategories');
  if (!category) throw ApiError.badrequest('category not found');
  return res.status(200).json(ApiSuccess.ok('Category fitched', category));
});

const updateCategory = asyncHandler(async (req, res) => {
  const { slugParam } = req.params;
  const { slug, name } = req.body;
  const category = await Category.findOne({ slug: slugParam });
  if (!category) throw ApiError.notFound('Category not found');

  const isNameExist = await Category.findOne({
    _id: { $ne: category._id },
    name,
  });
  if (isNameExist) throw ApiError.badrequest('name is already exist');
  const isSlugExsits = await Category.findOne({
    _id: { $ne: category._id },
    slug,
  });
  if (isSlugExsits) throw ApiError.badrequest('slug is already exist');
  if (!slug) {
    slug = name.toLowerCase().replaceAll(' ', '-');
  }

  const { image } = req.file;
  let result;
  if (image) {
    result = await fileUpload(image.path, {
      folder: 'categories',
      use_filenames: true,
      overwrite: true,
      resource_type: 'image',
      public_id: name,
    });
    category.image = {
      url: result.secure_url,
      public_id: result.public_id,
    };
  }
  category.name = name;
  category.slug = slug;
  await category.save();
  res.status(200).json(ApiSuccess.ok('Category updated', category));
});

const deleteCategory = asyncHandler(async (req, res) => {
  const { slugParam } = req.params;
  const category = await Category.findOneAndDelete({ slug: slugParam });
  if (!category) throw ApiError.notFound('Category not found');
  res.status(200).json(ApiSuccess.ok('Category deleted'));
});

export {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
