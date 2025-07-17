// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';

// // ✅ ES Module এর জন্য __dirname তৈরি
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // ✅ এখন public/images এর path ধরাই
// const mainDirPath = path.resolve(__dirname, '../../public/images');

// // ✅ ফোল্ডার আছে কি না দেখে নেই
// if (!fs.existsSync(mainDirPath)) {
//   console.log('❌ Image folder not found at:', mainDirPath);
//   process.exit(1);
// }

// // ✅ ফোল্ডারের ভিতরের সব ফাইল লিস্ট করি
// const getImagePath = (dir) => {
//   const files = fs.readdirSync(dir);
//   files.map((file) => {
//     console.log('🖼️', file);
//   });
// };

// getImagePath(mainDirPath);

import { fileUpload } from '../utils/fileUpload.js';
import fs from 'fs';
import path from 'path';

const mainDirPath = path.resolve('./public/images');

const getImagePath = (dir) => {
  const files = fs.readdirSync(dir);
  return files.map((file) => {
    const fullPath = path.join(dir, file);
    return fullPath;
  });
};
console.log(getImagePath(mainDirPath));

const resolve = async () => {
  const data = await Promise.all(
    getImagePath(mainDirPath).map(async (path) => {
      return await fileUpload(path, {
        folder: 'seedinFiles',
        use_filenames: true,
        overwrite: true,
        resource_type: 'image',
      });
    }),
  );
  return data;
};

export default resolve;
