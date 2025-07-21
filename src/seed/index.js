// import seedUpload from './image.seed.js';
import seedFuncCall from './categoriesAnadsubcategories.seed.js';
const seedCalling = async () => {
  // await seedUpload();

  seedFuncCall().catch((err) => {
    console.error('Seeding error:', err);
    mongoose.disconnect();
  });
};

seedCalling();
