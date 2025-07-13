import { Subcategory } from '../models/subcategory.model.js';
import ApiSuccess from '../utils/apiSuccess.js';
import ApiError from '../utils/apiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import { fileUpload } from '../utils/fileUpload.js';
import { subcategoryImageSchema } from '../validators/subcategory.validator.js';

const getSubcategories = asyncHandler(async (req, res) => {
  const subcategories = await Subcategory.find({
    $or: [{ createdBy: req.user._id }, { createdBy: null }],
  });
  if (subcategories.length === 0) {
    return res
      .status(200)
      .json(ApiSuccess.ok('subcategories not found.', subcategories));
  }
  return res
    .status(200)
    .json(ApiSuccess.ok('subCategories fetched', subcategories));
});

const createSubcategory = asyncHandler(async (req, res) => {
  const image = req.file;
  const subcategoryImageValidation = subcategoryImageSchema.parse(image);
  if (subcategoryImageValidation.error)
    throw ApiError.badrequest('image is required');
  let { category, name, slug } = req.body;

  const isNameExist = await Subcategory.findOne({ name });
  if (isNameExist) throw ApiError.badrequest('name is already exist');
  const isSlugExsits = await Subcategory.findOne({ slug });
  if (isSlugExsits) throw ApiError.badrequest('slug is already exist');
  if (!slug) {
    slug = name.toLowerCase().replaceAll(' ', '-');
  }

  const result = await fileUpload(image.path, {
    folder: 'subcategories',
    use_filenames: true,
    overwrite: true,
    resource_type: 'image',
    public_id: name,
  });

  const subcategory = await Subcategory.create({
    name,
    slug,
    image: {
      url: result.secure_url,
      public_id: result.public_id,
    },
    category,
    createdBy: req.user._id,
  });
  return res
    .status(201)
    .json(ApiSuccess.ok('Subcategory created', subcategory));
});

const getSubcategory = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const subcategory = await Subcategory.findOne({ slug });
  if (!subcategory) throw ApiError.badrequest('Subcategory not found');
  return res
    .status(200)
    .json(ApiSuccess.ok('Subcategory fitched', subcategory));
});

const updatesubcategory = asyncHandler(async (req, res) => {
  let { slugParam } = req.params;
  let { slug, name, category } = req.body;
  let subcategory = await Subcategory.findOne({
    $and: [{ slug: slugParam }, { createdBy: req.user._id }],
  });
  if (!subcategory) throw ApiError.notFound('Subcategory not found');

  const isNameExist = await Subcategory.findOne({
    _id: { $ne: subcategory._id },
    name,
  });
  if (isNameExist) throw ApiError.badrequest('name is already exist');
  const isSlugExsits = await Subcategory.findOne({
    _id: { $ne: category._id },
    slug,
  });
  if (isSlugExsits) throw ApiError.badrequest('slug is already exist');
  if (!slug) {
    slug = name.toLowerCase().replaceAll(' ', '-');
  }
  const image = req.file;
  let result;
  if (image) {
    result = await fileUpload(image.path, {
      folder: 'subcategories',
      use_filenames: true,
      overwrite: true,
      resource_type: 'image',
      public_id: name,
    });
    subcategory.image = {
      url: result.secure_url,
      public_id: result.public_id,
    };
  }
  subcategory.name = name;
  subcategory.slug = slug;
  subcategory.category = category;
  await subcategory.save();
  res.status(200).json(ApiSuccess.ok('Subcategory updated', subcategory));
});

const deleteSubcategory = asyncHandler(async (req, res) => {
  const { slugParam } = req.params;
  const subcategory = await Subcategory.findOneAndDelete({
    $and: [{ slug: slugParam }, { createdBy: req.user._id }],
  });
  if (!subcategory) throw ApiError.notFound('Subcategory not found');
  res.status(200).json(ApiSuccess.noContent('Subcategory deleted'));
});

export {
  getSubcategories,
  createSubcategory,
  getSubcategory,
  updatesubcategory,
  deleteSubcategory,
};
