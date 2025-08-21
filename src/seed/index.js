import seed from './categoriesAnadsubcategories.seed.js';
const seedCalling = async () => {
  seed().catch((err) => {
    console.error('Seeding error:', err);
    mongoose.disconnect();
  });
};

seedCalling();
