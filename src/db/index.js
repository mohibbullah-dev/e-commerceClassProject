import mongoose from 'mongoose';
import { MONGO_URL } from '../constant.js';
import ApiError from '../utils/apiError.js';

const Max_Retry = 3;
const RetryDelayMs = 1000;
let id;

const DB_Connection = async (attemp = 1) => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log(`database connected successfully`);
  } catch (error) {
    console.log(
      `Database connection failed in (attemp ${attemp}): ${error.message}`,
    );
    if (attemp <= Max_Retry) {
      clearInterval(id);
      const delay = RetryDelayMs * 2 ** (attemp - 1);
      console.log(`Retrying in ${delay / 1000} seconds...`);
      id = setTimeout(() => {
        DB_Connection(attemp + 1);
      }, delay);
    } else {
      console.log(`Maximum Retrying attemps is reached. Throwing errors`);
      throw ApiError.db_error(error.message);
    }
  }
};
export default DB_Connection;
