import { v2 as cloudinary } from 'cloudinary';
import asyncHandler from './asyncHandler.js';
import { existsSync, unlinkSync } from 'fs';
import ApiError from './apiError.js';
// Configuration
cloudinary.config({
  cloud_name: 'dwcbvfptd',
  api_key: '556964284784912',
  api_secret: 'fkHS6sFqLBV5rYz6bjd3oPjGWzQ', //Click'View API Keys' above to copy your API secret
});

// Upload an image

const fileUpload = async (file, options = {}) => {
  try {
    const data = await cloudinary.uploader.upload(file, { ...options });
    if (existsSync(file)) unlinkSync(file);
    return data;
  } catch (error) {
    if (existsSync(file)) unlinkSync(file);
  }
};

const deleteFile = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId, {
      invalidate: true,
    });
  } catch (error) {
    throw ApiError.serverError(error.message);
  }
};
export { fileUpload, deleteFile };

// // Optimize delivery by resizing and applying auto-format and auto-quality
// const optimizeUrl = cloudinary.url('shoes', {
//   fetch_format: 'auto',
//   quality: 'auto',
// });

// console.log(optimizeUrl);

// // Transform the image: auto-crop to square aspect_ratio
// const autoCropUrl = cloudinary.url('shoes', {
//   crop: 'auto',
//   gravity: 'auto',
//   width: 500,
//   height: 500,
// });

// console.log(autoCropUrl);
