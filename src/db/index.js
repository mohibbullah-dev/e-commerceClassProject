import mongoose from 'mongoose';
import { MONGO_URL } from '../constant.js';
import ApiError from '../utils/apiError.js';

const DB_Connection = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log(`database connected`);
  } catch (error) {
    throw ApiError.db_error(error.message);
  }
};
export default DB_Connection;
