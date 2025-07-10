import mongoose, { Schema } from 'mongoose';

const subcategoreis = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      // require: true,
      unique: true,
    },

    imame: {
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
  },
  { timestamps: true },
);

export const Subcategory =
  mongoose.models.Subcategory || mongoose.model('Subcategory', subcategoreis);
