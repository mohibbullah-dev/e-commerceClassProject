import { Category } from '../models/category.model.js';
import ApiError from '../utils/apiError.js';
import ApiSuccess from '../utils/apiSuccess.js';
import asyncHandler from '../utils/asyncHandler.js';
import { fileUpload } from '../utils/fileUpload.js';
import { categoryImageSchema } from '../validators/category.validator.js';
import { Subcategory } from '../models/subcategory.model.js';

const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({
    $or: [{ createdBy: req.user._id }, { createdBy: null }],
  });
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
    createdBy: req.user._id,
  });
  return res.status(201).json(ApiSuccess.ok('category created', category));
});

const getCategory = asyncHandler(async (req, res) => {
  const { slugParam } = req.params;
  const category = await Category.find({ slug: slugParam });
  const subcategory = await Subcategory.find({ category: category._id });

  if (!category) throw ApiError.badrequest('category not found');
  return res
    .status(200)
    .json(ApiSuccess.ok('Category fitched', { category, subcategory }));
});

const updateCategory = asyncHandler(async (req, res) => {
  let { slugParam } = req.params;
  let { slug, name } = req.body;
  let category = await Category.findOne({
    $and: [{ slug: slugParam }, { createdBy: req.user._id }],
  });
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
  // const { image } = req.file;
  const image = req.file;
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
  const category = await Category.findOneAndDelete({
    $and: [{ slug: slugParam }, { createdBy: req.user._id }],
  });
  if (!category) throw ApiError.notFound('Category not found');
  await Subcategory.deleteMany({ category: category._id });
  res.status(200).json(ApiSuccess.noContent('Category deleted'));
});

export {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
