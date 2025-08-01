import mongoose, { Schema } from 'mongoose';

const expenseSchema = new Schema(
  {
    description: {
      type: String,
    },
    amount: {
      type: Number,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    subcategory: {
      type: Schema.Types.ObjectId,
      ref: 'Subcategory',
    },
    date: {
      type: Date,
    },
    paidBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    splitType: {
      type: String,
      enum: ['EQUAL', 'PERCENTAGE', 'FIXED'],
      default: 'EQUAL',
    },
    splits: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
        amount: {
          type: Number,
        },
        paid: {
          type: Boolean,
          default: false,
        },
      },
    ],
    groups: {
      type: Schema.Types.ObjectId,
      ref: 'Group',
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

export const Expens =
  mongoose.models.Expens || mongoose.model('Expens', expenseSchema);
