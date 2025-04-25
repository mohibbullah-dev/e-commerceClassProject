import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'userName is required!'],
      unique: true,
    },

    firsName: {
      type: String,
      required: [true, 'firstname is required!'],
    },

    lasename: {
      type: String,
      required: [true, 'lastname is required!'],
    },

    email: {
      type: String,
      required: [true, 'email is required!'],
      unique: true,
    },

    password: {
      type: String,
      required: [true, 'password is required!'],
      unique: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'suspended'],
      default: 'active',
    },
  },
  { timestamps: true },
);

export const User = mongoose.models.User || mongoose.model('User', userSchema);
