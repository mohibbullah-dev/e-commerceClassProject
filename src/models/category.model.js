import mongoose, { Schema } from 'mongoose';
const category = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    slug: {
      type: String,
      require: true,
      unique: true,
      index: true,
    },
    image: {
      url: {
        type: String,
        // required: true,
      },
      public_id: {
        type: String,
        // required: true,
      },
    },
    // subcategories: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Subcategory',
    //   },
    // ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  { timestamps: true },
);

export const Category =
  mongoose.models.Category || mongoose.model('Category', category);
