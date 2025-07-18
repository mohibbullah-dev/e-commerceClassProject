import mongoose, { Schema } from 'mongoose';

const groupSchema =
  ({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      url: {
        type: String,
      },
      pulic_id: {
        type: String,
      },
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true });

export const Group =
  mongoose.models.Group || mongoose.model('Group', groupSchema);
