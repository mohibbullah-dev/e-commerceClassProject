import mongoose from 'mongoose';
import { Category } from '../models/category.model.js';
import { Subcategory } from '../models/subcategory.model.js';
import { MONGO_URL } from '../constant.js';
import seedUpload from './image.seed.js';

const categories = [
  {
    name: 'Food',
    slug: 'food',
  },
  {
    name: 'Transport',
    slug: 'transport',
  },
];

const subcategoriesByCategory = {
  food: [
    { name: 'Groceries', slug: 'groceries' },
    { name: 'Restaurants', slug: 'restaurant' },
  ],
  transport: [
    { name: 'Bus', slug: 'bus' },
    { name: 'Taxi', slug: 'taxi' },
  ],
};

async function seed() {
  await mongoose.connect(MONGO_URL);
  console.log('MongoDB connected ✅');

  await Category.deleteMany({});
  await Subcategory.deleteMany({});
  console.log('Existing data cleared ✅');

  const seedUploadedImages = await seedUpload();

  const categoryData = [];
  const subcategoryData = [];

  for (const category of categories) {
    const matchedCategoryImage = seedUploadedImages.find(
      (img) =>
        img.original_filename.toLowerCase() === category.slug.toLowerCase(),
    );

    if (!matchedCategoryImage) {
      console.warn(`⚠️ No image found for category: ${category.slug}`);
      continue;
    }

    categoryData.push({
      ...category,
      image: {
        url: matchedCategoryImage.url,
        public_id: matchedCategoryImage.public_id,
      },
    });
  }

  const insertedCategories = await Category.insertMany(categoryData);
  console.log('Categories inserted ✅');

  for (const category of insertedCategories) {
    const subcats = subcategoriesByCategory[category.slug] || [];

    for (const subcat of subcats) {
      const matchedSubcatImage = seedUploadedImages.find(
        (img) =>
          img.original_filename.toLowerCase() === subcat.slug.toLowerCase(),
      );

      if (!matchedSubcatImage) {
        console.warn(`⚠️ No image found for subcategory: ${subcat.slug}`);
        continue; // ✅ এই সাবক্যাটাগরিকে বাদ দিয়ে দাও
      }

      subcategoryData.push({
        ...subcat,
        image: {
          url: matchedSubcatImage.url,
          public_id: matchedSubcatImage.public_id,
        },
        category: category._id,
      });
    }
  }

  await Subcategory.insertMany(subcategoryData);
  console.log('Subcategories inserted ✅');

  await mongoose.disconnect();
  console.log('MongoDB disconnected 🚀');
}

export default seed;
