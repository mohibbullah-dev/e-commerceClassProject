import { Schema } from 'mongoose';

const settlementSchema = new Schema(
  {
    amount: {
      type: Number,
    },
    group: {
      type: Schema.Types.ObjectId,
      ref: 'Group',
    },
    note: {
      type: String,
    },
    paidBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    recieved: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    date: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);
